<p align="center">
  <img src="./assets/banner.jpeg" alt="Uniauth Banner" />
</p>

# Uniauth 🔐

> Unified OAuth authentication toolkit for modern JavaScript applications.

OAuth providers should not require different code paths.

<p align="center">
  <img src="./assets/logo.jpeg" width="150" alt="Uniauth Logo" />
</p>

<p align="center">
  OAuth made less painful.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/typescript-first-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/oauth-2.0-7A3EFF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/pkce-supported-111827?style=for-the-badge" />
  <img src="https://img.shields.io/badge/node.js-supported-339933?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@deba_1307/uniauth?style=flat-square&logo=npm" />
  <img src="https://img.shields.io/npm/dm/@deba_1307/uniauth?style=flat-square&logo=npm" />
  <img src="https://img.shields.io/github/license/Debanjan2007/uniauth?style=flat-square" />
  <img src="https://img.shields.io/github/stars/Debanjan2007/uniauth?style=flat-square&logo=github" />
  <img src="https://img.shields.io/github/issues/Debanjan2007/uniauth?style=flat-square&logo=github" />
  <img src="https://github.com/Debanjan2007/uniauth/actions/workflows/ci.yaml/badge.svg" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/providers-linkedin-blue?style=flat-square&logo=linkedin" />
  <img src="https://img.shields.io/badge/providers-google-green?style=flat-square&logo=google" />
  <img src="https://img.shields.io/badge/providers-github-181717?style=flat-square&logo=github" />
  <img src="https://img.shields.io/badge/discord-planned-5865F2?style=flat-square&logo=discord&logoColor=white" />
</p>

---

## ✨ What is Uniauth?

`Uniauth` is a TypeScript-first OAuth wrapper library for social login providers.

It provides a unified provider interface so you can integrate multiple OAuth providers without rewriting authentication logic for every platform.

The goal is simple:

- unified OAuth flows
- reusable provider architecture
- PKCE-ready utilities
- scalable provider expansion
- developer-friendly API surface

---

## Why Uniauth?

Most OAuth libraries force developers into:

- provider-specific logic
- inconsistent APIs
- unnecessary boilerplate
- framework lock-in

Uniauth provides:

- a unified provider interface
- consistent OAuth flow handling
- TypeScript-first developer experience
- lightweight and flexible architecture

Write authentication logic once and switch providers easily.

---

## ✨ Features

- 🔐 Unified OAuth API
- ⚡ Lightweight architecture
- 🧠 TypeScript-first developer experience
- 🔄 Consistent provider flow handling
- 🛠 Framework agnostic
- 📦 Easy provider integration
- 🚀 Minimal setup
- 🔑 PKCE-ready utilities
- 🌱 Scalable provider system

---

## ⚖️ Comparison

| Feature | Uniauth | Passport.js |
|---|---|---|
| Unified provider API | ✅ | ❌ |
| TypeScript-first | ✅ | ⚠️ Partial |
| Lightweight setup | ✅ | ❌ |
| Consistent flow handling | ✅ | ❌ |
| Minimal boilerplate | ✅ | ❌ |
| Framework agnostic | ✅ | ⚠️ |
| PKCE utilities included | ✅ | ❌ |

---

## 📦 Installation

> Package currently published under the `@deba_1307` scope.

### npm

```bash
npm install @deba_1307/uniauth
```

### pnpm

```bash
pnpm add @deba_1307/uniauth
```

### yarn

```bash
yarn add @deba_1307/uniauth
```

---

## 📋 Requirements

Before using Uniauth, make sure your environment meets the following requirements:

- Node.js >= 20
- npm, pnpm, or yarn

Check your current Node.js version:

```bash
node -v
```

---

## 🚀 Quick Start

```ts
import Uniauth from '@deba_1307/uniauth'
// or import { Uniauth } from '@deba_1307/uniauth' or const Uniauth = require(@deba_1307/uniauth)

const auth = new Uniauth({
  providers: {
    Google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirecturl: 'http://localhost:3000/auth/google/callback',
      scope: ['openid', 'email', 'profile']
    }
  }
})

const google = auth.getProvider('Google')

const url = google.getAuthorizationUrl()
```

---

## 🚀 Google OAuth + PKCE Flow

Google provider uses the PKCE OAuth flow.

The overall provider usage remains identical to other providers, but there is one additional step.

You must extract and store the generated PKCE key and the Authurl from the authorization URL using the `Extractkey()` helper.

That extracted key is later required during token exchange.

### Google Example

