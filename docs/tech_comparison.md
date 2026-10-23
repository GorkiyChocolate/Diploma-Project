# 5. Technology Comparison

### 5.1. Decision framework

The university requires at least three key technical choices with two or three reasonable alternatives each. Options below are evaluated against anticipated requirements rather than presented as completed benchmarks. Selected technologies reflect the agreed team architecture.

### 5.2. Decision A — CLI implementation language

| Criterion | Rust (selected) | Go | Python |
| --- | --- | --- | --- |
| Distribution | Compiled native binary | Compiled native binary | Interpreter or packaged executable |
| Safety | Strong static typing/ownership; explicit error handling | Memory-safe managed runtime; simpler concurrency | Dynamic typing; fast scripting |
| CLI/YAML ecosystem | Available mature crates; compilation overhead | Strong standard library; YAML ecosystem | Broad libraries; packaging complexity |
| Operational footprint | No required language runtime for binary | No required language runtime for binary | May require bundling interpreter |
| Trade-off | Steeper learning curve, build complexity | Garbage-collected runtime | Runtime/dependency and reproducibility concerns |

Decision: Rust suits a deterministic local CLI distributed as a standalone executable, with strong compile-time guarantees. Go would also be credible and likely simpler to maintain; Rust is not assumed to be universally faster without measurement. Acceptance requires reproducible builds, error-message quality and test coverage.

### 5.3. Decision B — backend platform

| Criterion | ASP.NET Core / C# (selected) | Spring Boot / Java | Go net/http |
| --- | --- | --- | --- |
| HTTP and auth | Mature web and authentication stack | Mature web and security ecosystem | Lean standard HTTP; auth assembly required |
| Database integration | Established PostgreSQL drivers/ORM tooling | Established JDBC/JPA tooling | PostgreSQL drivers and SQL libraries |
| Development trade-off | Strong typing; .NET expertise in team | Mature but potential framework complexity | Small services; more manual feature choices |
| Team alignment | Backend member responsible for .NET | Would require stack change | Would require stack change |

Decision: ASP.NET Core offers a coherent platform for REST APIs, user access control, catalog operations and publication history. JWT and OAuth 2.0 must be implemented according to security guidance rather than assumed secure merely by selecting a framework.

### 5.4. Decision C — metadata and publication storage

| Criterion | PostgreSQL (selected) | MySQL | MongoDB |
| --- | --- | --- | --- |
| Data shape | Relational users, recipes, versions, permissions | Relational records and indexes | Document-oriented recipes and metadata |
| Version integrity | Transactions/constraints and relational references | Transactions/constraints | Document and transaction mechanisms |
| Flexible recipe payload | JSONB plus relational schema | JSON plus relational schema | Native document representation |
| Operational considerations | SQL migrations, backups, indexes | Comparable SQL operations | Different consistency/query design |

Decision: PostgreSQL provides relational integrity for users, recipes, revisions and access control while permitting structured recipe payload storage. Stored publication versions must be immutable identifiers; mutable labels or “latest” pointers should resolve to an immutable revision. Semantic Versioning conveys intended compatibility but cannot prove compatibility without tests.

### 5.5. Supporting design choices (not counted as the three principal comparisons)

React is the intended frontend technology for the optional website. The local tool should discover the project root by walking upward to .git; if no Git boundary exists it uses the invocation directory as its scope. Generation searches for relevant project files only within that boundary. Importing existing Compose files into the declared input representation is an independent parsing path. The generation command must check existing files before writing and preserve manual edits by default; explicit overwrite behavior requires its own documented safety policy.

The CLI is offline-capable for its built-in catalog (approximately ten popular services, with up to three maintained recent versions per service). Less common recipes may be retrieved online and cached locally after addition for future reuse. Cached versions must be keyed to precise recipe and artifact versions; catalog freshness and signature or checksum verification are open design decisions, not implemented guarantees.

### 5.6. Decision summary and risks

| Choice | Rationale | Primary risk | Planned mitigation |
| --- | --- | --- | --- |
| Rust CLI | Portable local binary; typed configuration pipeline | Cross-platform packaging and complexity | Automated platform builds and fixtures |
| ASP.NET Core | REST and identity workflows aligned to team | Authentication complexity and service availability | Security reviews; offline/online separation |
| PostgreSQL | Consistent recipe/version metadata | Schema migration and concurrency errors | Constraints, migrations, transactional tests |
| React (supporting) | Browser-based catalog/user flows | Interface work not yet completed | Incremental frontend milestones |

