# 6. Requirements Specification

### 6.1. Priority model and verification policy

MUST = baseline behavior targeted for formal acceptance; SHOULD = desirable in the planned release if capacity permits; COULD = explicitly deferred enhancement. Requirements below express a proposed baseline for review rather than confirmed implementation status. Each acceptance criterion is designed to be demonstrated by a repeatable test or inspection.

### 6.2. Functional requirements

| ID / Priority | Requirement | Acceptance criterion |
| --- | --- | --- |
| FR-01 / MUST | Workspace boundary discovery | Starting inside a Git project identifies its root; absent a Git root, uses invocation directory as scope. |
| FR-02 / MUST | Parse source declaration | Valid supported YAML creates a structured model; malformed YAML returns an actionable error and non-success status. |
| FR-03 / MUST | Validate source model | Missing mandatory fields, invalid ports and unresolved service references are reported before writing target files. |
| FR-04 / MUST | Generate Docker Compose | A supported source fixture produces a syntactically valid Compose file with expected service names, images, ports and dependencies. |
| FR-05 / MUST | Generate Kubernetes Deployment subset | A supported declaration renders the documented Deployment fields, while non-representable settings cause explicit warnings or errors. |
| FR-06 / MUST | Generate CI/CD subset | Documented input cases produce valid GitHub Actions and GitLab CI/CD workflow skeletons. |
| FR-07 / MUST | Built-in services and version selection | The catalog exposes approximately ten reviewed services and up to three supported versions each; unavailable versions fail clearly. |
| FR-08 / MUST | Additional-service local cache | An add operation downloads a permitted catalog definition and subsequent local use succeeds without a network connection. |
| FR-09 / MUST | Protect existing files | If output already exists, normal generation refuses destructive overwrite and preserves its bytes unchanged; explicit override is separately controlled. |
| FR-10 / SHOULD | Compose import | A supported existing Compose fixture is converted into the source schema and a report identifies unsupported or lossy fields. |
| FR-11 / MUST | Offline generation | Given cached/built-in dependencies, the main generation pipeline functions without access to backend or internet. |
| FR-12 / MUST | Remote publication and download | An authorized user publishes a versioned resource and another permitted user retrieves the exact stored version. |
| FR-13 / MUST | Semantic version lifecycle | Resources use validated semantic versions; version history and an earlier version remain retrievable after new publication. |
| FR-14 / SHOULD | Version comparison and rollback | Two published versions can be compared, and a prior revision can be selected without deleting the audit history. |
| FR-15 / MUST | Authentication and authorization | Server authenticates protected requests via verified JWT; third-party OAuth 2.0 login follows provider-verified authorization flow. |
| FR-16 / MUST | Search and browsing | Backend exposes resource search and version metadata; React client presents searchable resources and version details. |
| FR-17 / SHOULD | Deterministic output | Same input, catalog revision and options generate byte-identical files across repeated runs in the supported environment. |
| FR-18 / SHOULD | Dependency consistency checks | Unknown dependencies and cyclic service dependency graphs are rejected with useful diagnostics. |
| FR-19 / MUST | Execution boundary | Generation or import never automatically starts containers, modifies a cluster or runs CI pipelines. |

### 6.3. Non-functional requirements

| ID | Quality attribute | Acceptance criterion |
| --- | --- | --- |
| NFR-01 | Correctness | All gold-standard fixtures pass the documented schema and target-format validation procedures. |
| NFR-02 | Reliability | A failed render leaves prior output files intact; partial files are not exposed as successful output. |
| NFR-03 | Security | Published examples reject embedded credentials in agreed test patterns; unauthorized writes return access-denied responses. |
| NFR-04 | Reproducibility | For fixed input and dependency versions, 100% of repeated-output comparison fixtures are byte-identical. |
| NFR-05 | Maintainability | Target renderers and service catalogs are separated by documented interfaces and have independent automated tests. |
| NFR-06 | Usability | CLI help and validation messages identify the failed operation, field and suggested correction where possible. |
| NFR-07 | Portability | Release candidates are demonstrated on a documented supported Linux development environment; other OS support is not assumed. |
| NFR-08 | Observability | Backend operations log request IDs, outcome categories and errors without disclosing tokens or secrets. |
| NFR-09 | Performance | Generation time and memory usage are measured on an identified machine and fixed workload; pass thresholds are approved after a baseline study. |
| NFR-10 | Data integrity | A resource version is immutable once published; concurrent attempts to publish an existing version return a conflict. |
| NFR-11 | Availability | Offline CLI generation does not depend on remote API availability. |
| NFR-12 | Documentation | Every supported target has a usage example, limitations and a reproducible validation command in the user guide. |

### 6.4. Use case inventory

| Use case | Primary actor | Outcome / related requirements |
| --- | --- | --- |
| UC-01 Generate project configuration | Developer | Validated, non-destructively generated files (FR-01–FR-07, FR-09, FR-11). |
| UC-02 Add service definition | Developer | Local catalog entry resolved or fetched and cached (FR-07–FR-08). |
| UC-03 Import Compose configuration | Developer | Source declaration plus compatibility report (FR-01, FR-10). |
| UC-04 Publish configuration | Authenticated author | Persisted immutable resource version (FR-12, FR-13, FR-15). |
| UC-05 Discover and retrieve | Developer / browser user | Search, inspect metadata, download requested version (FR-12, FR-16). |
| UC-06 Compare and restore version | Authenticated author | Prior version retrieved/selected without erasing history (FR-13, FR-14). |

### 6.5. High-priority acceptance scenario examples

#### AC-01 Local generation without a Git repository

Given a directory without an ancestor .git and a valid source YAML; when the user invokes the generation command there; then only the current directory is treated as the work area and generated files are placed within the documented output paths.

#### AC-02 Protection of manual edits

Given an existing hand-edited Docker Compose output; when normal generation is requested; then its original bytes remain unchanged, the command reports a conflict and a deliberate override is required.

#### AC-03 Catalog cache

Given a service definition that is not bundled but can be downloaded; when it is added successfully; then the definition is persisted locally and can later be resolved while offline.

#### AC-04 Published version history

Given resource R at version 1.0.0; when an authorized author publishes 1.1.0; then both versions remain independently retrievable and the earlier release is not silently mutated.

#### AC-05 No deployment side effects

Given a valid declaration; when local generation succeeds; then no Docker, Kubernetes or CI execution action is triggered by the tool.

### 6.6. Traceability and outstanding validation

The technical evidence should trace each requirement to a tracked issue, implementation commit or pull request, and at least one corresponding test. Suggested identifiers are FR-xx, NFR-xx and UC-xx; actual work-item IDs and repository links must be inserted after the team’s tracking system has been configured. Because YouTrack has not yet been started and only two GitHub repositories are reported (CLI and web service), the management evidence is not yet complete. The React client may be developed within an existing repository or independently; repository organization remains a team decision.

Before submitting this section, confirm: (1) reviewed service list/version policy; (2) precise input schema and target subsets; (3) measured baseline and performance thresholds; (4) actual working demonstrations; (5) real user consultations and stakeholder findings; (6) supervisor review and approved calendar. These points are open items, not established project outcomes.

# Source and drafting notes

Basis: user-provided project decisions recorded in conversation; university pre-defense criteria in “До 24 октября.docx”; companion working paper “Research Foundation and Comparative Technical Analysis” (sections 3–5). Statements about research findings and comparative advantages belong to the companion document and must retain its source citations. Requirements here are project-specific proposals for team and supervisor approval.