```ts
import Uniauth from '@deba_1307/uniauth'
import { Extractkey } from '@deba_1307/uniauth'
// or import { Uniauth } from '@deba_1307/uniauth' or const Uniauth = require(@deba_1307/uniauth)

const auth = new Uniauth({
  providers: {
    Google: {
      clientId: '<YOUR_GOOGLE_CLIENT_ID>',
      clientSecret: '<YOUR_GOOGLE_CLIENT_SECRET>',
      redirecturl: 'https://yourapp.com/auth/google/callback',
      scope: ['openid', 'email', 'profile']
    }
  }
})

const google = auth.getProvider('Google')

/* ⚠️Don't use ❌ this 'url' as you authorization url

it might return a invalid redirect_uri issue

⚠️ */

const url = google.getAuthorizationUrl()

/*
  Extract the generated PKCE key.

  Store this key securely because it will be
  required later during token exchange.
*/

const { key, AuthUrl } = Extractkey(url)

// redirect user to AuthUrl

// after OAuth callback:
const token = await google.exchangeCodeForToken(code, key)

// fetch user profile
const profile = await google.getUserProfile(token.accessToken)
```

---

## 🚀 LinkedIn OAuth Example

```ts
import Uniauth from '@deba_1307/uniauth'
// or import { Uniauth } from '@deba_1307/uniauth' or const Uniauth = require(@deba_1307/uniauth)

const auth = new Uniauth({
  providers: {
    Linkedin: {
      clientId: '<YOUR_LINKEDIN_CLIENT_ID>',
      clientSecret: '<YOUR_LINKEDIN_CLIENT_SECRET>',
      redirecturl: 'https://yourapp.com/auth/linkedin/callback',
      scope: ['r_liteprofile', 'r_emailaddress']
    }
  }
})

const linkedin = auth.getProvider('Linkedin')

const authorizationUrl = linkedin.getAuthorizationUrl()

// redirect user to authorizationUrl

// after callback, exchange the authorization code:
const token = await linkedin.exchangeCodeForToken(code)

// fetch the LinkedIn user profile:
const profile = await linkedin.getUserProfile(token.accessToken)
```

---

## 🔧 Provider Configuration

Every OAuth provider accepts the following configuration:

- `clientId` — provider application client ID
- `clientSecret` — provider application client secret
- `redirecturl` — OAuth callback redirect URI
- `scope` — array of OAuth scopes

Example:

```ts
{
  clientId: 'abc123',
  clientSecret: 'secret',
  redirecturl: 'https://yourapp.com/auth/provider/callback',
  scope: ['openid', 'profile']
}
```

---

## 🧠 Authentication Architecture

```text
Your Application
       ↓
    Uniauth
       ↓
OAuth Providers
(Google, LinkedIn, GitHub...)
```

Uniauth abstracts provider-specific OAuth logic into a unified developer-friendly API.

---

## 🚧 Current Status

Uniauth is under active development and new providers/features are being added continuously.

### Implemented

- LinkedIn OAuth provider
- Google OAuth provider
- GitHub OAuth
- Authorization URL generation
- Access token exchange flow
- User profile fetching
- PKCE utility helpers
- ESM + CommonJS builds
- CI workflow integration

### Planned

- Discord OAuth
- Spotify OAuth
- Twitter/X OAuth
- Facebook OAuth
- Session helpers
- Adapter ecosystem

---

## 🗺️ Roadmap

- [x] LinkedIn OAuth
- [x] Google OAuth
- [x] PKCE utilities
- [x] ESM + CommonJS support
- [x] GitHub OAuth
- [ ] Discord OAuth
- [ ] Spotify OAuth
- [ ] Session utilities
- [ ] Provider adapters
- [ ] Framework integrations
- [ ] Better developer tooling

---

## 🧠 API Notes

- `Uniauth` currently exposes a default class
- `getProvider(providerName)` returns the provider instance
- Providers expose:
  - `getAuthorizationUrl()`
  - `exchangeCodeForToken(code)`
  - `getUserProfile(accessToken)`

---

## 📁 Library Structure

- `src/index.ts` — library entrypoint
- `src/providers/core/Uniauth.ts` — provider registry and configuration
- `src/providers/linkedin/LinkedinProvider.ts` — LinkedIn OAuth implementation
- `src/providers/linkedin/Linkedin.types.ts` — LinkedIn provider types
- `src/providers/core/types/TokenResponse.types.ts` — token response shape
- `src/providers/core/types/UserProfile.types.ts` — user profile shape
- `src/pkce/*` — PKCE helper utilities

---

## 🛠 Notes

- Automated tests and CI validation are included
- The provider system is designed for scalable expansion
- Additional providers can be added by extending the provider core architecture

---

## 🤝 Contributing

Contributions are welcome.

If you want to add a provider:

1. Create a provider class under `src/providers`
2. Add the required provider types
3. Register the provider inside `src/providers/core/Uniauth.ts`

Issues, discussions, and pull requests are always appreciated.

---

## 📄 License

MIT