# References — scholarly sources

[S1] Vasileiou, Z., et al. A knowledge-based approach for guided development of Infrastructure as Code. Software and Systems Modeling 25, 515–548 (2026; first published online 2025). https://doi.org/10.1007/s10270-025-01294-1

[S2] Pahl, C., Sezen, Ö. C., & Hofer, F. Artificial Intelligence for Infrastructure-as-Code—A Systematic Literature Review. Electronics 15(4), 755 (2026). https://doi.org/10.3390/electronics15040755

[S3] Esposito, M., et al. Generative AI as an infrastructure copilot: automating Infrastructure-As-Code across the DevSecOps lifecycle. Automated Software Engineering 33, article 58 (2026). https://doi.org/10.1007/s10515-026-00600-5

[S4] On the Prevalence, Co-occurrence, and Impact of Infrastructure-as-Code Smells. IEEE SANER (2024), pp. 23–34. https://doi.org/10.1109/SANER60148.2024.00009

[S5] Rosa, G., Zappone, F., Scalabrino, S., & Oliveto, R. Fixing Dockerfile smells: an empirical study. Empirical Software Engineering 29, article 108 (2024). https://doi.org/10.1007/s10664-024-10471-7

[S6] Dalla Palma, S., et al. Through the looking-glass: An empirical study on blob infrastructure blueprints in TOSCA. Journal of Software: Evolution and Process 36(4), e2533 (2024; online 2023). https://doi.org/10.1002/smr.2533

[S7] Opdebeeck, R., Zerouali, A., & De Roover, C. Smelly Variables in Ansible Infrastructure Code: Detection, Prevalence, and Lifetime. MSR (2022), pp. 61–72. https://doi.org/10.1145/3524842.3527964

[S8] Saavedra, N., & Ferreira, J. F. GLITCH: Automated Polyglot Security Smell Detection in Infrastructure as Code. ASE (2022). https://doi.org/10.1145/3551349.3556945

[S9] Ntentos, E., et al. On the Understandability of Design-Level Security Practices in Infrastructure-as-Code Scripts and Deployment Architectures. ACM TOSEM 34(1), article 6 (2025; online 2024). https://doi.org/10.1145/3691630

[S10] War, A., Diallo, A., Habib, A., et al. Vulnerabilities in infrastructure as code: what, how many, and who? Empirical Software Engineering 30(5) (2025). https://doi.org/10.1007/s10664-025-10672-8

[S11] Sokolowski, D., Spielmann, D., & Salvaneschi, G. Automated Infrastructure as Code Program Testing. IEEE Transactions on Software Engineering 50(6), 1585–1599 (2024). https://doi.org/10.1109/TSE.2024.3393070

[S12] Drosos, G.-P., Sotiropoulos, T., & Alexopoulos, G. When Your Infrastructure Is a Buggy Program: Understanding Faults in Infrastructure as Code Ecosystems. Proceedings of the ACM on Programming Languages (2024). https://doi.org/10.1145/3689799

[S13] Hassan, M. M., Salvador, J., Santu, S. K. K., & Rahman, A. State Reconciliation Defects in Infrastructure as Code. ACM FSE (2024). https://2024.esec-fse.org/details/fse-2024-research-papers/50/State-Reconciliation-Defects-in-Infrastructure-as-Code

# References — official technical documentation

[T1] Docker Compose documentation. https://docs.docker.com/compose/

[T2] Helm introduction. https://helm.sh/docs/intro/introduction/

[T3] Kubernetes: Declarative Management Using Kustomize. https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/

[T4] Terraform documentation. https://developer.hashicorp.com/terraform/docs

[T5] Pulumi concepts and architecture. https://www.pulumi.com/docs/iac/concepts/

[T6] GitHub Actions workflow syntax. https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax

[T7] GitLab CI/CD YAML syntax reference. https://docs.gitlab.com/ci/yaml/

[T8] Semantic Versioning 2.0.0. https://semver.org/

[T9] Docker Compose file specification. https://docs.docker.com/reference/compose-file/

# Submission and evidence notes

To integrate these sections into the final pre-defense report, add actual interview records, confirmed feature-level implementation evidence, individual contribution history, YouTrack materials, supervisor feedback and editable architecture diagrams. These are not inferred from the external literature. Dates and prototype milestones are provisional. No measured improvement is claimed until experiments are conducted.

