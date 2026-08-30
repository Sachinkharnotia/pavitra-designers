Hero banner image specs

- Canvas: 1920 × 1080 px
- Hero height (target on site): 700–900 px (≈80–100vh)
- Format: WebP (preferred)
- Max file size: under 300 KB
- Filenames expected by the site:
  - `hero-1.webp` (primary)
  - `hero-2.webp` (secondary)
  - `hero-3.webp` (detail)
  - `thumb-1.webp`, `thumb-2.webp`, `thumb-3.webp` (thumbnails)

Optimization tips
- Resize to 1920×1080, then crop to the important focal area for 700–900px hero display.
- Use lossy WebP with quality between 70–82 to stay under 300 KB.
- Use tools: `cwebp` (from webp package), ImageMagick, or an online WebP compressor.

Example `cwebp` command:

```bash
cwebp -q 78 input.jpg -resize 1920 1080 -o hero-1.webp
```

If you upload the files here (or share URLs), I can add and wire them into the hero automatically.