# CareGuard

CareGuard is a frontend prototype for secure health records and privacy-preserving disease trend monitoring. It demonstrates how a single health platform can connect patient-owned records, authorized clinician workflows, and public-health analytics while keeping those information scopes visibly separate.

The repository is named `careguard`. The rendered product wordmark in the current UI is `carewell health`, and the browser title is `Carewell · Secure Health Records`.

> **Prototype status:** This project uses synthetic, fictional data and in-memory browser state. It does not provide real authentication, authorization, encryption, QR validation, persistence, file uploads, camera access, or production audit integrity. Do not enter real patient information or use this project as a clinical system.

## Contents

- [What this project demonstrates](#what-this-project-demonstrates)
- [Feature overview](#feature-overview)
- [Role model](#role-model)
- [Application routes](#application-routes)
- [Demo walkthrough](#demo-walkthrough)
- [Quick start](#quick-start)
- [Available scripts](#available-scripts)
- [Technology stack](#technology-stack)
- [Repository structure](#repository-structure)
- [Architecture](#architecture)
- [Data and state](#data-and-state)
- [Privacy model](#privacy-model)
- [Security and prototype limitations](#security-and-prototype-limitations)
- [Responsive behavior and accessibility](#responsive-behavior-and-accessibility)
- [Development guide](#development-guide)
- [Build and deployment](#build-and-deployment)
- [Troubleshooting](#troubleshooting)
- [Production hardening roadmap](#production-hardening-roadmap)
- [Design direction](#design-direction)
- [License and project status](#license-and-project-status)

## What this project demonstrates

CareGuard is designed as a role-based health information experience with two deliberately separate data paths:

1. **Individual care path**
   - A patient views their own synthetic record.
   - A clinician follows a QR-style access flow to reach an individual synthetic record.
   - The clinician can inspect history, visits, prescriptions, reports, and profile information.
   - The clinician can add demo visits, diagnoses, prescriptions, and report entries during the current browser session.

2. **Population analytics path**
   - An administrator sees synthetic, aggregate disease statistics.
   - Analytics can be filtered by reporting period, region, disease, and age group.
   - Small cohorts are suppressed when the configured minimum group size is not met.
   - Administrator reports and audit views intentionally exclude patient-level details.

The public landing page explains this separation visually through a patient-to-record-to-clinician workflow and an analytics privacy pipeline.

## Feature overview

### Public experience

- Privacy-focused landing page at `/`.
- Product overview describing records, authorized care, and public-health analytics.
- Role cards for patients, clinicians, and administrators.
- Eight-step workflow explanation from patient registration through aggregate trend review.
- Privacy pipeline showing de-identification, aggregation, categorization, thresholding, and administrator reporting.
- Trust center link at `/security`.
- Responsive public header, footer, and mobile layouts.

### Patient portal

- Overview dashboard with patient summary and next appointment.
- Medical history timeline.
- Visits list.
- Prescriptions list with active/completed status.
- Reports list with synthetic laboratory and imaging results.
- QR access page showing the patient-side reference workflow.
- Profile page.
- Patient-specific navigation with mobile bottom navigation.

The seeded demo patient is Rahul Mehta, patient ID `P-20481`.

### Clinician workspace

- Dashboard with care activity, recent visits, and upcoming appointments.
- Demo QR scanner flow with sequential states:
  1. Verifying clinician identity.
  2. Validating QR token.
  3. Checking permissions.
  4. Access granted.
- No camera permission is requested; the scanner is an interface simulation.
- Manual lookup by synthetic patient ID.
- Patient directory containing 12 fictional patient profiles.
- Recent clinical activity view.
- Individual patient record view with tabs for:
  - Overview.
  - Medical history.
  - Visits.
  - Prescriptions.
  - Reports.
- Demo actions for adding a visit, diagnosis, prescription, or report.
- Add-visit page.
- Clinician profile page.
- Changes remain in React context for the current application session only.

### Administrator workspace

- Disease-trend overview.
- Trend analysis.
- Regional analytics.
- Time-series analysis.
- Aggregate report list with simulated export feedback.
- Audit overview with fictional operational activity.
- Administrator profile and access-scope summary.
- Filters for:
  - Reporting period.
  - Region.
  - Disease category.
  - Age group.
- Charts for cases over time, disease distribution, regional distribution, age-group distribution, trend comparison, and regional reporting index.
- Privacy notices on analytics screens.
- Suppression state when a selected cohort falls below the minimum group size.

### Shared experience

- Role-gated routing.
- Access-denied page for mismatched roles.
- Toast notifications with success, information, and error states.
- Lazy-loaded route pages with a loading skeleton.
- Route-level error boundary.
- Responsive sidebar and mobile bottom navigation.
- Keyboard-focus styles and accessible labels for interactive controls.
- Reduced-motion support through `prefers-reduced-motion`.

## Role model

| Role | Intended scope | Main destination | Patient-level records | Aggregate analytics |
| --- | --- | --- | --- | --- |
| Patient | Personal health information | `/patient` | Own demo record | No |
| Clinician | Authorized care workspace | `/clinician` | Synthetic individual records | No |
| Administrator | Public-health monitoring | `/admin` | No | Yes |

The frontend displays role boundaries and blocks mismatched routes in the UI. These checks are only demonstration behavior. A production backend must independently authenticate the user and enforce every permission on every request.

## Application routes

### Public routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Product overview and privacy workflow |
| `/login` | Login | Select a demo role and enter the selected workspace |
| `/security` | Trust center | Explain intended safeguards and current prototype limitations |
| `/access-denied` | Access denied | Show a restricted-resource state |

### Patient routes

| Route | Page |
| --- | --- |
| `/patient` | Overview |
| `/patient/history` | Medical history |
| `/patient/visits` | Visits |
| `/patient/prescriptions` | Prescriptions |
| `/patient/reports` | Reports |
| `/patient/qr` | QR access |
| `/patient/profile` | Profile |

### Clinician routes

| Route | Page |
| --- | --- |
| `/clinician` | Dashboard |
| `/clinician/scan` | QR scanner |
| `/clinician/patients` | Patient directory |
| `/clinician/recent-records` | Recent records |
| `/clinician/patient/:id` | Individual patient record |
| `/clinician/visit/new` | Add visit |
| `/clinician/profile` | Profile |

### Administrator routes

| Route | Page |
| --- | --- |
| `/admin` | Analytics overview |
| `/admin/trends` | Disease trend analysis |
| `/admin/regional` | Regional analytics |
| `/admin/time` | Time analysis |
| `/admin/reports` | Aggregate reports |
| `/admin/audit` | Audit overview |
| `/admin/profile` | Profile |

Unknown routes redirect to `/`.

## Demo walkthrough

### Start the application

1. Install dependencies with `pnpm install`.
2. Start the development server with `pnpm dev`.
3. Open `http://localhost:3000`.
4. Select **Access portal** or **Sign in**.

### Use quick demo access

The login screen offers one-tap demo access for each role:

- **Demo as Patient** opens `/patient`.
- **Demo as Clinician** opens `/clinician`.
- **Demo as Administrator** opens `/admin`.

### Use the simulated login form

1. Select a role.
2. Enter any non-empty username or email.
3. Enter any non-empty password.
4. Optionally enter the six-digit code placeholder.
5. Submit the form.

No value is sent to a server and no credential is verified. The selected role is stored only in React state.

Suggested visual usernames shown by the form:

| Role | Suggested username |
| --- | --- |
| Patient | `rahul.mehta@demo.health` |
| Clinician | `kavita.sharma@demo.health` |
| Administrator | `public.health@demo.health` |

### Exercise the clinician flow

1. Open the clinician workspace.
2. Choose **Scan QR**.
3. Click **Use Demo Patient** or click the scanner frame.
4. Watch the four simulated authorization states progress.
5. Choose **Open patient record**.
6. Explore the patient tabs.
7. Add a visit, diagnosis, prescription, or report.
8. Return to the record to see the new entry during the current session.

The manual lookup accepts seeded patient IDs such as `P-20481`, `P-20482`, and `P-20492`.

### Exercise privacy suppression

1. Open the administrator workspace.
2. Go to any analytics screen.
3. Set a specific region, disease, and age group.
4. Select a combination that maps to a suppressed synthetic cohort, for example:
   - Region: `Nashik`
   - Disease: `Malaria`
   - Age group: `65+`
5. The chart area changes to a privacy-suppressed state.

The threshold is `10`. The UI receives only the suppression decision; it does not render the underlying small cohort size.

## Quick start

### Prerequisites

- Node.js with a version compatible with the installed Vite and TypeScript dependencies.
- pnpm `11.25.0`, as declared by the `packageManager` field in `package.json`.
- A modern browser with JavaScript enabled.

### Install

```bash
pnpm install
```

### Start development

```bash
pnpm dev
```

The Vite server listens on `0.0.0.0:3000` and uses strict port handling. The local browser URL is:

```text
http://localhost:3000
```

If port `3000` is occupied, stop the existing process or update both the `dev` script in `package.json` and the `server` configuration in `vite.config.ts`.

### Validate the project

```bash
pnpm typecheck
pnpm build
```

`pnpm build` runs TypeScript checking first and then creates the Vite production bundle in `dist/`.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Vite on host `0.0.0.0`, port `3000`, with strict port handling |
| `pnpm typecheck` | Run TypeScript with `noEmit` |
| `pnpm build` | Typecheck and build the production bundle |

There is currently no test runner, lint script, formatter script, or end-to-end test script in `package.json`.

## Technology stack

- **React 19** for the component UI.
- **React DOM 19** for browser rendering.
- **TypeScript 5.8** with strict compiler settings.
- **Vite 6** for development and production builds.
- **React Router 6** for client-side routing.
- **Recharts 2** for administrator analytics visualizations.
- **Lucide React** for interface icons.
- **qrcode.react** for QR-related UI support.
- **pnpm** for package management.

Important compiler settings in `tsconfig.json` include strict type checking, ES2022 output targeting, bundler module resolution, JSX transform support, `noEmit`, and unused-local/unused-parameter checks.

## Repository structure

```text
.
├── app.config.ts                 # External project/logo configuration
├── ideas.md                      # Product and visual design brief
├── index.html                    # Vite HTML shell and browser metadata
├── package.json                  # Scripts, package metadata, dependencies
├── pnpm-lock.yaml                # Locked dependency graph
├── pnpm-workspace.yaml           # pnpm workspace configuration
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite and React plugin configuration
├── public/
│   └── manus-routes.json         # Public route metadata used by the project environment
└── src/
    ├── main.tsx                  # React entrypoint and stylesheet import
    ├── styles.css                # Global design system and responsive styles
    ├── app/
    │   ├── App.tsx               # Router, auth context, role gates, toasts
    │   ├── DemoRecordSession.tsx  # In-memory record mutations for the demo
    │   └── components/
    │       ├── layout/
    │       │   └── PortalLayout.tsx
    │       └── ui/
    │           ├── AccessDenied.tsx
    │           ├── Brand.tsx
    │           ├── Charts.tsx
    │           ├── ErrorBoundary.tsx
    │           ├── Pipeline.tsx
    │           └── Shared.tsx
    ├── data/
    │   ├── analytics.ts           # Aggregate analytics, filters, suppression decisions
    │   └── demo.ts                # Synthetic patients and clinical records
    ├── lib/
    │   ├── format.ts              # Small display-formatting helpers
    │   └── privacy.ts             # Shared minimum-group-size policy helpers
    └── pages/
        ├── Admin.tsx              # Administrator screens
        ├── Clinician.tsx          # Clinician screens and patient record actions
        ├── Patient.tsx            # Patient screens
        ├── Public.tsx             # Home and login screens
        └── Security.tsx            # Trust center
```

## Architecture

### Application shell

`src/main.tsx` mounts the `App` component inside `React.StrictMode` and imports the global stylesheet.

`src/app/App.tsx` provides the main application shell:

- `BrowserRouter` owns client-side navigation.
- Lazy imports split page modules by route area.
- `Suspense` displays the secure-workspace loading skeleton while a lazy page loads.
- `AuthContext` stores the selected demo role.
- `ToastContext` manages transient notifications.
- `DemoRecordSessionProvider` stores current-session record changes.
- `RoleGate` redirects unauthenticated visitors to `/login` and renders an access-denied page for a mismatched role.
- `RouteErrorBoundary` protects route rendering from uncaught page errors.

### Layout system

`PortalLayout` provides the shared authenticated shell:

- Persistent desktop sidebar.
- Role-specific workspace title and navigation.
- Top bar with breadcrumb and demo-environment indicator.
- Sign-out action.
- Mobile bottom navigation with a reduced set of high-frequency destinations.
- Prototype-mode disclosure that reminds users no live records are connected.

### Reusable UI

`src/app/components/ui/Shared.tsx` contains shared primitives including buttons, cards, page headings, stat cards, status badges, section headings, empty states, timelines, suppression notices, dialogs, message panels, and table actions.

`Charts.tsx` contains the Recharts-based visualizations. `Pipeline.tsx` renders the shared privacy-pathway diagram. `Brand.tsx` renders the shield-style product mark.

## Data and state

### Seed data

`src/data/demo.ts` contains fictional data for:

- One primary demo patient, Rahul Mehta (`P-20481`).
- Eleven additional synthetic patients.
- Visits.
- Prescriptions.
- Reports.
- Clinicians.
- Appointments.
- Illustrative audit events.

No data is fetched from an API.

`src/data/analytics.ts` contains synthetic aggregate values for:

- Monthly disease cases from April through September 2026.
- Disease distribution.
- Regional distribution across Pune, Mumbai, Nagpur, Nashik, and Aurangabad.
- Broad age-group distribution.
- Relative trend comparisons.
- Regional reporting index values.
- Administrator activity.

### Authentication state

The selected role lives in component state inside `RouterApplication`:

- It is initialized as `null`.
- Login or quick demo access sets a role.
- Sign out clears the role.
- No cookie, local storage entry, session token, or server session is used.
- Refreshing the browser resets the selected role.

### Clinical record state

`DemoRecordSessionProvider` stores added visits, diagnoses, prescriptions, and reports in React state keyed by patient ID.

- Changes are available to components during the current app session.
- Changes are not written to `localStorage`.
- Changes are not sent to an API.
- Changes disappear on a full page refresh or when the application state is recreated.
- Report file selection records only a filename for the UI demonstration; no file is uploaded or stored.

### QR behavior

The QR scanner is a timed state machine. It does not:

- Open a camera.
- Decode a QR code.
- Contact a token service.
- Verify a clinician identity.
- Check a signed token.
- Enforce a permission in a backend.

Manual lookup only matches a patient ID against the local synthetic patient array.

## Privacy model

The demo makes the privacy boundary visible in both the UI and the data shape.

### Role separation

- Patients are presented with personal-record scope.
- Clinicians are presented with individual synthetic records.
- Administrators are presented with aggregate data and operational summaries only.
- Administrator pages explicitly state that names, patient IDs, contact details, prescriptions, QR references, and individual timelines are excluded.

### Minimum group size

The shared privacy policy defines:

```text
MINIMUM_GROUP_SIZE = 10
```

`src/lib/privacy.ts` exposes a suppression decision for an aggregate group. `src/data/analytics.ts` uses synthetic cohort keys to demonstrate selected suppressed combinations. When a cohort is suppressed:

- Charts are replaced by a suppression notice.
- The UI explains that the group is too small for safe display.
- The underlying cohort size is not returned to the rendered interface.

The threshold is a prototype policy demonstration, not a complete statistical disclosure-control system.

### Intended analytics pipeline

The visual pipeline communicates this conceptual path:

```text
Raw patient records
  -> Remove identifiers
  -> Aggregate data
  -> Group by location, time, and disease
  -> Apply minimum group-size threshold
  -> Anonymized analytics
  -> Administrator dashboard
```

The frontend does not implement a real de-identification service. Production analytics must be produced by a trusted backend or data platform with documented privacy guarantees and review controls.

## Security and prototype limitations

The security page intentionally describes a target architecture while disclosing that it is not implemented in this repository.

### Not implemented

- Real user registration or sign-in.
- Password hashing or password verification.
- Multifactor authentication.
- Session management.
- Backend authorization.
- API authentication and authorization.
- Signed or expiring QR tokens.
- Camera scanning or QR decoding.
- Encryption at rest.
- Encrypted transport configuration in the application itself.
- Durable database storage.
- Secure file upload and malware scanning.
- Immutable audit logging.
- Rate limiting.
- Abuse detection.
- CSRF protection.
- Server-side input validation.
- Consent management.
- Clinical data retention and deletion policies.
- Regulatory compliance certification.

Frontend route guards improve the demonstration experience but are not a security boundary. Anyone who can access a production API must be subject to server-side identity and permission checks regardless of what the frontend displays.

### Safe handling of this repository

- Use only fictional values while developing and demonstrating.
- Do not paste real names, identifiers, contact details, diagnoses, prescriptions, reports, or credentials into the app.
- Treat the public demo as an interface prototype, not a medical record system.
- Review all external asset and project configuration before publishing.

## Responsive behavior and accessibility

The UI includes several responsive and accessibility-oriented behaviors:

- Desktop sidebars collapse into mobile bottom navigation patterns.
- Public navigation hides non-essential links on narrow screens.
- Tables have mobile alternatives or horizontal scrolling where appropriate.
- Interactive controls include visible keyboard focus outlines.
- Toasts use a polite live region.
- Loading and suppression states expose status semantics.
- Dialogs use dialog semantics and close on Escape or backdrop click.
- Buttons and icon-only controls include accessible labels where needed.
- `prefers-reduced-motion: reduce` disables or minimizes animation and transition timing.

This is not a completed accessibility audit. Keyboard traversal, screen-reader output, contrast, focus trapping, and browser compatibility should be tested before production use.

## Development guide

### Add a public page

1. Add the page component under `src/pages/`.
2. Lazy-load it in `src/app/App.tsx`.
3. Add a public route inside `ApplicationRoutes`.
4. Add navigation links from the appropriate public layout.
5. Validate with `pnpm typecheck` and `pnpm build`.

### Add a role-protected page

1. Create or extend the relevant page module: `Patient.tsx`, `Clinician.tsx`, or `Admin.tsx`.
2. Add a lazy import in `src/app/App.tsx`.
3. Add the route inside the matching `RoleGate`.
4. Add its destination to `destinations` in `PortalLayout.tsx`.
5. Check the mobile navigation selection if the page should be a high-frequency mobile destination.
6. Keep the page’s data scope consistent with the role model.

### Add synthetic data

- Put clinical seed entities in `src/data/demo.ts`.
- Put aggregate analytics in `src/data/analytics.ts`.
- Keep sample values fictional and clearly labeled.
- Update the README if the public demo flow or available IDs changes.
- Avoid introducing real personal information into fixtures, screenshots, comments, or test data.

### Add a record mutation

For clinician record actions:

1. Extend the relevant type in `src/data/demo.ts` if necessary.
2. Add an updater to `DemoRecordSessionProvider`.
3. Add validation and error feedback in the page or dialog.
4. Make it clear in the UI that the change is in-memory and session-only.
5. Confirm that seed records are not mutated accidentally.

### Maintain privacy behavior

- Keep suppression decisions separate from displayed aggregate values.
- Do not expose suppressed cohort sizes through labels, tooltips, logs rendered in the UI, or chart data.
- Keep the minimum threshold centralized in `src/lib/privacy.ts`.
- Add or update privacy messaging whenever an analytics workflow changes.

## Build and deployment

### Local production build

```bash
pnpm build
```

The generated static assets are written to `dist/`.

### Static hosting requirements

Because the application uses `BrowserRouter`, a static host must rewrite unknown application paths to `index.html`. Without that fallback, directly opening routes such as `/patient` or `/admin/trends` may return a host-level 404 after deployment.

The application currently expects:

- JavaScript and CSS asset serving.
- Browser history fallback to `index.html`.
- No backend API at runtime.
- No required environment variables in the repository.

For a production health-record product, static hosting alone would not be sufficient. A trusted backend, data store, identity provider, audit service, and secure file/data pipeline would be required.

### Environment variables

No environment variables are currently required by the source. `.env` and `.env.*` files are ignored by Git, with `.env.example` explicitly allowed if future configuration is added.

Do not add secrets to client-side Vite variables. Any `VITE_*` value is exposed to the browser bundle.

## Troubleshooting

### `pnpm` is not available

Install pnpm or enable it through Corepack, then verify the version expected by the repository:

```bash
pnpm --version
```

### Port `3000` is busy

The development script uses `--strictPort`, so Vite exits instead of selecting another port automatically. Stop the process using port `3000`, or update the port in both `package.json` and `vite.config.ts`.

### A protected route sends you to login

This is expected after a browser refresh because the selected role is held only in React state. Use the login page or quick demo access again.

### A different role sees Access Restricted

Role-gated routes intentionally allow only the matching role. Sign out and choose the role that owns the requested workspace.

### Added clinical data disappeared

Demo mutations are stored only in the current React session. A full refresh, tab restart, or application reload clears them.

### Direct links return 404 after deployment

Configure the hosting provider to rewrite all application routes to `index.html`, as described in [Build and deployment](#build-and-deployment).

### Charts or route modules fail during development

Run the type checker first:

```bash
pnpm typecheck
```

Then run a clean dependency install if the lockfile and installed modules have drifted:

```bash
pnpm install --frozen-lockfile
pnpm build
```

## Production hardening roadmap

A realistic path from this interface prototype to a production system would include:

1. Define a threat model, data classification policy, and regulatory requirements.
2. Replace demo role selection with an identity provider and secure session mechanism.
3. Enforce authorization in backend services and database queries.
4. Introduce a validated health-record domain model and migration strategy.
5. Store records in an access-controlled database with encryption and key management.
6. Implement signed, scoped, expiring QR references with replay protection.
7. Add camera scanning only after the token and consent model is designed.
8. Add server-side validation, rate limiting, abuse controls, and security monitoring.
9. Build an immutable, privacy-aware audit service.
10. Implement secure report upload, content validation, malware scanning, and access logging.
11. Design consent, revocation, retention, correction, and deletion workflows.
12. Move analytics preparation into a trusted pipeline with formal disclosure-control review.
13. Add automated unit, integration, accessibility, security, and end-to-end tests.
14. Add observability, backups, disaster recovery, incident response, and operational runbooks.
15. Conduct independent security, privacy, and clinical workflow reviews before handling real data.

## Design direction

The visual direction is a restrained clinical SaaS interface:

- Warm-white and pale-neutral surfaces.
- Deep ink typography.
- Muted teal for health and access states.
- Amber and rose reserved for warnings and alerts.
- Clear grids, modest borders, rounded surfaces, and light elevation.
- Dense but scannable clinical information.
- Explicit privacy boundaries.
- Low-amplitude page, card, chart, scanner, toast, and dialog motion.
- Reduced-motion support for users who request it.

The original design brief is preserved in `ideas.md`.

## License and project status

No license file is currently included in the repository. Treat the project as private/internal unless the repository owner adds licensing terms.

Current status: **illustrative frontend prototype with synthetic data**.

The most important implementation boundary is simple: this repository demonstrates the user experience and intended information architecture; it does not implement the security, persistence, or clinical controls required for real health information.
