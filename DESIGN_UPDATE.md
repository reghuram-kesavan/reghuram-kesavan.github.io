# Portfolio: personal and professional modes

Updated 28 September 2026 in this folder. Public deployment has not been changed.

## Presentation
Personal mode combines engineering with the user's stated interests: Valorant, FIFA, dance, Formula 1, travel and badminton. Professional mode hides the personal homepage section and presents academic/industry content with a blue palette and an interactive illustrative wing planform. Preference is stored locally, with a memory fallback if browser storage is unavailable.

## Content
Retained project identities and scientific limitations. Corrected Kriging/GCI and wind-tunnel wording; removed unsupported awards, unverified test counts and quantified validation promises from the rendered copy. Kept 9.3 CGPA as directly confirmed by the user. This is not a new primary-source audit of all career claims. Existing resume.pdf was preserved and was not rewritten in this pass.

## Functionality
Responsive navigation, interest controls, project search, keyboard-operable wing geometry slider, and a local keyword matcher. The old simulated AI/company-analysis generator has been replaced; no external AI services are used. SVG geometry is explicitly illustrative, not CFD output.

## Validation
- Production build: pass, 24 generated pages including framework routes; TypeScript enabled.
- ESLint: pass.
- Preview server: 22 public route/file checks passed, including 12 project pages and the PDF.
- Browser: both modes, persistence across reload, mobile navigation, project search, matcher results/reset and slider interaction passed.
- Responsive checks at 390px and 320px: no horizontal document overflow on checked screens.

## Local use
npm ci
npm run build
npm start

Preview defaults to http://localhost:3030. Set PORT to use another port. npm run dev starts the webpack development server. Deployment remains a separate step.
