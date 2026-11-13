# Prosper Edafe — Portfolio

Personal portfolio built with Vue 3, Vite, Tailwind CSS and GSAP (ScrollSmoother, ScrollTrigger, SplitText, Flip, ScrambleText).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → dist/
```

## Where to edit things

| What | File |
| --- | --- |
| Projects, case-study copy and screenshots | `src/data/projects.ts` (images in `src/assets/projects/`) |
| Contact details, WhatsApp, socials, services, stack, experience | `src/data/site.ts` |
| Colours and fonts | `tailwind.config.js`, `src/style.css` (`:root`) |
| Logo | `src/components/Logo.vue`, `public/logo.svg`, `public/favicon.svg` |
| Shared animation helpers (`v-reveal`, `v-lines`, `v-chars`, `v-magnetic`, `v-parallax`, `v-rule`) | `src/directives/index.ts` |
| GSAP setup, smooth scroll | `src/lib/gsap.ts` |

Animations respect `prefers-reduced-motion`, and smooth scrolling and the custom cursor are skipped on touch devices.
Deployed on Netlify; `netlify.toml` rewrites every route to the single-page app.
