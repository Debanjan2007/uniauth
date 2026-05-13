# Uniauth 🔐

> Unified OAuth authentication toolkit for modern JavaScript applications.

<p align="center">
  <img src="./assets/logo.png" width="120" alt="Uniauth Logo" />
</p>

<p align="center">
  OAuth made less painful.
</p>

---

## ✨ What is Uniauth?

`Uniauth` is a TypeScript-first OAuth wrapper library for social login providers.
It is built to provide a common provider interface so you can add more OAuth providers later with minimal integration work.

Currently implemented:

- LinkedIn provider (implemented, not tested yet)

Planned providers:

- Google
- GitHub
- Twitter/X
- Facebook
- Discord
- Spotify
- and more

---

## 🚧 Current Status

This project is in early development.

- LinkedIn OAuth flow is implemented in code
- Full testing is not completed yet
- Additional providers are still pending

Use this library as a starting point and expect the API to evolve.

---

## 📦 Installation

```bash
npm install uniauth
```

or with pnpm:

```bash
pnpm add uniauth
```

---

## 🚀 Usage

```ts
import Uniauth from 'uniauth'

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

- No tests are included yet
- LinkedIn provider is implemented but still needs real-world testing
- More providers can be added by extending `src/providers/core/Uniauth.ts` and creating new provider classes

---

## 🤝 Contributing

Contributions are welcome.

If you want to add a provider, create a new provider class under `src/providers`, add its types, and register it in `src/providers/core/Uniauth.ts`.

---

## 📄 License

MIT
