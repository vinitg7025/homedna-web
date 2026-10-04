"""
Copies the designer's logo files into the website (public/brand) and the engine (homedna-engine/static/brand) under
clear names, and generates the app icons. The designer's artwork is never redrawn: files are copied as delivered;
only the favicon/app-icon tiles are composed (white mark on a midnight square, as app icons need a solid tile).

Usage: python3 scripts/build_brand_assets.py "/path/to/HomeDNA Logo" [/path/to/engine/static/brand]
"""
import re, shutil, sys
from pathlib import Path
from PIL import Image

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "../HomeDNA Logo").resolve()
ROOT = Path(__file__).resolve().parents[1]
TARGETS = [ROOT / "public" / "brand"] + ([Path(sys.argv[2]).resolve()] if len(sys.argv) > 2 else [])
MIDNIGHT = (27, 42, 74, 255)

COPY = {  # designer file -> web name.  brand = midnight #1B2A4A, gold = "Secondary Colour" #C9A84C, white = #FFFFFF
    "Logo (Horizontal) - Brand Colour.png": "logo-horizontal-brand.png",
    "Logo (Horizontal) - White.png": "logo-horizontal-white.png",
    "Logo (Horizontal) - Secondary.png": "logo-horizontal-gold.png",
    "Logo+Wordmark - Brand Colour(Transparent).svg": "logo-stacked-brand.svg",
    "Logo+Wordmark - Brand Colour(Transparent).png": "logo-stacked-brand.png",
    "Logo+Wordmark - White(Transparent).svg": "logo-stacked-white.svg",
    "Logo+Wordmark - White(Transparent).png": "logo-stacked-white.png",
    "Logo+Wordmark - Secondary Colour (Transparent).svg": "logo-stacked-gold.svg",
    "Logo+Wordmark - Secondary Colour (Transparent).png": "logo-stacked-gold.png",
    "Logo Only - Brand Colour (Transparent).svg": "mark-brand.svg",
    "Logo Only - Brand Colour (Transparent).png": "mark-brand.png",
    "Logo Only - White (Transparent).svg": "mark-white.svg",
    "Logo Only - White (Transparent).png": "mark-white.png",
    "Logo Only - Secondary Colour(Transparent).svg": "mark-gold.svg",
    "Logo Only - Secondary Colour(Transparent).png": "mark-gold.png",
    "White Colour.png": "poster-midnight.png",   # white logo + tagline on midnight (social / large format)
    "Brand Colour v2.png": "poster-light.png",   # midnight logo + gold tagline on white
}

def tile(mark_png: Path, size: int, pad: float = 0.20) -> Image.Image:
    mark = Image.open(mark_png).convert("RGBA")
    mark = mark.crop(mark.getchannel("A").getbbox())
    box = int(size * (1 - 2 * pad))
    mark.thumbnail((box, box), Image.LANCZOS)
    img = Image.new("RGBA", (size, size), MIDNIGHT)
    img.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    return img

def favicon_svg(mark_white_svg: Path) -> str:
    s = mark_white_svg.read_text()
    inner = re.search(r"<svg[^>]*>(.*)</svg>", s, re.S).group(1)
    # the mark's artwork is centred on (128,128) inside the 256 box; scale it to 60% of a midnight rounded square
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">'
            '<rect width="256" height="256" rx="48" fill="#1B2A4A"/>'
            '<g transform="translate(128 128) scale(0.74) translate(-128 -128)">' + inner + '</g></svg>')

for out in TARGETS:
    out.mkdir(parents=True, exist_ok=True)
    for src, name in COPY.items():
        shutil.copy2(SRC / src, out / name)
    mark_png = SRC / "Logo Only - White (Transparent).png"
    tile(mark_png, 180).save(out / "apple-touch-icon.png")
    tile(mark_png, 512).save(out / "icon-512.png")
    t = tile(mark_png, 256)
    t.save(out / "favicon-32.png", sizes=[(32, 32)]) if False else t.resize((32, 32), Image.LANCZOS).save(out / "favicon-32.png")
    t.save(out / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    (out / "favicon.svg").write_text(favicon_svg(SRC / "Logo Only - White (Transparent).svg"))
    print("wrote", out, len(list(out.iterdir())), "files")
