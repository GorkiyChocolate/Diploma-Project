# 1. Project Proposal

### 1.1. Project information

| Field | Details |
| --- | --- |
| Official title | Development of a CLI-Oriented Platform for Infrastructure Configuration Management with Support for Declarative Generation, Versioning, and Distribution |
| Institution | Astana IT University |
| Supervisor | Kashkimbayeva Nurzhamal Meyrkulovna, PhD, Assistant Professor |
| Team | Kuanysh Beibarys — system programming / Rust CLI; Piriev Erkhan — C#/.NET backend; Zhumasheva Akerke — React frontend |
| Status | In development. Working CLI and backend components have been reported; functionality and demonstrable builds remain to be inventoried. |
| Planning horizon | October 2026–June 2027, provisional; subject to university schedule and supervisor approval. |

### 1.2. Problem statement

Developers frequently maintain multiple infrastructure configuration formats for related application stacks. Docker Compose, Kubernetes manifests and CI/CD workflows express different operational concepts and schemas, which can result in repeated definitions, inconsistent conventions and considerable manual configuration work. Reusing arbitrary configurations introduces additional concerns: users need to know what was selected, which version was used, and whether its structure meets predefined checks. The project addresses these authoring and reuse problems through a local-first CLI tool with a structured declaration and an optional platform for distributing versioned configuration resources.

The proposed tool does not attempt to replace infrastructure provisioners, container orchestrators or CI/CD execution engines. Its principal responsibility is authoring, importing, validating, generating, and distributing configuration artifacts; actual deployment and execution remain outside the baseline scope.

### 1.3. Target users and representative scenarios

| Target group | Needs / representative scenario |
| --- | --- |
| Application developers | Generate consistent development-stack configurations from a single declaration and add standard services without rewriting repetitive details. |
| Small engineering teams | Reuse approved service definitions and share versioned configuration resources across projects. |
| DevOps / platform engineers | Inspect generated files, test schema and dependency validity, and review how declarations map to target ecosystems. |
| Students / educators | Study infrastructure formats and reproduce examples in a controlled, documented manner. |

### 1.4. Aim and measurable objectives

Aim: Design and evaluate a CLI-oriented instrument that reduces repeated configuration authoring through declarative, deterministic generation and supports reusable, versioned, distributable configuration resources.

- O1. Define one explicit, documented source YAML schema for supported service declarations, with validation diagnostics.
- O2. Implement local generation for Docker Compose, basic Kubernetes Deployment resources, GitHub Actions and GitLab CI/CD, with feature coverage declared separately for each target.
- O3. Provide an initial catalog of approximately ten popular, reviewed services with up to three recent supported versions per service; permit on-demand retrieval and local caching of additional service definitions.
- O4. Support detection of a project work area, importing existing Docker Compose configuration where representable, and preserving manually modified output by default.
- O5. Introduce remote publication, discovery, download and semantic version management of reusable configurations via a .NET service and React interface.
- O6. Evaluate correctness, determinism, usability and maintainability with reproducible acceptance tests and manually written baseline cases.
### 1.5. Intended workflow and boundaries

The generator establishes its project scope by searching upward from the invocation directory for a Git root. If no .git boundary is found, it operates in the directory where it was invoked; the precise treatment of nested worktrees, symbolic links and multiple candidate files will be settled in detailed design. The same workspace discovery mechanism serves the primary generation workflow and can support inspection of existing configuration files. Import of a Docker Compose file into the source declaration is a separate capability, even if invoked from this common workspace context.

The local CLI parses and validates the source declaration, resolves service definitions from the built-in catalog or a local cache, constructs a normalized internal model, then renders the requested supported output formats. The CLI must operate without a server for the local authoring workflow. Optional network commands use the backend to search, publish, obtain and version reusable definitions. The backend is planned to provide REST interfaces, PostgreSQL persistence, JWT-based authorization and external OAuth 2.0 sign-in; OAuth integrations and token handling require separate security design.

### 1.6. Scope, exclusions and assumptions

| Included in baseline scope | Excluded / deferred |
| --- | --- |
| Declarative YAML input; schema checks; deterministic generation | Executing generated workflows, deploying to Kubernetes or starting containers automatically |
| Docker Compose output; limited Kubernetes Deployment and CI/CD templates | Full coverage of all Kubernetes resource kinds and every CI/CD option |
| Catalog of reviewed service templates and locally cached additional templates | Unverified community templates treated as trusted by default |
| Import of representable Docker Compose constructs; explicit lossiness report | Guaranteed lossless import of every Compose extension and runtime behavior |
| Versioned resource publishing, lookup, retrieval and rollback in platform design | Source-control replacement, state reconciliation or full environment orchestration |
| Guardrails for overwriting existing output | Automatic rewriting of unrelated user-authored files |

Assumptions requiring confirmation: the exact ten built-in service names; supported image versions and maintenance policy; the detailed YAML schema; backend endpoint readiness; frontend implementation status; external sign-in providers; the agreed formal client or interviewed users. No empirical user evidence is asserted until documented.

### 1.7. Expected deliverables and success criteria

| Deliverable | Proposed evidence |
| --- | --- |
| CLI implementation and specification | Versioned source code, sample inputs/outputs, documented supported fields, repeatable command demonstrations |
| Server API and storage | API specification, migrations, integration tests, authenticated resource lifecycle demonstration |
| Web client | React screens for discovery/version browsing and corresponding API integration evidence |
| Three architecture views | Editable System Context, Use Case and Component diagrams; diagram-to-requirement traceability |
| Evaluation package | Gold-standard fixtures, validation tests, reproducibility tests, baseline comparison and limitations report |
| Managed development record | GitHub repositories, attributed commits/PRs, tasks linked to contributions, supervisor feedback and milestone tags |

### 1.8. Preliminary milestones and risks

| Period (provisional) | Target output |
| --- | --- |
| Oct 2026 | Confirmed scope, research synthesis, requirements baseline, architecture and existing-code inventory |
| Nov–Dec 2026 | Core parsing, generation, catalog resolution and CLI validation |
| Jan–Mar 2027 | Backend publication/versioning, authentication, React client and API integration |
| Apr–May 2027 | Import hardening, cross-format tests, performance measurement and documentation |
| Jun 2027 | Final integration, defense demonstrations and report |

| Risk | Mitigation |
| --- | --- |
| Schema and target-format mismatch | Declare supported subset and explicit warnings for unsupported constructs. |
| Incorrect or obsolete service templates | Pin and document supported versions, review catalog changes and test representative outputs. |
| Overwriting manually edited files | Never overwrite by default; require explicit conflict resolution or a deliberate force mode. |
| Security of published definitions | Validate inputs, enforce scoped authorization, audit version history and prohibit secrets in published examples. |
| Insufficient user evidence or development traceability | Schedule and record genuine interviews; document commits, review and acceptance evidence continuously. |
| Ambitious cross-format scope | Prioritize Compose generation and a minimal verified subset for the other targets. |

