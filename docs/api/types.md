# Types Reference

UniAuth exports several TypeScript interfaces and types for strong typing of configuration and responses.

## UniauthConfig

The main configuration object for initializing the `Uniauth` class.

```typescript
interface UniauthConfig {
  providers: {
    linkedin?: AuthParams;
    google?: AuthParams;
    github?: AuthParams;
  }
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `providers` | `Object` | Object containing provider-specific configurations. Keys are lowercase provider names. |

## AuthParams

Parameters required to configure a specific OAuth provider.

```typescript
interface AuthParams {
  clientId: string;
  redirecturl: httpurl;
  clientSecret: string;
  scope: string[];
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `clientId` | `string` | The Client ID provided by the OAuth provider. |
| `clientSecret` | `string` | The Client Secret provided by the OAuth provider. |
| `redirecturl` | `httpurl` | The callback URL registered with the OAuth provider. Must be http or https. |
| `scope` | `string[]` | Array of OAuth scopes to request from the provider. |

## httpurl

A template literal type ensuring the redirect URL is a valid HTTP/HTTPS URL.

```typescript
type httpurl = `http://${string}` | `https://${string}`;
```

## TokenResponse

The response returned after successfully exchanging an authorization code for tokens.

```typescript
interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  scope?: string;
  idToken?: string;
  raw: unknown;
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `accessToken` | `string` | The access token to be used for API requests. |
| `refreshToken` | `string?` | Optional refresh token for obtaining new access tokens. |
| `tokenType` | `string?` | The type of token returned (e.g., "Bearer"). |
| `expiresIn` | `number?` | The lifetime in seconds of the access token. |
| `scope` | `string?` | The scopes granted by the user. |
| `idToken` | `string?` | OIDC ID Token (typically provided by Google). |
| `raw` | `unknown` | The raw unparsed response from the provider's token endpoint. |

## UserProfile

Standardized user profile information extracted from the provider.

```typescript
interface UserProfile {
  email?: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  provider: string;
  raw?: unknown;
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `email` | `string?` | The user's primary email address. |
| `username` | `string?` | The user's username/handle. |
| `displayName` | `string?` | The user's full name or display name. |
| `avatarUrl` | `string?` | URL to the user's profile picture. |
| `provider` | `string` | The name of the provider (e.g., "google"). |
| `raw` | `unknown?` | The raw unparsed profile response from the provider. |

## TokenRefresh

The response returned when refreshing an access token (LinkedIn only).

```typescript
interface TokenRefresh {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}
```

## useMemoryType

Type definition for the internal in-memory storage used for PKCE keys.

```typescript
type useMemoryType = {
  key: string;
  value: string;
  ttl: number; // in milliseconds
}
```
