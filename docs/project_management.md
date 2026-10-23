# 10. Project Management and Risks

### 10.1. Governance and responsibilities

The repository at https://github.com/GorkiyChocolate/Diploma-Project is the reported collaboration entry point. Public repository structure and exact implementation status must be verified against the latest commit before submission. Git author identities, user handles and access for the supervisor/committee require team confirmation. A YouTrack project has not yet been configured, so no issue IDs, screenshots or activity history are claimed here.

| Role / participant | Main scope | Evidence expected |
| --- | --- | --- |
| System programmer — Kuanysh Beibarys | Rust CLI, YAML processing, workspace detection, template selection, generation and CLI tests. | CLI commits/PRs, design decisions, fixtures and test reports. |
| Backend developer — Piriev Erkhan | ASP.NET Core REST API, authentication, catalog publication, configuration storage/versioning, PostgreSQL. | Backend commits/PRs, API contract, database migrations, integration tests. |
| Frontend developer — Zhumasheva Akerke | React web interface, authentication UX, search, template browsing and version views. | Frontend commits/PRs, UI mockups, screenshots and review history. |
| Supervisor — Kashkimbayeva Nurzhamal Meyrkulovna | Academic supervision, technical feedback and review milestones. | Dated comments, reviewed deliverables and response-to-feedback log. |

### 10.2. Proposed milestones and dependencies

| Window (provisional) | Planned deliverable | Prerequisites |
| --- | --- | --- |
| Oct 2026 | Problem statement; literature/comparison; initial requirements; architecture; test plan; repository documentation. | Supervisor review and agreed core scope. |
| Nov–Dec 2026 | CLI schema/validator and baseline generators; initial backend API and data model; React prototype. | Stable contracts and service metadata schema. |
| Jan–Feb 2027 | Catalog/cache, import, publishing/authentication and versioning workflows; frontend integration. | Service registry, API endpoints and test environments. |
| Mar–Apr 2027 | Integrated tests; file-preservation and negative tests; security review; UX feedback. | Working end-to-end paths and stable fixture suite. |
| May–Jun 2027 | Evaluation results, supervisor-approved revisions, final report and defense materials. | Completed test evidence and committee schedule. |

The dates above are a planning assumption, not confirmed university milestones. The team must adjust them to actual review checkpoints and supervisor instructions.

### 10.3. Task traceability and review workflow

- Create a YouTrack issue for each coherent deliverable; record owner, priority, due date, acceptance criteria and dependencies.
- Use task identifiers in branch names and pull-request titles/descriptions once issue tracking is active. Do not retroactively invent historical tasks.
- Use feature branches and peer-reviewed pull requests; record the test or inspection performed before merge.
- Map each requirement FR/NFR to one or more tasks and test IDs; maintain links to design decisions and artifacts.
- Retain meaningful incremental commits for each participant; tag reviewed pre-defense snapshots without overwriting prior tags.
- Keep secrets, access tokens, private keys and personal information out of commits; use examples with placeholders.
### 10.4. Requirements-to-evidence matrix (illustrative)

| Functional area | Proposed owners | Evidence / tests | Current claim |
| --- | --- | --- | --- |
| Workspace and local generation | CLI developer | CLI fixtures, T01–T06 | Working CLI parts reported; precise coverage unverified. |
| Catalog and caching | CLI + backend | Catalog definitions, T08 | Planned/under development; no pass results reported. |
| Compose import | CLI developer | Import fixtures, T07 | Planned/under development. |
| Authentication and distribution | Backend + frontend | API/UX tests T09–T11 | Backend parts reported; integration not verified. |
| Version comparison and rollback selection | Backend + frontend | Semver, history and authorization tests T09 | Specified; implementation extent unverified. |
| Accessibility and interaction | Frontend developer | UI prototype, T11 | React stack agreed; status needs confirmation. |

### 10.5. Risk register

| Risk | Likelihood / impact | Mitigation and trigger |
| --- | --- | --- |
| R1. Scope expands beyond basic generators | High / High | Freeze MVP formats/fields; approve new features through a change log; trigger: repeated unplanned additions. |
| R2. Manual files overwritten | Medium / High | Default non-destructive generation, atomic writes, backup/conflict policy and T05; trigger: any unexpected diff. |
| R3. Catalog template becomes outdated | High / Medium | Pin tested versions and metadata, schedule review, warn for unknown images; trigger: unsupported upstream version. |
| R4. Security issue in shared recipes or authentication | Medium / High | Validate published metadata, authorization tests, secure token handling, scan for secrets; trigger: unauthorized write or untrusted template. |
| R5. Complex format mapping is lossy | High / Medium | Document supported subset; diagnostics for unsupported constructs; trigger: silent field loss in T07. |
| R6. CLI/API/frontend contract drift | Medium / High | Contract tests, versioned API schema, scheduled integration checkpoints; trigger: client/server incompatibility. |
| R7. Missing YouTrack evidence before submission | High / High | Create the board and issues immediately; collect genuine screenshots and links; trigger: no auditable tasks. |
| R8. Inadequate participant or supervisor feedback | Medium / Medium | Use explicitly labeled pending sections; request dated interviews/review records; trigger: missing evidence by checkpoint. |
| R9. Insufficient evaluation time | Medium / High | Automate core tests early and reserve stabilization window; trigger: test cases without execution owner. |

### 10.6. Required submission evidence and outstanding items

The official pre-defense requirements call for a completed README, proposal/scope, literature and system/technology comparisons, initial requirements with acceptance criteria, editable diagrams, prototype evidence, evaluation plan, task-tracking link, and progressive contribution evidence. A complete finished application is not required at this stage. The submission form additionally requires one PDF containing screenshots of the issue board and tasks; this evidence is separate from the main written report.

| Item | Status as of this draft | Next action |
| --- | --- | --- |
| GitHub repository | Reported: https://github.com/GorkiyChocolate/Diploma-Project | Verify contributors, branches, current README and review history. |
| YouTrack board/issues | Not started (team statement) | Create real tasks, assign owners and acceptance criteria; then capture screenshots. |
| Interview/survey findings | Pending results | Insert actual participant counts, method, anonymized findings and limitations. |
| Supervisor comments | Not yet supplied | Insert dated feedback and concrete actions taken. |
| Test results | Not supplied | Run and record cases from Section 9 before claiming compliance. |
| CLI and backend status | Working components reported | Link specific commits, tests and demo examples. |
| React status | Technology selected | Confirm prototype and evidence from frontend developer. |
| Pre-defense tag | Not verified | Create when reviewed submission snapshot is ready. |

### 10.7. Next actions before submission

Highest immediate priority: (1) establish an auditable YouTrack board; (2) reconcile documentation and README with the official project title and actual repository state; (3) link existing CLI/backend evidence to requirements and tests; (4) collect supervisor feedback and authentic survey results; (5) capture the required board/task screenshots into the separate submission PDF. These are actions to be completed, not completed milestones.

# References and project basis

- Astana IT University. “До 24 октября”: pre-defense components and Git repository requirements (provided by the team, 2026).
- Project repository: https://github.com/GorkiyChocolate/Diploma-Project (provided by the team; contents must be checked at submission).
- Project documentation drafts: Sections 1, 3–8 prepared in previous report installments (team working drafts, 2026).
