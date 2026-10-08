# Lewis Kinoti — Portfolio Website

A multi-page portfolio built with **HTML5 + CSS3 + vanilla JavaScript** —
no build step, no dependencies, hostable anywhere static.

Design: dark theme with magenta/blue radial glow, Poppins headlines,
pill CTAs, rotating badge and a white marquee ticker.

## Pages

`index.html` is the **complete site on one page** — scroll down to view every
section. The other files are standalone versions of the same content for
deep links and search engines; their navigation sends you back to the
matching anchor on the home page.

| File | Contents |
| --- | --- |
| `index.html` | **Scroll-through site.** Hero · ticker · About · principles · stats · Skills · Toolkit · Services · Process · Projects · Experience · Achievements · Certifications · Testimonials · Contact · Form · FAQ. Person JSON-LD. |
| `about.html` | Bio, approach / mission / vision, animated stats |
| `skills.html` | 11 skill categories + full tool list |
| `services.html` | 12 services grouped Technical / Creative / Digital / Learning, 5-step process |
| `projects.html` | 6 project cards with detail and tags |
| `experience.html` | Timeline, achievements with sources, certifications |
| `testimonials.html` | Client and learner feedback |
| `contact.html` | Validated contact form, contact details, availability, FAQ |
| `404.html` | Error page (set as the host's error document) |

## On-page navigation

- Sticky header with smooth-scroll anchor links
- **Scroll-spy** highlights the nav item for the section you're reading
- **Scroll progress bar** across the top of the viewport
- "Scroll" cue under the hero, plus a back-to-top button
- Anchors are offset for the fixed header, so nothing hides underneath it

## Social profiles

| Platform | URL |
| --- | --- |
| X (Twitter) | `https://x.com/lewiskinoti_` |
| LinkedIn | `https://www.linkedin.com/in/lewis-kinoti-4725a6353` |
| Facebook | `https://www.facebook.com/share/1C6ALv8ugv/` |
| Instagram | `https://www.instagram.com/lewiskinoti_` |
| GitHub | `https://github.com/lkinoti` |
| WhatsApp | `https://wa.me/qr/ANU7IZ7V7F3RM1` |
| Email | `lkinoti012@gmail.com` |

To add a platform, copy a list item inside `<ul class="socials">` in the
footer (every page) and one inside `.side-socials` on the contact section of
`index.html` and `contact.html`, then change the `href` and text. Also add
the profile to `sameAs` in the JSON-LD on `index.html`.

## Structure

```
lewis-kinoti-portfolio/
├── index.html
├── about.html
├── skills.html
├── services.html
├── projects.html
├── experience.html
├── testimonials.html
├── contact.html
├── 404.html
├── css/style.css      # design system + all styling
├── js/main.js         # menu, reveal, counters, form validation, back-to-top
├── assets/
│   ├── kinoti-design-logo.png
│   ├── kinoti-photo.png
│   ├── favicon.svg
│   └── projects/          # project card photos (1000x850, ~65-210 KB each)
│       ├── kazi-hub.jpg
│       ├── floodguard.jpg
│       ├── digital-skills.jpg
│       ├── cyber.jpg
│       ├── creative-media.jpg
│       └── web-ai.jpg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Before you publish

1. **Domain** — search and replace `https://kinoti.dev` in the HTML files,
   `sitemap.xml` and `robots.txt` with your real domain.
2. **Social preview image** — `og:image` points at
   `assets/kinoti-photo.png`. A 1200×630 image works better; add one and
   update the four `og:image` / `twitter:image` tags.
3. **Form** — the contact form validates in the browser and then opens the
   visitor's mail client. To receive submissions directly, add a
   `method="post" action="https://formspree.io/f/XXXX"` (or FormSubmit /
   Netlify Forms) to `#contactForm` and remove the `preventDefault` block
   in `js/main.js`.
4. **Stats** — `data-count` / `data-suffix` on `about.html` (5+ organizations,
   10+ projects, 100+ learners). Update to your real numbers.
5. **Testimonials** — add real quotes and names on `testimonials.html`.
6. **Project photos** — each card pulls one image from `assets/projects/`.
   To swap a photo, replace the file **keeping the same name**; nothing else
   needs editing. They are cropped to 1000×850 (4:3.4) to match the card,
   so anything with a different shape gets centre-cropped — check that
   nothing important is lost at the edges.
6. **Contact details** — `lkinoti012@gmail.com` and `+254 707 833 281`
   appear in the markup, `js/main.js` and the JSON-LD.

## Accessibility & SEO already handled

- Skip-to-content link, visible focus rings, `aria-current` on the active nav
  item, `aria-expanded` on the hamburger, Escape closes the mobile menu
- `prefers-reduced-motion` support, decorative icons marked `aria-hidden`
- Reveal animations degrade gracefully when JavaScript is disabled
- Per-page `<title>`, meta description, canonical, Open Graph, Twitter card
- `Person` JSON-LD structured data, `robots.txt`, `sitemap.xml`, favicon
- 404 page, print stylesheet for exporting a CV

## Run it

Open `index.html` in a browser. To publish: drag the folder onto
**Netlify Drop** (point the error document at `404.html`), push to
**GitHub Pages**, or upload to any static host.

## Fonts

Poppins (headings) + Roboto Condensed (body), loaded from Google Fonts.
