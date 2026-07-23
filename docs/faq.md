# Frequently Asked Questions

### 1. Why am I getting `Unknown provider`?
This error is thrown by `getProvider()` if the provider name you passed is either not included in your `UniauthConfig` during initialization, or it is misspelled. Note that lookup is case-insensitive, but the provider *must* be initialized.

### 2. Why am I getting `Session expired or invalid key`?
For providers utilizing PKCE (Google, GitHub), UniAuth stores a code verifier in memory with a 60-second Time-To-Live (TTL). If the user takes longer than 60 seconds to authenticate and return to your callback, the key expires.

### 3. Why am I getting `invalid_redirect_uri`?
The `redirecturl` provided in your `AuthParams` config does not exactly match the callback URI registered in your OAuth provider's developer console (Google Cloud Console, GitHub Developer Settings, etc.).

### 4. How do refresh tokens work?
Currently, only `LinkedinProvider` supports the `refreshAccessToken()` method. You must pass the stored refresh token to this method to receive a new set of tokens.

### 5. Can I use custom providers?
Yes, you can extend the `BaseProviderClass` to create your own providers. However, currently, custom providers cannot be directly injected into the main `Uniauth` instance map, but you can use them standalone.

### 6. Can I store tokens myself?
Yes! UniAuth purely handles the OAuth handshake. Once `exchangeCodeForToken` resolves, it returns the tokens to you. It is your responsibility to securely store them in a database, session, or cookie.

### 7. Can I use this with Next.js?
Yes, you can use it inside Next.js API Routes (`app/api/...` or `pages/api/...`). UniAuth is a server-side library and cannot be used in client components.

### 8. Does UniAuth handle sessions?
No. UniAuth handles the OAuth flow. Session management (keeping a user logged in across page reloads) is up to the developer using tools like `express-session`, JWTs, or Next.js cookies.

### 9. Is UniAuth framework-agnostic?
Yes, it works with any Node.js framework (Express, Fastify, NestJS, Next.js, Hono, etc.) as long as it runs on a Node.js runtime (v20+).

### 10. Why does Google need `ExtractKey` but LinkedIn doesn't?
Google and GitHub implementations in UniAuth utilize PKCE (Proof Key for Code Exchange) for enhanced security, which requires extracting and temporarily storing a `code_verifier` key. LinkedIn's current implementation uses standard state-based OAuth 2.0 without PKCE in this library, so no key extraction is required.

### 11. What happens if the PKCE key expires?
If the 60-second TTL expires before the user returns to the callback, calling `exchangeCodeForToken(code, key)` will throw a `"Session expired or invalid key"` error.

### 12. Can I use this in the browser?
No, UniAuth requires the Node.js `crypto` module for generating PKCE challenges and handles sensitive `clientSecret` keys. It must only be run on the backend.
