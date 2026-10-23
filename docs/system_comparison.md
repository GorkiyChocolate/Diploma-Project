# 4. Existing System Comparison

### 4.1. Method and compared systems

Five established systems were selected because they occupy adjacent but distinct roles: Docker Compose, Helm, Kustomize, Terraform and Pulumi. They are not interchangeable competitors. The comparison uses eight common criteria based on official product documentation, and “not primary” means the capability is outside the central intended use—not that extensions or integrations cannot provide it.

| System | Primary input | Core scope | Deploy/run | Reuse/versioning | Targets | Single input → Compose/K8s/CI | Offline authoring |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Docker Compose | Compose YAML | Docker application/services | Yes, via Compose CLI | Compose files / images | Docker-specific | No single schema for Kubernetes + CI | Strong within Docker |
| Helm | Charts / templates / values | Kubernetes applications | Yes, via cluster operations | Chart repositories; versions | Kubernetes-focused | No | Strong within Kubernetes |
| Kustomize | Base manifests + overlays | Kubernetes manifest customization | Via kubectl workflows | Git-based manifest reuse | Kubernetes-focused | No | Strong within Kubernetes |
| Terraform | HCL and provider schemas | Provisioning infrastructure resources | Yes: plan/apply | Module registry + state workflow | Broad via providers | Not its primary workflow | Yes, provider-dependent |
| Pulumi | General-purpose languages / YAML | Provisioning infrastructure resources | Yes: preview/up | Packages, templates, state | Broad via providers | Not its primary workflow | Yes, provider-dependent |
| Proposed tool (planned) | One constrained YAML model | File generation and recipe exchange | No automatic execution in initial scope | Built-in and cached recipes; web catalog | Compose, K8s Deployment, GitHub/GitLab CI | Target feature, constrained semantics | Target via offline CLI |

### 4.2. Evidence-based interpretation

Docker Compose directly defines and operates multi-container applications; its existing tooling already delivers strong developer ergonomics inside that ecosystem. Helm packages versioned Kubernetes manifests and supports installation and rollback, making it a particularly close comparator for reusable recipe distribution. Kustomize specializes in customization of Kubernetes YAML without a separate template syntax. Terraform and Pulumi provide broader provisioning, resource state and provider ecosystems that the proposed tool does not replicate. Therefore, the project’s differentiator is a constrained, offline-capable, multi-target file-generation workflow with optionally distributed recipes—not broader provisioning power or a claim of superior maturity.

### 4.3. Evaluation criteria for empirical comparison

C1. Input authoring time for a fixed multi-service scenario (minutes; same participant cohort).

C2. Number of manual edits required to produce valid targets (count).

C3. Percentage of outputs accepted by native schema/config validators.

C4. Unsupported-feature detection rate, measured over deliberately incompatible examples.

C5. Determinism: byte-identical outputs on repeated runs with identical inputs.

C6. Availability of essential commands without network connectivity.

C7. Correctness of service dependency and version mapping in fixture tests.

C8. Safe handling of pre-existing files and secret-bearing input.

Comparison evidence: Docker Compose documentation, Helm documentation, Kubernetes Kustomize documentation, HashiCorp Terraform documentation, and Pulumi architecture documentation, listed as [T1–T5].

