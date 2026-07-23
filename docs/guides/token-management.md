# Token Management

Handling tokens securely is critical for protecting user data. UniAuth returns structured token data that you must manage safely.

## TokenResponse Fields

When you exchange a code, UniAuth returns a `TokenResponse` object:

```typescript
interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  scope?: string;
  idToken?: string;
  raw: unknown; // The raw JSON response from the provider
}
```

## Access Tokens
Access tokens are short-lived credentials used to fetch the user's profile (`getUserProfile(accessToken)`). 
Once you retrieve the user's profile, typically you create your own application session (using JWTs or session cookies) and discard the provider's access token unless you need to make further API calls on behalf of the user.

## Refresh Tokens
Refresh tokens are long-lived credentials used to obtain new access tokens without requiring the user to log in again.

**Currently, LinkedIn is the only provider in UniAuth that supports the `refreshAccessToken()` method.**

```typescript
const newTokens = await linkedinProvider.refreshAccessToken(oldRefreshToken);
```

> [!WARNING]
> GitHub OAuth apps do not issue refresh tokens, and Google requires specific parameters to issue them reliably, which UniAuth does not expose natively at this time.

## Token Storage Recommendations

### Server-Side
If your app needs to interact with the provider's API continuously, store tokens securely on your backend:
- Encrypted Database columns
- Redis instances
- Secure session storage

### Client-Side
- **Never store Access or Refresh Tokens in `localStorage` or unencrypted Cookies.**
- If you must pass a session to the frontend, create an HttpOnly, Secure cookie containing your *own* application's session identifier, not the raw OAuth tokens.

## Token Expiration Handling
When dealing with expiring access tokens (e.g., calling provider APIs later), catch HTTP unauthorized errors and conditionally call `refreshAccessToken()` if the provider supports it.

## Security Considerations
Always validate the `raw` payload if you are relying on specific provider undocumented fields, but prefer using the normalized `TokenResponse` and `UserProfile` objects provided by UniAuth.
