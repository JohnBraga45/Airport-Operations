# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deployment (Vercel / Netlify)

- Build: `npm run build`
- Output directory: `dist/frontend`
- Demo data: append `?demo=true` to the URL (e.g., `https://your-domain.vercel.app/?demo=true`).

### Vercel
- Add `vercel.json` with `buildCommand` and `outputDirectory` (already included).
- Deploy via the Vercel dashboard or `vercel` CLI.

### Netlify
- Add `netlify.toml` with build and SPA fallback (already included).
- Configure build command `npm run build` and publish `dist/frontend` in Netlify dashboard.

### Local Preview
- `npm run start` and open `http://localhost:4200/?demo=true` (or custom port, e.g. `4201`).
