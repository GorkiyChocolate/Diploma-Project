# 9. Verification and Evaluation Plan

### 9.1. Objective and evidence policy

The evaluation will determine whether the proposed tool reliably transforms declarative service definitions into supported infrastructure configuration files while preserving user-authored changes. It will also assess workspace resolution, reusable service catalog behavior, import fidelity, version distribution, and security controls. This section specifies planned experiments, acceptance thresholds and evidence artifacts; it does not claim that the tests have already passed.

Evaluation units are (a) the Rust CLI, (b) ASP.NET Core API and PostgreSQL persistence, (c) web interaction where available, and (d) cross-component workflows. Each test run must record the Git commit, test fixture version, operating system, runtime/tool versions, command or API request, expected outcome, observed outcome and relevant logs.

### 9.2. Baselines and comparison conditions

| Baseline | Comparison method | Interpretation / limitation |
| --- | --- | --- |
| B1: Manual configuration | Prepare equivalent Compose and basic Kubernetes/CI examples manually from official specifications. Compare correctness and authoring effort under the same scenarios. | Time savings are hypothetical until measured; operator familiarity can influence results. |
| B2: Native validation | Use target-format parsers/validators (e.g. Docker Compose validation and Kubernetes schema validation) on both generated and manually prepared files. | Passing syntax/schema checks does not guarantee a successful deployment. |
| B3: Repeat generation | Run the same fixture repeatedly on unchanged inputs and compare normalized bytes/output hashes. | Reproducibility assumes controlled tool version and no nondeterministic source metadata. |
| B4: Existing configuration | Run generation in a workspace with manually edited files; evaluate prevention of unrequested overwrites. | Baseline is preservation of current files, not replacement by regenerated output. |

### 9.3. Evaluation metrics and proposed thresholds

| Metric | Measurement and denominator | Proposed acceptance rule |
| --- | --- | --- |
| M1. Valid output rate | Number of generated target files accepted by their relevant syntax/schema validator ÷ all generated files in a predefined supported-fixture suite. | 100% on mandatory supported fixtures; unsupported constructs rejected clearly. |
| M2. Determinism | Identical output hashes across at least 10 clean repeated executions per fixture, with stable environment. | 100% matching outputs for deterministic targets. |
| M3. Preservation | Manually modified output files unchanged after ordinary regeneration without an explicit overwrite request. | 0 unintended modifications across preservation fixtures. |
| M4. Workspace resolution | Correct scope chosen for nested paths with/without a Git boundary and for unrelated adjacent directories. | 100% of specified boundary cases. |
| M5. Invalid-input diagnostics | Invalid schema, cycles, missing dependencies, invalid ports and unsupported versions rejected with actionable messages. | All high-priority negative fixtures rejected, without partial output. |
| M6. Service catalog | Built-in templates and retrieved less-common templates can be resolved, cached and subsequently used offline where applicable. | All selected catalog/cache test scenarios pass. |
| M7. API/version integrity | Published versions are retrievable by identity; semver ordering, comparison, rollback selection and authorization behave as specified. | All critical API acceptance tests pass. |
| M8. Task completion time | Median time to produce a valid target for equivalent scripted scenarios, compared with manual baseline, for same participants. | Report measured difference and dispersion; do not predeclare superiority. |
| M9. Security tests | Unauthorized publish/edit requests, malformed payloads, secret handling and cache tampering. | No successful critical unauthorized actions in the test suite. |

These are proposed project acceptance targets, not results. The set of mandatory fixtures, concrete tool versions and performance environment must be frozen before measurement; larger representative datasets are preferable to a small hand-picked passing set.

### 9.4. Test matrix and cases

| ID / priority | Test scenario | Expected evidence |
| --- | --- | --- |
| T01 / Must | Generate supported Docker Compose from minimal and multi-service declarative YAML. | Output file; validator result; input fixture. |
| T02 / Must | Generate basic Kubernetes Deployment, GitHub Actions and GitLab CI configurations. | Per-format outputs and structural validator results. |
| T03 / Must | Repeat generation with identical source input and catalog versions. | Hash comparisons from 10 repeated runs. |
| T04 / Must | Run from nested directories in a Git repository and from a non-Git folder. | Recorded selected root and file placement. |
| T05 / Must | Preserve hand-edited existing target and recover cleanly from a failed write. | Before/after checksums and failure-injection logs. |
| T06 / Must | Reject invalid YAML, unresolved services, dependency cycles and invalid version references. | Error codes/messages; no unexpected output. |
| T07 / Should | Import representable Compose elements; flag non-representable constructs without silently discarding them. | Round-trip/semantic comparison and warning list. |
| T08 / Must | Resolve a built-in service; retrieve and locally reuse a less-common cached service. | Catalog metadata, cache paths, offline rerun. |
| T09 / Must | Publish versions, retrieve historical versions, compare metadata/diffs and select rollback version. | API test report; database state; version timeline. |
| T10 / Must | Verify JWT-protected API operations and OAuth 2.0 login integration (when available). | Authorization matrix; authentication flow tests. |
| T11 / Should | Exercise React interface flows with accessibility and invalid-state checks. | Screenshots, task completion notes, issue log. |
| T12 / Should | Evaluate authoring time against a manual baseline with volunteers. | Scenario definitions, anonymized timing records and descriptive statistics. |

### 9.5. Experimental protocol

- Freeze the evaluation scope: supported YAML fields, the three supported versions per selected default service (where available), and exact generator/API releases.
- Build a version-controlled fixture suite covering valid, invalid, boundary and adversarial cases. Include nested dependencies, environment variables, port mappings, volumes and naming collisions.
- Execute CLI tests in an isolated temporary directory or container; never point destructive scenarios at real infrastructure or production credentials.
- Run relevant validators independently of the generator and capture stdout/stderr and exit status. Assess semantics by inspecting declared services, ports and dependencies, not text equality alone.
- For the manual baseline, supply participants with identical requirements and reference materials; randomize scenario order where practicable, and disclose participant count and experience.
- Publish an evaluation summary with passes/failures, unresolved defects, reproducibility notes and links to test artifacts.
### 9.6. Threats to validity and evaluation limitations

Internal validity: participant familiarity with YAML or Rust CLI may bias timing comparisons; practice effects and machine performance can distort runtime results. Construct validity: configuration acceptance by a parser is not equivalent to correct deployment behavior. External validity: the initial library of approximately ten commonly used services and a limited set of basic Kubernetes/CI resources cannot represent the full cloud ecosystem. Reproducibility: upstream images, templates and tools may change, so exact versions and checksums should be retained. A successful demonstration of local generation does not establish the security or reliability of the future hosted publishing service.

### 9.7. Exit criteria and reporting format

Pre-defense readiness requires: reviewed test plan and fixture list; at least a demonstrable CLI-to-output example; documented known limitations; and traceable open defects. Final acceptance requires recorded results against every Must requirement and explicit justification for deviations. Results should be tabulated as Test ID, requirement ID, commit, environment, expected outcome, actual outcome, pass/fail and evidence link. The project team should avoid reporting unexecuted tests as passed.

