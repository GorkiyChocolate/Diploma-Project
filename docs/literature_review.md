# 3. Literature Review

### 3.1. Research context and selection method

Infrastructure as Code (IaC) represents infrastructure definitions in machine-readable, versionable artifacts. Authoring these artifacts involves format-specific conventions, dependency relationships, image-version selection, and security-sensitive configuration. The proposed tool addresses the narrower problem of generating and exchanging configuration files for Docker Compose, Kubernetes Deployments, GitHub Actions, and GitLab CI/CD from one declarative input model. It does not claim semantic equivalence among these ecosystems or replace their deployment engines.

Sources were selected for direct relevance to model-driven IaC generation, defects and code smells, security validation, version consistency, and automated testing. The set emphasizes 2022–2026 work. Publisher or conference pages and DOIs were checked where available. Findings from Puppet, Ansible, TOSCA, Pulumi or Dockerfile-specific studies are treated as motivating evidence, not as direct proof about Docker Compose generation.

### 3.2. Structured analysis of scientific publications

Table 1 maps thirteen publications to their empirical or conceptual contribution, limitations, and testable design implications. “Implication” describes a project hypothesis or engineering design choice rather than a result already demonstrated by the proposed tool.

| ID | Study | Contribution | Limitations | Implication for proposed tool |
| --- | --- | --- | --- | --- |
| S1 | Vasileiou et al. (2026 volume; online 2025) | Guided TOSCA modeling using ontology-based recommendations, validation, completion and industrial cases. | Focused on TOSCA and knowledge graphs; requires substantial modeling infrastructure. | Separate a concise declarative authoring model from backend-specific emitters; make validation explicit. |
| S2 | Pahl, Sezen & Hofer (2026) | Systematic review of AI applications across IaC lifecycle. | AI-specific research is not direct evidence that a rule-based tool performs better. | Use as broad taxonomy and contrast deterministic transformation against probabilistic approaches. |
| S3 | Esposito et al. (2026) | Generative-AI infrastructure copilot for DevSecOps-oriented IaC automation. | Model outputs demand verification; different operational and cost profile. | Explain why a non-AI, reproducible generator is an intentionally limited design. |
| S4 | SANER IaC smells study (2024) | Analysis of twelve implementation/design smell types in 82 Puppet projects; reports significant occurrence and maintenance associations. | Observational associations; Puppet sample is not universally representative. | Prioritize consistency, modularity checks and measurable output validation. |
| S5 | Rosa et al. (2024) | Empirical study of Dockerfile smells and developers’ responses to proposed automated repairs. | Dockerfile build instructions differ from Compose services. | Prefer explicit image tags and test the acceptability of safer generated defaults. |
| S6 | Dalla Palma et al. (2024 issue; online 2023) | Examines overly large TOSCA blueprints and compares smell-detection approaches. | TOSCA-specific structure; no evidence that a small YAML schema alone prevents complexity. | Support modular service recipes and constrain nesting/complexity as needed. |
| S7 | Opdebeeck et al. (2022) | Finds Ansible variable smells through dependency-sensitive analysis of 21,931 roles. | Ansible variable precedence is ecosystem-specific. | Validate parameter resolution and unresolved references beyond YAML syntax. |
| S8 | Saavedra & Ferreira (2022) | GLITCH maps Puppet, Chef and Ansible to an intermediate representation for cross-language security-smell checks. | Does not directly demonstrate Compose/Kubernetes/CI workflow coverage. | Represent common service semantics internally; implement emitter-specific validation. |
| S9 | Ntentos et al. (2025 issue; online 2024) | Studies understandability of design-level security practices in IaC and deployment architecture. | Security comprehension does not guarantee absence of exploitable flaws. | Document security defaults and provide interpretable validation feedback. |
| S10 | War et al. (2025) | Empirical investigation of vulnerabilities in IaC artifacts and related characteristics. | Observed vulnerability patterns depend on ecosystem and sampling. | Treat template provenance and secret handling as first-class requirements. |
| S11 | Sokolowski et al. (2024) | Automated Configuration Testing with ProTI; evaluation includes 6,081 IaC programs. | Implementation targets Pulumi TypeScript; not a ready-made test suite for YAML emitters. | Adopt generative tests, structural oracles and negative scenarios. |
| S12 | Drosos et al. (2024) | Empirical fault analysis across Ansible, Puppet and Chef (360 issues reported in publication). | Fault taxonomy does not cover all failure modes in the proposed format set. | Use fault categories to design malformed-input and dependency-cycle tests. |
| S13 | Hassan et al. (2024) | Study of 5,110 infrastructure state-reconciliation defects and associated categories. | Deals with deployment/state reconciliation, which is outside the tool’s initial execution scope. | Explicitly exclude orchestration and state reconciliation from initial claims. |

