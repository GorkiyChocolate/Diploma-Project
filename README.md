# Infrastructure Configuration Management Tool

> **Official diploma topic:** Development of a CLI-Oriented Platform for Infrastructure Configuration Management with Support for Declarative Generation, Versioning, and Distribution.

**Institution:** Astana IT University  
**Stage:** Pre-defense analysis and development (October 2026)  
**Project status:** In development; documents describe proposed behavior unless otherwise verified.

## Overview

A Rust-based CLI tool for converting a unified declarative YAML description into Docker Compose, Kubernetes Deployment, and CI/CD artifacts. The proposed online layer comprises ASP.NET Core, PostgreSQL, and a React interface for authentication, publication, search, and version management. Local generation is designed to work without the server.

## Core design points

- Around ten built-in popular services, with an intended selection of three recent versions each; less common services can be added and stored in a local cache.
- Project working scope resolved from a `.git` boundary, or from the invocation directory when no Git root exists.
- Planned import of existing Compose configuration into the tool's canonical description.
- Protection of manually edited files; no automatic infrastructure deployment as part of the default workflow.
- Server-side version history, comparison, and semantic version identifiers are planned.

## Repository

Project repository: https://github.com/GorkiyChocolate/Diploma-Project

## Team and technologies

| Role | Member | Primary stack |
| --- | --- | --- |
| System programmer | Kuanysh Beibarys | Rust CLI |
| Backend engineer | Piriev Erkhan | C#, ASP.NET Core, PostgreSQL |
| Frontend engineer | Zhumasheva Akerke | React (planned) |

Supervisor: Kashkimbayeva Nurzhamal Meyrkulovna, PhD, Assistant Professor.

## Documentation

| Requirement | File |
| --- | --- |
| 1. Project proposal | [docs/proposal.md](docs/proposal.md) |
| 2. Evidence of relevance | [docs/interviews.md](docs/interviews.md) (pending survey results) |
| 3. Literature review | [docs/literature_review.md](docs/literature_review.md) |
| 4. Existing system comparison | [docs/system_comparison.md](docs/system_comparison.md) |
| 5. Technology comparison | [docs/tech_comparison.md](docs/tech_comparison.md) |
| 6. Requirements specification | [docs/requirements.md](docs/requirements.md) |
| 7. Architecture | [docs/architecture.md](docs/architecture.md) |
| 8. UX / CLI prototype | [docs/prototype_ux.md](docs/prototype_ux.md) |
| 9. Verification plan | [docs/verification_plan.md](docs/verification_plan.md) |
| 10. Project management and risks | [docs/project_management.md](docs/project_management.md) |
| 11. Supervisor feedback | [docs/supervisor_feedback.md](docs/supervisor_feedback.md) (pending feedback) |

See [submission checklist](docs/submission_checklist.md) and [Mermaid diagram sources](diagrams/sources/).

## Evidence and accuracy policy

These documents are **planning and design artifacts** derived from the team's stated intentions and previously drafted report. Proposed commands, metrics, technical decisions, and development milestones are not verified implementations. Before submission, align command syntax and actual status with the repository, replace placeholders with real interview/supervisor evidence, and verify scholarly references and DOI metadata.


# DevInit

**Define infrastructure once. Generate configuration for multiple platforms.**

DevInit is a CLI-oriented infrastructure configuration management project. Its Rust command-line tool reads a declarative `compile.yaml`, validates it, resolves supported service recipes and reusable presets, and generates configuration files for Docker Compose, Kubernetes, and CI/CD pipelines.

The project also includes a developing web platform for managing and distributing configurations. The CLI is designed to work locally without requiring the web backend for standard built-in recipes and generation.

> **Status:** Active development — CLI v0.0.2 pre-release. The source-based workflow below describes the current development version and should be merged into `main` together with the corresponding CLI implementation. Windows installers and packaged releases are not published yet.

## Why DevInit?

Infrastructure configuration often involves maintaining several formats separately: Docker Compose for local services, Kubernetes manifests for orchestration, and CI/CD workflows for automation. DevInit provides one declarative input and produces supported target-specific configuration files, with validation and file-conflict checks before writing.

DevInit **generates configuration**; it does not execute deployments, provision cloud infrastructure, or build Docker images automatically.

## Current CLI capabilities

- **Declarative input:** configure services, Kubernetes resources, and CI/CD pipelines in `compile.yaml`.
- **Docker Compose:** generate `docker-compose.yaml` from custom services and supported service recipes.
- **Kubernetes:** generate Deployment/Service templates or supply raw Kubernetes manifests.
- **CI/CD:** generate workflows for GitHub Actions and GitLab CI.
- **Service recipes:** use built-in service definitions and locally cached recipes, including version selection where supported.
- **Reusable presets:** define global Compose, Kubernetes, and CI/CD presets and override them per project.
- **Validation:** check service dependencies, selected port mappings, CI/CD dependencies, Kubernetes structures, and output-file conflicts.
- **Safe generation:** inspect proposed outputs using `check` and `compile --dry-run`; existing files are not overwritten unless `--force` is explicitly used.

## Quick start (build from source)

**Prerequisites:** Rust toolchain with Cargo and support for Rust edition 2024. Docker and Kubernetes are *not* required merely to generate configuration files.

```bash
git clone https://github.com/GorkiyChocolate/Diploma-Project.git
cd Diploma-Project/cli
cargo build --release
```

The current Cargo package produces the executable `devinit_cli_2` (`devinit_cli_2.exe` on Windows). The public `devinit` executable name and installers are planned for the release packaging stage.

Create a `compile.yaml` in the directory where you want the generated files to appear:

```yaml
services:
  - name: backend
    image: backend:latest
    ports:
      - "8080:8080"

  - name: postgresql
    version: "17"
```

