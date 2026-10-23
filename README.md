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
