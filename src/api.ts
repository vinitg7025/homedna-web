import { AssessmentAnswers } from './types';

// Base URL of the HomeDNA engine service (e.g. https://app.homedna.example). Empty = same origin.
const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export interface SubmitResult {
  kind: 'report' | 'checkout';
  url: string;
}

// One key per distinct set of answers: a double-click or a retry after a dropped connection returns the SAME report
// instead of creating (and charging for) another.
let lastBody = '';
let lastKey = '';
function idempotencyKey(body: string): string {
  if (body !== lastBody) { lastBody = body; lastKey = crypto.randomUUID(); }
  return lastKey;
}

/** Sends the questionnaire answers to the HomeDNA engine. The engine (not the browser) decides every recommendation. */
export async function submitAssessment(answers: AssessmentAnswers): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 180_000); // the report writer can take a while
  try {
    const body = JSON.stringify(answers);
    const res = await fetch(`${BASE}/api/v1/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey(body) },
      body,
      signal: controller.signal,
    });
    let data: any = null;
    try { data = await res.json(); } catch { /* non-JSON error body */ }
    if (!res.ok) {
      throw new Error(data?.error || `The service returned an error (${res.status}). Please try again.`);
    }
    if (data?.status === 'ready' && data.reportUrl) return { kind: 'report', url: data.reportUrl };
    if (data?.status === 'payment_required' && data.checkoutUrl) return { kind: 'checkout', url: data.checkoutUrl };
    throw new Error('Unexpected response from the service.');
  } catch (e: any) {
    if (e?.name === 'AbortError') throw new Error('This is taking longer than expected. Please try again.');
    if (e instanceof TypeError) throw new Error('We could not reach the HomeDNA service. Please check your connection and try again.');
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
