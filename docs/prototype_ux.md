# 8. UX / Prototype and Interaction Examples

## 8.1 Prototyping approach

A command-line product does not require graphical mockups for its principal workflow: representative commands, input and output examples satisfy the interaction-prototype requirement. The companion web application is described here as a screen-level wireframe specification; no completed UI screenshot is claimed.

## 8.2 Main CLI interaction scenarios

The following syntax is conceptual and intentionally uses the neutral placeholder command “infra-tool”; final spelling, flags and file names must be synchronized with the actual CLI before submission.

| Scenario | Illustrative interaction | Expected behavior / acceptance evidence |
| --- | --- | --- |
| Generate | infra-tool compile | Determine workspace scope; parse canonical YAML; generate selected configuration targets; report result without deploying. |
| Add a service | infra-tool add postgres | Choose a curated version or retrieve an available recipe; record a downloaded non-bundled recipe in local cache. |
| Import Compose | infra-tool import docker-compose.yaml | Read an existing Compose file and produce the tool’s canonical description, reporting unsupported fields. |
| Check configuration | infra-tool check | Return clear validation diagnostics; nonzero exit status when critical validation fails. |
| Find published recipes | infra-tool search <term> | Show names, compatibility and available published versions (network required). |
| Publish a recipe | infra-tool publish | Authenticate, validate and publish an immutable identified version (network required). |
| Retrieve version | infra-tool update <recipe> --version <version> | Fetch a chosen version and apply documented conflict rules without silent overwrite. |

## 8.3 Example canonical input (illustrative, not confirmed syntax)

services:
  - name: database
    image: postgres:17
    ports: ["5432:5432"]
    env:
      POSTGRES_DB: example
  - name: cache
    image: redis:7
    ports: ["6379:6379"]

This is a conceptual YAML sketch only. Final field names, image tags and compatibility with the three-version service policy must be verified against the actual parser and curated catalog. Secret values should not be committed to source control.

## 8.4 Expected output artifacts

| Target | Output example | Confirmation required |
| --- | --- | --- |
| Docker Compose | docker-compose.yaml | Exact filename and supported Compose keys. |
| Kubernetes | k8s/<service>-deployment.yaml | Actual directory naming, Deployment field mapping and resource strategy. |
| GitHub Actions | .github/workflows/<workflow>.yml | Workflow trigger model and generator scope. |
| GitLab CI/CD | .gitlab-ci.yml | Jobs/stages mapping and conflict handling. |

## 8.5 Web prototype — screen inventory

| Screen | Primary elements | Core action |
| --- | --- | --- |
| Recipe catalog | Search field; filters; result cards; supported versions | Locate reusable configurations. |
| Recipe details | Description; requirements; version timeline; examples | Compare and choose a compatible version. |
| Publish recipe | Authentication; metadata; validation feedback | Submit an accepted version. |
| My publications | Owned recipes; versions; publication status | Review and manage published material. |
| Account / sign-in | OAuth provider selection; session status | Access authorized features. |

## 8.6 Proposed interaction wireframe (text)

RECIPE CATALOG  |  Search [________________]  [Format ▾] [Version ▾]

Recipe: PostgreSQL service template   |  versions: 15 / 16 / 17*   [View]
Recipe: Redis service template        |  versions: 6 / 7 / ...*    [View]

Details → Compatibility → Version history → Download / Add to local cache

* Version labels above are merely wireframe examples and are not an assertion about the actual bundled catalog or upstream support lifecycle.

## 8.7 Prototype verification checklist

| Check | Success criterion |
| --- | --- |
| Offline compilation | Generate from local input and available local templates while disconnected. |
| Git-root scope | From a nested directory, stay within intended project boundary. |
| No-Git fallback | Use invocation directory and do not traverse unrelated parent directories. |
| Import fidelity | Represent supported Compose fields correctly and identify unsupported fields. |
| Overwrite protection | Manual edits are preserved absent explicit user authorization. |
| Remote operation failure | Clear error, no corruption of local files, and appropriate exit code. |
| Recipe version selection | Version identifier is explicit and retrieval is reproducible. |

## 8.8 Known gaps and next validation tasks

Confirm actual CLI commands and input schema against the Rust source; capture real terminal output from the working CLI; inspect backend routes and authentication implementation; confirm React screen availability; replace conceptual examples with screenshots; add genuine interview evidence when received; record supervisor feedback. The diagrams and scenarios are suitable as editable design documentation but should not be presented as evidence that all features are already finished.

# References and evidence notes

Project repository: https://github.com/GorkiyChocolate/Diploma-Project (public main-branch directory listing and README inspected 23 October 2026).

University submission rubric: “До 24 октября”, supplied by the project team; requires System Context, Use Case and draft Component diagrams, plus commands or input/output examples for tools without a graphical interface.

Design assumptions: agreed project scope and architecture supplied by the team in the current discussion. The diagrams are design targets, not automatically verified implementation mappings.