### 3.3. Critical synthesis: four recurring engineering challenges

#### 3.3.1. Abstraction without false equivalence

The model-driven work on guided IaC creation demonstrates the value of assisting authors through reusable, structured knowledge [S1]. Yet a Docker Compose service, a Kubernetes Deployment, and a CI job express different semantics. A unified input schema cannot truthfully promise feature-preserving translation for every property. The proposed tool should therefore define a supported semantic subset, flag unsupported properties per target, and test each output against native tools. An intermediate representation is a plausible architecture informed by cross-technology analysis [S8], but its effectiveness remains to be validated.

#### 3.3.2. Reuse, quality and configuration drift

Empirical studies associate infrastructure code with maintainability smells, poor modularity and variable-related mistakes [S4, S6, S7]. The Dockerfile investigation additionally underscores why explicit image-version selection is relevant to reproducibility [S5]. For the proposed tool, a limited built-in set of approximately ten popular services, each with three recent versions, and downloaded local recipes may reduce repetitive input. However, any “verified” template must have a stated verification process, target-version policy, source provenance and expiration/update rules. Reuse alone does not guarantee correctness or security.

#### 3.3.3. Security, authorship and publication boundaries

Security-focused studies motivate checks that detect suspicious configurations and explain their meaning [S8–S10]. The tool should separate ordinary local generation from network-dependent discovery, authentication and publication. No raw secrets should be published in reusable recipes; examples should use placeholders, and authentication requirements apply to platform actions, not offline compilation. JWT-based sessions and OAuth 2.0-based external sign-in are planned for the backend; this choice requires detailed token lifecycle and authorization design in later documents.

#### 3.3.4. Validation should be measurable

The literature on automated configuration testing [S11] suggests that tests should exercise invalid input and structural output properties, not only successful example executions. Relevant checks include deterministic output for identical input, schema validity, dependency-cycle rejection, preservation of manual edits unless explicitly overridden, valid paths within the selected project boundary, and refusal to publish embedded credentials. By contrast, runtime state reconciliation [S13] concerns a different system boundary and should not be claimed as a target capability.

### 3.4. Research gaps and project hypotheses

Gap G1: Multi-format configuration authoring remains dependent on the target format; the project will assess how far a limited common service schema can reduce duplicated authoring without hiding incompatibilities.

Gap G2: Template reuse offers convenience but raises maintenance, provenance and version-selection questions; the project will specify a curated built-in catalog plus explicit locally cached external recipes.

Gap G3: Quality claims require direct experiments; the project will compare generated artifacts against manually prepared baseline files on correctness, authoring time and reproducibility.

Gap G4: Local-first workflows and publishing platforms have different trust boundaries; the project will keep compilation operational without the backend and evaluate publication separately.

### 3.5. Literature review conclusion

The literature supports the importance of validation, explainable rules, modular reuse and rigorous evaluation. It does not prove that the proposed tool is faster, more secure or more reliable than the alternatives. Those claims are deferred to the planned verification work. The resulting architecture is intentionally scoped to configuration generation and distribution rather than running containers or reconciling live resources.


## References: Scholarly Sources



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

