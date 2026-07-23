# BaseProviderClass

`BaseProviderClass` is the abstract base class that all OAuth providers in UniAuth extend. It defines the standard contract that every provider must implement, ensuring a consistent API across different OAuth services.

## Purpose
By enforcing a consistent interface, `BaseProviderClass` allows developers to swap providers easily or iterate over them without changing the underlying authentication logic.

## Abstract Methods

All providers extending `BaseProviderClass` must implement the following methods:

### `getAuthorizationUrl(): string`
Generates the authorization URL to which the user should be redirected to initiate the OAuth flow.
- For providers using PKCE (like Google and GitHub), this method also generates and stores the code verifier and challenge.

### `exchangeCodeForToken(code: string, key?: string): Promise<TokenResponse>`
Exchanges the authorization code for access and (optionally) refresh tokens.
- **Parameters:**
  - `code`: The authorization code received from the callback query parameters.
  - `key` *(optional)*: The PKCE key used to retrieve the `code_verifier` from memory. Required for providers like Google and GitHub.

### `getUserProfile(accessToken: string): Promise<UserProfile>`
Fetches the authenticated user's profile information using the provided access token.

## Optional Methods

### `refreshAccessToken?(refreshToken: string): Promise<TokenRefresh>`
Exchanges a valid refresh token for a new access token.
- *Note:* Currently, only `LinkedinProvider` implements this method.

## Provider Implementations

| Provider | `getAuthorizationUrl` | `exchangeCodeForToken` | `getUserProfile` | `refreshAccessToken` | PKCE Supported |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Google** | ✅ | ✅ (requires `key`) | ✅ | ❌ | ✅ |
| **GitHub** | ✅ | ✅ (requires `key`) | ✅ | ❌ | ✅ |
| **LinkedIn** | ✅ | ✅ | ✅ | ✅ | ❌ |

## How to Extend for Custom Providers

If you need to add a custom provider, you can extend `BaseProviderClass` and implement the abstract methods:

```typescript
import { BaseProviderClass, TokenResponse, UserProfile, AuthParams } from '@deba_1307/uniauth';

export abstract class CustomProvider extends BaseProviderClass {
  // Provider implementation details
}
```
