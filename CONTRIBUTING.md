# Contributing to UniAuth

First off, thank you for considering contributing to UniAuth! It's people like you that make UniAuth a great tool for handling authentication in Node.js applications.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please be respectful and considerate of others.

## Getting Started

### Prerequisites

- Node.js >= 20
- npm
- Git

## Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/uniauth.git
   cd uniauth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Project Structure

The source code is located in the `src/` directory.

- `src/index.ts`: The main entry point. Exports the `Uniauth` class, `ExtractKey`, and types.
- `src/core/`: Contains the `Uniauth` class and base abstractions like `BaseProviderClass`.
- `src/providers/`: Contains implementation of individual OAuth providers (e.g., Google, GitHub, LinkedIn).
- `src/utils/`: Helper functions for PKCE, sessions, and request making.
- `src/types/`: TypeScript interface and type definitions.

## Adding a New Provider

To add a new OAuth provider:

1. Create a new directory under `src/providers/` (e.g., `src/providers/myprovider/`).
2. Define constants (URLs, default scopes) in `constants.ts` within the new directory.
3. Create the provider class extending `BaseProviderClass` in `myprovider.ts`. Implement `getAuthorizationUrl`, `exchangeCodeForToken`, and `getUserProfile`.
4. Register the new provider in the `Uniauth` class (`src/core/Uniauth.ts`), in the `getProvider` method and mapping.
5. Add the provider's configuration to the `UniauthConfig` interface in `src/types/index.ts`. Use a lowercase key.
6. Make sure it's accessible via `getProvider('myprovider')` and document it.

## Running Tests

We use Vitest for testing.

```bash
npm run test
```

## Linting

Ensure your code passes the linting rules:

```bash
npm run lint
```

## Building

We use `tsup` to bundle the package, generating both ESM and CommonJS outputs.

```bash
npm run build
```

## Pull Request Process

1. Fork the repository and create your branch from `main`.
2. Ensure you follow the commit conventions (e.g., conventional commits).
3. If you've added code that should be tested, add tests.
4. If you've changed APIs, update the documentation.
5. Ensure the test suite passes (`npm run test`).
6. Ensure your code lints (`npm run lint`).
7. Issue that pull request! Please fill out the provided PR template.

## Coding Standards

- Write code in TypeScript.
- Add TSDoc comments to all exported classes, methods, and interfaces.
- Use consistent naming conventions (e.g., lowercase for provider keys in config).
- Follow the existing formatting and structure.

## Versioning

We use [Semantic Versioning](http://semver.org/).

## Reporting Bugs

Please use the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) template when opening an issue.

## Requesting Features

Please use the [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md) template when suggesting a feature.
