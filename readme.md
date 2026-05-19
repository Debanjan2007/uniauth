<p align="center">
  <img src="./assets/banner.jpeg" alt="Uniauth Banner" />
</p>

# Uniauth 🔐

> Unified OAuth authentication toolkit for modern JavaScript applications.

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
  <img src="https://img.shields.io/npm/v/uniauth?style=flat-square&logo=npm" />
  <img src="https://img.shields.io/npm/dm/uniauth?style=flat-square&logo=npm" />
  <img src="https://img.shields.io/github/license/Debanjan2007/uniauth?style=flat-square" />
  <img src="https://img.shields.io/github/stars/Debanjan2007/uniauth?style=flat-square&logo=github" />
  <img src="https://img.shields.io/github/issues/Debanjan2007/uniauth?style=flat-square&logo=github" />
  <img src="https://github.com/Debanjan2007/uniauth/actions/workflows/ci.yaml/badge.svg" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/providers-linkedin-blue?style=flat-square&logo=inkedin" />
  <img src="https://img.shields.io/badge/providers-google-green?style=flat-square&logo=google" />
  <img src="https://img.shields.io/badge/github-planned-181717?style=flat-square&logo=github" />
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

## 🚧 Current Status

This project is currently in early development.

### Implemented

- LinkedIn OAuth provider
- Google OAuth provider
- Authorization URL generation
- Access token exchange flow
- User profile fetching
- PKCE utility helpers
- ESM + CommonJS builds

### Planned

- GitHub OAuth
- Discord OAuth
- Spotify OAuth
- Twitter/X OAuth
- Facebook OAuth

Expect API changes while the library evolves.

---
## Requirements

Before using Uniauth, make sure your environment meets the following requirements:

- Node.js >= 20
- npm, pnpm, or yarn

You can check your current Node.js version with:

```bash
node -v
``` 
---

## 📦 Installation

### npm

```bash
npm install @deba_1307/uniauth
```

or with pnpm:

```bash
pnpm add @deba_1307/uniauth
```

---

## 🚀 Usage

### Linkedin Example

```ts
import Uniauth from '@deba_1307/uniauth'

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

---

## 🚀 Google OAuth + PKCE Flow

Google provider uses the PKCE OAuth flow.

The overall provider usage is identical to other providers, but there is one additional step.

You must extract and store the generated PKCE key from the authorization URL using the `Extractkey()` helper.

That extracted key is later required during token exchange.

### Google Example

```ts
import Uniauth from '@deba_1307/uniauth'
import { Extractkey } from '@deba_1307/uniauth'

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

const url = google.getAuthorizationUrl() // ⚠️ Avoid using this url it might through a invalid redirect url issue 

/*
  Extract the generated PKCE key.
  
  Store this key securely because it will be
  required later during token exchange.
*/

const { key, AuthUrl } = Extractkey(url)

// redirect user to AuthUrl for authorization ✅

// after OAuth callback:
const token = await google.exchangeCodeForToken(code, key)

// fetch user profile
const profile = await google.getUserProfile(token.accessToken)
```

---

## 🔧 Provider Configuration

### LinkedIn

The `Linkedin` provider accepts the following config:

- `clientId`: LinkedIn app client ID
- `clientSecret`: LinkedIn app client secret
- `redirecturl`: OAuth callback redirect URI
- `scope`: array of LinkedIn OAuth scopes

Example:

```ts
{
  clientId: 'abc123',
  clientSecret: 'secret',
  redirecturl: 'https://yourapp.com/auth/linkedin/callback',
  scope: ['r_liteprofile', 'r_emailaddress']
}
```
---

### Google

```ts
{
  clientId: 'google-client-id',
  clientSecret: 'google-secret',
  redirecturl: 'https://yourapp.com/auth/google/callback',
  scope: ['openid', 'email', 'profile']
}
```
---

## 🧠 API Notes

- `Uniauth` currently exposes a default class from `src/providers/core/Uniauth`
- `getProvider(providerName)` returns the provider instance for the requested provider name
- `LinkedinProvider` includes:
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

## 🛠️ Notes

- Automated tests and CI validation are now included
- LinkedIn provider is implemented but still needs real-world testing
- More providers can be added by extending `src/providers/core/Uniauth.ts` and creating new provider classes

---

## 🤝 Contributing

Contributions are welcome.

If you want to add a provider, create a new provider class under `src/providers`, add its types, and register it in `src/providers/core/Uniauth.ts`.

---

## 📄 License

MIT
