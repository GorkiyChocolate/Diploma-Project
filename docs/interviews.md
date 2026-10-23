# Evidence of Relevance: Developer Survey and Expert Interview

**Diploma topic:** Development of a CLI-Oriented Platform for Infrastructure Configuration Management with Support for Declarative Generation, Versioning, and Distribution.

**Research status:** Initial exploratory evidence; not a usability evaluation of a finished tool.

## 1. Research objectives and methods

The team collected an exploratory questionnaire about developers' infrastructure configuration practices and conducted one text-based consultation with a practicing DevOps engineer. The questionnaire explored setup complexity, perceived value of proposed generation and validation features, adoption intent, and objections. The consultation explored a potential early-stage use case and implementation challenges. These two sources are analyzed separately because they involve different methods and cannot be treated as equivalent interviews.

### Survey sample and limitations

The spreadsheet contains **12 responses**. Respondents selected different professional roles, including backend, software, frontend, DevOps/SRE, and IT student categories. The responses include entries from members of the project team; therefore, results **are not an independent or representative market survey**. This is a convenience sample and results should be interpreted as preliminary feedback, not proof of product effectiveness or market demand. Some respondents reported little or no hands-on infrastructure setup experience. Survey questions described the tool's hypothetical capabilities; ratings measure *perceived usefulness*, not measured improvements.

No respondent email addresses are reproduced in this document.

## 2. Quantitative results (n = 12)

| Question/indicator | Observed result | Interpretation |
|---|---:|---|
| Perceived difficulty of preparing configurations | 5/12 rated it 4–5 on a five-point difficulty scale | Some respondents face substantial difficulty; 7/12 selected the middle score. |
| Typical initial setup time | 6/12 selected 1–3 hours; 3/12 selected 30–60 minutes; 1/12 selected 15–30 minutes; 2/12 had not performed this work | Manual initial setup can consume meaningful time, but the responses cannot establish a universal baseline. |
| Docker Compose generation usefulness | 8/12 rated 4–5 out of 5 | Positive interest, with 4/12 neutral. |
| Kubernetes generation usefulness | 10/12 rated 4–5 | Stronger stated interest among this sample. |
| CI/CD generation usefulness | 9/12 rated 4–5 | Respondents commonly rated this proposed feature positively. |
| Configuration validation usefulness | 10/12 rated 4–5 | Supports prioritizing validation as a research/design requirement. |
| Ready-made configuration library usefulness | 11/12 rated 4–5 | A highly rated proposed feature. |
| Importance of manual editing of generated files | 9/12 rated 4–5 | Generated artifacts should remain inspectable and editable. |
| Likelihood of trying the tool | Scores of 8–10 from 9/12 respondents | Stated willingness to try is not evidence of actual adoption. |

### Frequently selected difficulties

These were multiple-choice selections; one respondent could select several items.

| Difficulty | Responses |
|---|---:|
| Kubernetes configuration complexity | 7 |
| CI/CD configuration complexity | 7 |
| Incorrect Docker Compose configuration | 6 |
| YAML syntax errors | 5 |
| Port and dependency conflicts | 5 |
| Rewriting similar configurations | 3 |
| Maintaining configuration files | 3 |

### Three most useful capabilities (multi-select question)

| Capability | Selections |
|---|---:|
| GitHub Actions / GitLab CI generation | 9 |
| Kubernetes Deployment generation | 7 |
| Docker Compose generation | 6 |
| User-defined automation rules | 5 |
| Infrastructure configuration validation | 4 |
| Ready-made configuration library | 2 |

These counts reflect survey responses, not a validated priority ranking for the implementation roadmap. Certain planned features received interest despite not yet being implemented.

## 3. Qualitative objections and risks

Free-text responses described concerns about learning an additional proprietary syntax, insufficient flexibility for real projects, security and trust, implementation errors damaging existing configuration files, insufficient learning materials, and competition from existing tools or AI-assisted configuration generation. One response specifically mentioned Kafka, gRPC, secrets, migrations, and differences between deployment environments as examples of requirements that simplistic abstractions may fail to cover.

These comments support the following design decisions: retain standard output files; document the input syntax; preserve manual changes by default; clearly separate generated content from user-owned content; validate dependencies and formats; and avoid claiming universal support for all deployment patterns.

## 4. DevOps expert consultation (12 October 2026)

| Attribute | Recorded information |
|---|---|
| Participant | Saken Aldiyar (Сакен Алдияр) |
| Role | DevOps Engineer |
| Organization | Wipon |
| Reported experience | 2.5 years |
| Format | Text conversation |
| Topic | Single-file declarative description and generation of Docker Compose, Kubernetes and CI/CD artifacts |

The participant asked whether the entire infrastructure would be declared in one file and compared the idea conceptually with Ansible. After clarification, he considered the idea particularly suitable for early-stage startups. He also identified **CI/CD support as a difficult part of the implementation because CI/CD systems use different syntaxes**. The project representative proposed addressing this with an abstraction layer. The participant expressed interest in reading the architecture when available.

### Expert feedback mapped to development decisions

| Evidence from consultation | Implication for the tool |
|---|---|
| Potential suitability for early-stage startups | Prioritize an accessible first-run workflow and simple project scaffolding. |
| Syntax differences across CI/CD systems | Define a provider-neutral model where feasible and separate provider-specific generators; document unsupported constructs. |
| Interest in reviewing the architecture | Seek a subsequent expert review with concrete diagrams and generated examples. |

**Interpretation limits:** This was one informal consultation, not a structured interview protocol or hands-on usability test. Interest in architecture does not imply a commitment to use the tool, and no productivity benefit was measured.

## 5. Synthesis and requirements traceability

| Finding | Project requirement/design consequence | Verification approach |
|---|---|---|
| Difficult Kubernetes and CI/CD setup | Provide declared outputs for these formats, with bounded scope and clear examples | Golden-file generation tests against reference inputs |
| Demand for validation | Validate input schema, required fields, port mappings and dependencies | Valid/invalid configuration test suite |
| Interest in reusable configurations | Ship a small curated default library and support local caching of additional service definitions | Offline and repeated-addition test cases |
| Concern about existing files | Preserve manual edits by default; require explicit opt-in for destructive replacement | Regression tests for conflict and overwrite paths |
| Concern about new syntax and flexibility | Keep generated files in standard formats and document escape hatches or unsupported settings | User walkthroughs and supported-feature matrix |
| Heterogeneous CI/CD syntax | Separate generic workflow representation from target-specific rendering | Cross-provider scenario tests with known limitations |

## 6. Conclusion

The 12-response convenience survey and one industry consultation provide **preliminary evidence of relevance**, especially around configuration complexity, validation, reusable templates, and the challenge of generating CI/CD workflows. They do not demonstrate a statistically representative demand, user adoption, or proven performance improvements. The next stage should include additional independent practitioners, structured interviews, and task-based evaluation of the actual implementation.

## Evidence and data provenance

- Primary questionnaire: *Developer Survey on Infrastructure Configuration Automation*, 12 responses, Excel export supplied by the project team (October 2026).
- Primary consultation: text exchange with Saken Aldiyar, DevOps Engineer at Wipon, 12 October 2026, supplied by the project team.
- The original spreadsheet should be retained privately or shared under appropriate access controls because it contains personally identifiable contact information. Do **not** commit the raw response workbook to a public repository without reviewing and removing personal data.
