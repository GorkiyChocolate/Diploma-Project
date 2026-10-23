# DevInit frontend (React + TypeScript)

A starter web interface for the DevInit diploma project. It includes an overview dashboard, service catalog, configuration YAML preview, version-management placeholder, and login/register forms wired to the backend's current auth endpoints.

## Requirements
- Node.js LTS (includes npm)
- Backend running locally for login/register

## Run locally
1. Extract this folder.
2. Open it in VS Code.
3. In the VS Code terminal run `npm install`.
4. Copy `.env.example` to `.env` (keep `VITE_API_URL=https://localhost:7091` for the backend's HTTPS profile).
5. Run `npm run dev`.
6. Open the local URL Vite prints, usually `http://localhost:5173`.

If the backend uses its HTTP profile, change `.env` to `VITE_API_URL=http://localhost:5167`. Restart Vite after changing `.env`.

## Current integration status
- Connected frontend calls: `POST /auth/login` with `{ email, password }` and `POST /auth/reg` with `{ name, email, password }`.
- Uses `credentials: 'include'` because the backend sets an HttpOnly cookie.
- The catalog is starter/sample data in the frontend. The current backend has service and service-version database models but no service CRUD/version routes, so it is not yet reading/writing those records.
- YAML preview is generated in the browser and copied to clipboard; it is not stored remotely and should be aligned with the Rust CLI's actual YAML schema before production.
- Version page explains the missing API rather than pretending the feature is live.

## Important backend items to fix before auth integration works reliably
1. Enable CORS for the Vite origin (`http://localhost:5173`) and allow credentials.
2. `JWTService` currently uses the database connection string as the token-signing key, while JWT validation uses `JWT:Secret`. Those values must use the same dedicated secret; do not use the database password as a JWT secret.
3. The backend cookie is `Secure = true`, so use the HTTPS backend profile for local auth.
4. Never commit database credentials or JWT secrets. Rotate any credentials that have been shared in source files and move them into environment variables/secrets.

## Build
`npm run build` creates the production bundle in `dist/`.
