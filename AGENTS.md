# Repository Guidelines

## Project Structure & Module Organization
The site is a static single-page app served from the repository root. `index.html` holds all markup, Tailwind utility classes, and Typekit font references. Deployment-specific files—`_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, and `site.webmanifest`—must stay at the root so Cloudflare Pages can pick them up automatically. Store new imagery beside `favicon.ico`, and document any hosting changes in `DEPLOYMENT.md` to keep the deployment workflow traceable.

## Build, Test, and Development Commands
Use lightweight static servers for local preview: `python -m http.server 8000` or `npx serve .`. Both commands render the root directory so you can verify routing rules and headers. When updating dependencies or Tailwind snippets, reload with cache disabled to confirm CDN changes propagate.

## Coding Style & Naming Conventions
Follow the existing four-space indentation in `index.html` and keep attribute ordering semantic-first (ARIA, data attributes, then presentation). Compose layouts with Tailwind utility classes inline; avoid extracting CSS unless you also update preloading hints. Name new sections with descriptive IDs (e.g., `id="clinical-ai"`) to support deep linking and sitemap updates. Favor semantic HTML5 elements and keep meta tags grouped by concern as in the current head block.

## Testing Guidelines
After each change, run a local server and exercise English and Arabic toggles to ensure RTL layouts render correctly. Use Chrome Lighthouse (Performance ≥ 90, Accessibility ≥ 95) and WAVE or axe browser extensions to spot regressions. Validate structured data with `https://search.google.com/test/rich-results` before shipping metadata changes. Manually confirm security headers by checking the Network panel for responses from `_headers`.

## Commit & Pull Request Guidelines
Commits should be concise and imperative—mirror the README example `Add improvement` or adopt Conventional Commit prefixes (`feat: hero animation`). Reference related issues in the body and list any manual test evidence (Lighthouse scores, browsers). Pull requests need: purpose summary, screenshots for visual tweaks, localization notes, and deployment checklist status. Coordinate releases through Cloudflare Pages previews before merging.

## Security & Configuration Tips
Changes to `_headers` or `_redirects` affect production immediately; double-check SPF, HSTS, and CSP directives against Cloudflare’s dashboard before merging. Keep API keys or analytics tokens out of the repo; instead, document required secrets in Cloudflare environment variables and reference their names in `DEPLOYMENT.md`.
For the contact form, set the `data-endpoint` attribute in `index.html` to a secrets-backed handler (Formspree, Workers, etc.) and never hardcode tokens into the frontend.
