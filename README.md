# Sola - Digital Learning Lab

Sola is a collection of short, interactive digital learning experiences built with Next.js and
React. The first collection explores control, freedom, providence, and meaning through custom 3D,
diagram, and branching interactions.

## Initial experiences

1. **What Is Within My Control?** — an interactive Three.js classification experience.
2. **Freedom and Providence** — an accessible relationship diagram.
3. **Meaning in Adversity** — an animated comparison and branching scenario.

These are focused learning prototypes, not complete university courses.

## Delivery model

- The public application is deployed with Vercel.
- Course content is separated from the presentation layer.
- Progress remains local and anonymous in the initial release.
- Each course is designed for later SCORM 1.2 export and Moodle import.
- LTI 1.3 remains an optional institutional integration.

## Development workflow

```text
dev → GitHub Actions and Vercel Preview → pull request → master → Vercel Production
```

SonarCloud uses Automatic Analysis and is not duplicated in GitHub Actions.

## Local development

Requirements: Node.js 24 and npm 11.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run typecheck
npm run format:check
npm run lint
npm test
npm run test:e2e
npm run build
```

GitHub Actions runs typecheck, lint, unit tests, and the production build on pushes to `dev` and
pull requests targeting `master`.

## Local Moodle qualification

The optional Moodle test harness is documented in
[`integrations/moodle/README.md`](integrations/moodle/README.md). It is only needed during the final
SCORM qualification phase.

## Status

Phase 0 is complete. The Next.js foundation is being initialized in Phase 1.
