# Error Handling

UniAuth uses standard JavaScript Errors with specific messages when things go wrong. Here is a comprehensive list of errors thrown by the library and how to resolve them.

## 1. Unknown Provider
`Error("Unknown provider: ${name}")`
- **Cause**: You tried to retrieve a provider via `getProvider()` that wasn't configured in the `UniauthConfig`.
- **Fix**: Check your spelling. Remember provider keys in the config must be lowercase (`google`, `linkedin`, `github`).
```typescript
// Throws if 'google' was not in your initial config
const provider = uniauth.getProvider('google'); 
```

## 2. Missing Key
`Error("Key is expected")`
- **Cause**: You called `exchangeCodeForToken(code)` on Google or GitHub without providing the PKCE `key`.
- **Fix**: Use `ExtractKey()` when generating the URL, save the key, and pass it: `exchangeCodeForToken(code, key)`.

## 3. PKCE Session Expired
`Error("Session expired or invalid key")`
- **Cause**: The PKCE verifier stored in memory has expired (TTL is 60 seconds), or a bogus key was provided.
- **Fix**: Ensure your users complete the authentication flow promptly. If they take longer than 60 seconds, they must restart the login process.

## 4. Token Exchange Failure
`Error("Error occured exchanging code for the access token")`
- **Cause**: The OAuth provider rejected the code exchange. This usually happens if the authorization code is invalid, already used, or if your Client ID/Secret is incorrect.
- **Fix**: Verify your credentials, ensure the `redirecturl` matches exactly, and confirm the code hasn't been reused.

## 5. Profile Fetch Failure
`Error("Something went wrong while fetching the user details from ${provider}")`
- **Cause**: The access token passed to `getUserProfile()` is invalid, expired, or lacks the necessary scopes.
- **Fix**: Verify you requested the correct scopes (`openid`, `profile`, `email`) and that the token is fresh.

## 6. Missing Refresh Token
`Error("Refresh token is required to refresh the access token")`
- **Cause**: You called `refreshAccessToken()` on the LinkedIn provider with an empty string or undefined value.
- **Fix**: Ensure you retrieved and stored the refresh token correctly before attempting to use it.

## 7. Refresh Token Failure
`Error("can't refresh the token right now!Try it later")`
- **Cause**: The OAuth provider rejected the refresh token request (e.g., token revoked, expired).
- **Fix**: Force the user to log in again to obtain a new set of credentials.