Then run the development binary from that project directory, or make it available on your `PATH`:

```bash
# Show CLI options
/path/to/devinit_cli_2 --help

# Validate without writing files
/path/to/devinit_cli_2 check

# Preview the generation plan
/path/to/devinit_cli_2 compile --dry-run

# Generate configuration files
/path/to/devinit_cli_2 compile
```

The configuration above generates `docker-compose.yaml`. Output files are created relative to the directory in which you invoke the CLI.

> Replace `/path/to/devinit_cli_2` with the executable produced under `cli/target/release/`. If your checked-out `main` branch does not yet support `check` or `--dry-run`, use the updated development revision; those commands must be merged before documenting them as released behavior.

## Example: Docker Compose, Kubernetes, and CI/CD

A single `compile.yaml` can describe multiple generation targets:

```yaml
services:
  - name: backend
    image: backend:latest
    ports: ["8080:8080"]

k8s:
  backend:
    template: deployment
    name: backend
    image: backend:latest
    replicas: 2
    port: 8080

  backend-service:
    template: service
    name: backend
    target: backend
    port: 80
    targetPort: 8080

cicd:
  provider: github
  triggers:
    - type: push
      branches: [main]
  jobs:
    - name: test
      runner: ubuntu-latest
      steps:
        - name: Run tests
          action: run
          command: cargo test
```

Depending on the selected sections, DevInit can generate:

```text
docker-compose.yaml
k8s/backend.yaml
k8s/backend-service.yaml
.github/workflows/devinit.yml
```

For GitLab CI, the generated pipeline is `.gitlab-ci.yml`. Generated YAML should still be reviewed and validated with the relevant platform tools before deployment.

## CLI command reference

| Command | Description |
| --- | --- |
| `devinit check` | Validate input and construct the generation plan without writing files. |
| `devinit compile --dry-run` | Preview files to create and report conflicts without writing files. |
| `devinit compile` | Generate supported configuration files, refusing to overwrite existing files. |
| `devinit compile --force` | Explicitly allow replacing existing generated files, subject to path safety checks. |
| `devinit add <service>` | Obtain a service recipe from built-in, local cache, or configured remote sources. |
| `devinit --help` | Show available commands and flags. |

The table describes the updated development CLI. Confirm supported flags using the binary's `--help` output. Other experimental commands may exist, but are not part of this stable getting-started workflow.

## Global presets and offline usage

DevInit supports global presets for frequently used service groups, Kubernetes manifests, and CI/CD jobs. On Linux, the development CLI reads presets from `~/.config/devinit/devinit.yaml` (or `$XDG_CONFIG_HOME/devinit/devinit.yaml`). Platform-specific Windows configuration paths are still being finalized.

Built-in service recipes and previously cached recipes can be resolved without the web backend. Unknown remote recipes require a reachable backend. The CLI's generation and validation flow is separate from the web application.

## Project structure

```text
Diploma-Project/
├── cli/                 # Rust CLI: parsing, registry, validation, generation
├── backend/             # ASP.NET Core / C# backend (under development)
├── frontend/            # React frontend (under development)
├── docs/                # Diploma and technical documentation
├── diagrams/sources/    # Editable architecture/diagram sources
└── README.md
```

The CLI's core workflow is:

`compile.yaml` → parse and resolve → validate → intermediate representation → generation plan → conflict checks → write generated files.

## Safety and current limitations

DevInit checks the configuration rules it supports, but is not a complete Docker Compose or Kubernetes schema validator. The `check` command does not contact a Kubernetes cluster or verify Docker runtime behavior.

Generation is local and does not run `docker build`, `docker compose up`, `kubectl apply`, or cloud deployments. The current Dockerfile discovery helper can find Dockerfile-like filenames, but **does not automatically create Docker Compose `build` entries**. Multi-file generation is not guaranteed to be an atomic transaction.

## Development and testing

From `cli/`:

```bash
cargo fmt --check
cargo check
cargo test
cargo clippy --all-targets -- -D warnings
cargo build --release
```

The local v0.0.2 refactoring baseline has **137 passing automated tests** (121 unit and 16 integration tests). This is a development checkpoint, not a claim about a published release build.

## Documentation

The repository's `docs/` directory contains the diploma proposal, requirements, architecture, verification plan, comparisons, and supporting material. Additional user and AI-oriented CLI documentation is being prepared: `USER_GUIDE.md`, `CONFIG_REFERENCE.md`, and `AI_INSTRUCTIONS.md`. Add these documents to the repository before linking them as published references.

## Roadmap

- Cross-platform release packages for Linux and Windows, including a Windows installer.
- Improved configuration reference and machine-readable schema for `compile.yaml`.
- Reliable Dockerfile-to-service mapping and optional Compose `build` generation.
- Expanded configuration distribution and version management through the web platform.

Roadmap items are plans, not shipping features.

## Academic project and team

DevInit is developed as a diploma project at **Astana IT University**.

**Diploma topic:** *Design and Development of a CLI-Oriented Platform for Infrastructure Configuration Management with Declarative Generation, Versioning, and Distribution Support.*

| Responsibility | Team member | Main technologies |
| --- | --- | --- |
| System programming / CLI | Kuanysh Beibarys | Rust |
| Backend | Piriev Erkhan | C#, ASP.NET Core, PostgreSQL |
| Frontend | Zhumasheva Akerke | React, TypeScript |

**Supervisor:** Kashkimbayeva Nurzhamal Meyrkulovna.

## Feedback and contributions

Bug reports, reproducible configuration examples, and suggestions are welcome through the repository's GitHub Issues. Until a release is published, use source builds and review generated infrastructure files before using them in production environments.
