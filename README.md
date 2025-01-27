# @galaxyops :milky_way:

@galaxyops: Empowering Efficient Project Management and Accelerated
Domain-Driven DevOps on AWS.

[![CI](https://github.com/hxtree/galaxyops/actions/workflows/on-merge.yml/badge.svg)](https://github.com/hxtree/galaxyops/actions/workflows/on-merge.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8024531285164025aef972fcb059ea74)](https://app.codacy.com/gh/hxtree/galaxyops/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/8024531285164025aef972fcb059ea74)](https://app.codacy.com/gh/hxtree/galaxyops/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)

## Overview

Running multiple applications on AWS without a clear architectural pattern can
lead to chaos and uncertainty. @galaxyops provides a cloud architecture that
emphasizes modern DevOps best practices on AWS. It establishes a solid
foundation for enterprise software, ensuring scalability and maintainability
across projects.

## Features

- **Simple Setup**: Turn-key deployment on bare metal systems, specially
  designed for compatibility with MacOS silicon environments and without a
  Docker dependency.

- **Monorepo Architecture**: Centralizes development, streamlining code sharing,
  versioning, and dependency management with tools like Nx and PNPM.

- **CI/CD Pipeline**: Autonomous pipeline for deploying auditable artifacts to
  AWS using IaC, ensuring consistency and scalability.

- **Universal Language**: Leveraging TypeScript for microservices, enhancing
  performance, readability, and maintenance. Other languages can be used for
  specific tasks, such as Python for data science.

- **Event-Driven Microservices**: Fault-tolerant communication via queues, with
  event data archived in a data lake for analytics.

- **Schema Contracts**: Automatic mocking and validation for seamless
  inter-service communication and data integrity.

- **Ephemeral Environments**: Provisioning of TLS certificates and email
  services using AWS Org Formation.

- **User Authentication**: Integration of Cognito for user registration and
  authentication.

- **SPA Frontend with BFF**: Single-page application with frontend hosted on S3
  and deployed via CloudFront, with middleware for backend operations.

## Getting Started

Install the package manager, jq, build all packages, and hydrate dotenv files:

```bash
# Enable PNPM package manager
corepack enable pnpm

# Install jq for lambda layer builder on MacOS
brew install jq

# Install all dependencies
pnpm install

# Hydrate environment files
pnpm nx run galaxyops:hydrate
```

Run any script using Nx by specifying the package name followed by the script
name, e.g.

```bash
pnpm nx run admin-client:dev
```

### Common Commands

```bash
pnpm update                     # Update workspace files.
pnpm add @a/b                   # Add a new package to the app.
pnpm up -r --workspace --interactive # Make package versions consistent.
pnpm nx run-many -t [command] --all # Run a command in bulk.
pnpm nx run package:[command]    # Run a command in the current package.
pnpm nx run package:build        # Build projects.
pnpm nx run package:watch        # Watch for changes and compile.
pnpm nx run package:lint         # Perform ESLint static analysis.
pnpm nx run package:test         # Test a package.
pnpm nx run package:test:cov     # Run tests with coverage.
pnpm nx run package:docs         # Generate documentation from code.
pnpm nx run package:cdk:bootstrap # Bootstrap the CDK project.
pnpm nx run package:cdk:synth    # Show synthesized CloudFormation template.
pnpm nx run package:cdk:diff     # Compare deployed stack with current state.
pnpm nx run package:cdk:deploy   # Deploy apps using AWS CDK.
pnpm nx run package:cdk deploy --hotswap # Speed up dev deployment.
pnpm nx run package:cdk watch    # hot swap on changes.
pnpm nx run package:cdk doctor    # Check CDK project for issues.
pnpm nx release                   # Create a release for all package changes.
pnpm nx dep-graph                 # Visualize dependencies.
```

### Target Architecture Diagram

![Flow Chart](docs/flow-chart.drawio.svg)

### AWS Multi-Account Architecture Initial Setup

These steps are required once by the platform team to initialize the IaaS.

1. Setup [AWS Org Formation](/platform/aws-org-formation/README.md).

2. Set an environmental variable in the shell configuration file to establish a
   default AWS CLI profile for seamless authentication and resource access.

   ```bash
   echo 'export AWS_PROFILE=DeveloperSandbox' >> ~/.zshrc
   ```

3. Login via SSO and bootstrap deployments. Deploy platform, services, and then
   clients in that order.

   ```bash
    aws configure sso
    pnpm nx run galaxyops:cdk:bootstrap:sandbox
    pnpm nx run galaxyops:cdk:deploy:sandbox
   ```

4. Login via SSO to tools account and then deploy tools.

   ```bash
   pnpm nx run galaxyops:cdk:bootstrap:tools-account
   pnpm nx run galaxyops:cdk:deploy:tools-account
   ```

## Documentation

Comprehensive documentation is essential for understanding and maintaining this
project. Each project and folder structure should feature a README.md files
containing documentation following RFC 2119 standards.

<details>
  <summary>Third Party Documentation</summary>

- [NX Package Based Repo](https://nx.dev/getting-started/tutorials/package-based-repo-tutorial)
- [AWS CLI](https://docs.aws.amazon.com/cdk/v2/guide/cli.html)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Jest](https://jestjs.io/)
- [Automatically Version with Conventional Commits](https://nx.dev/recipes/nx-release/automatically-version-with-conventional-commits)
</details>

## Contributing

Pull requests and bug reports are welcome on GitHub at
<https://github.com/hxtree/galaxyops>. Please follow the
[code of conduct](docs/CODE_OF_CONDUCT.md) when contributing.

### Acknowledgements

<a href="https://github.com/hxtree/galaxyops/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=hxtree/galaxyops" />
</a>

## License

This project is mostly licensed under the MIT License. Detailed license
information, including exceptions for packages that are not MIT licensed, can be
found in the [LICENSE.md](./LICENSE.md) file. All packages published under the
[@galaxyops](https://www.npmjs.com/search?q=%40galaxyops) namespace on NPM are
also MIT licensed unless otherwise specified.
