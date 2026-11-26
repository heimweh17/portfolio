# Portfolio redesign

## Navigation and content refinements

The section index sits in a floating header and highlights the active homepage section as readers scroll. On smaller screens, it shows the current section and opens a compact list of links, including Résumé. The header and favicon use the same custom Alex Liu initials mark. Project screenshots have a smaller frame and can be opened at full size.

Beyond Work now links to a page about mapping, math volunteering, campus events, lion and dragon dance, badminton, pickleball, family, and photography. The old UF SASE detail link redirects to its entry on that page. Education sits above Skills and includes coursework from the résumé variants and the existing Florida Gators mark. Contact shows the email address and uses a shorter, resizable message field.

## Follow-up revision

The overview now flows into Experience, Projects, Beyond Work, Skills, and Contact on one page. The old English list URLs redirect to their homepage anchors. Project and role detail URLs still open directly. Database Mart and UF GeoPlan Center have short summaries on the homepage. UF SASE lives under Beyond Work, and the photo gallery remains available at `/photos` and through the Chinese portfolio.

Warm paper, olive accents, Newsreader headings, and smaller type replace the cool blue palette and large display scale. Featured project screenshots reveal as they enter the viewport, and the gallery fades between images. The site respects reduced motion. Saturday Lab now starts with three landscape captures from the desktop site: rankings, Matchup Lab, and Rank Trends. One portrait capture remains at the end.

Used Humanizer to cut repeated explanations, generic claims, and labels from the English copy. The original redesign notes below describe the previous revision.

## Original redesign

The English homepage introduces Alex as one person working across software engineering, data, infrastructure, and geospatial analysis. It gives visitors a short path from the introduction to selected projects, work history, life beyond work, and contact. The four résumé variants and interview notes supplied context. The site uses the existing public résumé and portfolio copy as its publication baseline.

## Routes and navigation

| URL | Content |
| --- | --- |
| `/` | Introduction, two featured projects, experience, Beyond Work, and contact |
| `/projects` | All project cards |
| `/projects/:slug` | An individual project, with demo and source links near the title |
| `/experience` | Work and campus experience |
| `/experience/:slug` | An individual role |
| `/about` | Background, education, tools, and personal interests |
| `/resume` | An embedded résumé and a link to open the PDF |

Homepage sections link to the corresponding pages through normal navigation. Scrolling stays on the homepage, preserving browser history and the existing `#projects`, `#work`, and `#about` links. Cards use a single anchor covering the image, title, and description, so they support keyboard access and opening in a new tab. React Router restores scroll positions and the English layout moves focus to the destination heading. Existing Vercel rewrites serve direct visits to detail URLs. The legacy Chinese, photography, blog, and tablet routes load on demand.

## Visual system

This is an overhaul of the English site. Visual variation 6, motion 4, density 5, real imagery 6, and continuity 6 informed the large split hero, screenshot-led project chapter, and compact experience rows. Manrope supplies both display and text. The palette uses frost `#f6f8fc`, ice `#e7edff`, ink `#111b35`, navy `#151e3b`, cobalt `#2f4ad1`, and white `#ffffff`. Spacing scales with the viewport, and large radii group photos, project cards, and the contact form.

The existing portrait leads the homepage. The project chapter uses screenshots from the actual applications, and the Beyond Work section uses Alex’s West Lake photo. A one-time reveal introduces the projects chapter. Pages use a short CSS entrance after navigation. Both honor the reduced-motion setting, and content is available from first render.

## Content and contact

Project highlights, stacks, screenshots, and external URLs moved from the old homepage component into shared portfolio data. Work history retained its existing descriptions, dates, and logos. The About page adds Snowflake and Streamlit to the skills list and brings together OpenStreetMap, teaching, campus groups, lion and dragon dance, and photography.

The English contact form shares the Chinese site's Formspree endpoint and the existing name, email, and message fields. It rejects blank messages, shows a sending state, retains input on failure, and offers a direct email link.

## Verification

- Built the production bundle and linted the new English implementation. Repository-wide lint has five existing errors and one warning in legacy files.
- Reviewed the desktop homepage at 1440 px and checked the mobile experience at 390 px. Exercised whole-card and keyboard navigation, direct detail reload, browser Back, project link placement, screenshot controls, and invalid-message handling.
- Formspree returned a successful CORS preflight for `https://aliu.me`. Actual inbox delivery remains unverified.
