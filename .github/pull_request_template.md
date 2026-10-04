## What and why
<!-- one or two lines -->

## Definition of done
- [ ] Checks pass (`./run_checks.sh` for the engine, `npm run typecheck && npm run build` for the site)
- [ ] New behaviour has a test; a bug fix has a regression test
- [ ] No secrets, `.env`, `*.db`, or personal data added (CI secret scan agrees)
- [ ] Nothing logs birth details, names, emails, report tokens or sign-in links
- [ ] Database changes are a NEW numbered migration in `store.py`, backward compatible
- [ ] A significant decision? Added or updated a record in `docs/decisions/`
- [ ] README / CLAUDE.md updated if run commands or behaviour changed
