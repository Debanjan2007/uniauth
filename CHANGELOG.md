# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.0] - 2026-07-23
### Added
- GitHub OAuth provider with PKCE support
- Shared helper modules for auth URL generation, token exchange, and profile fetching
- Refresh token support for LinkedIn provider

## [0.4.0]
### Added
- Google OAuth provider with PKCE flow
- PKCE utility helpers (code verifier, code challenge generation)
- In-memory session management for PKCE state
- `ExtractKey` utility for parsing PKCE authorization URLs

## [0.3.0]
### Added
- LinkedIn OAuth provider
- Authorization URL generation
- Access token exchange flow
- User profile fetching

## [0.2.0]
### Added
- Base provider architecture (`BaseProviderClass`)
- `Uniauth` client class with provider registry
- Unified configuration system (`UniauthConfig`)
- Core type definitions (`TokenResponse`, `UserProfile`, `AuthParams`)

## [0.1.0]
### Added
- Initial project setup
- ESM and CommonJS dual build support via tsup
- CI/CD workflows (GitHub Actions)
- TypeScript configuration
- MIT License
