# OAuth 2.0 Flow

UniAuth abstracts away the complexities of the OAuth 2.0 Authorization Code Flow.

## Sequence Diagram

Here is a visual representation of the complete flow when using UniAuth:

```mermaid
sequenceDiagram
    actor User
    participant App as Your App
    participant UniAuth
    participant Provider as OAuth Provider (Google, etc.)

    User->>App: Clicks "Login with Google"
    App->>UniAuth: getProvider('google').getAuthorizationUrl()
    UniAuth-->>App: Returns Auth URL (with PKCE key if applicable)
    App->>App: ExtractKey() and save key in session
    App->>User: Redirects to AuthUrl
    
    User->>Provider: Grants Consent
    Provider-->>User: Redirects back to App Callback (with code)
    
    User->>App: Hits /auth/callback?code=xyz
    App->>UniAuth: exchangeCodeForToken(code, key)
    UniAuth->>Provider: POST /token (exchanges code + PKCE verifier)
    Provider-->>UniAuth: Returns Access Token
    UniAuth-->>App: Returns TokenResponse
    
    App->>UniAuth: getUserProfile(accessToken)
    UniAuth->>Provider: GET /userinfo
    Provider-->>UniAuth: Returns User Data
    UniAuth-->>App: Returns UserProfile
    
    App-->>User: Logs user in!
```

## How UniAuth Abstracts This
Instead of manually crafting URLs, tracking `state` parameters, handling PKCE hashing, and making nested HTTP requests to various endpoints, UniAuth provides a streamlined, type-safe API. 

## PKCE vs Non-PKCE Flows
- **PKCE Flows (Google, GitHub)**: You use `ExtractKey(url)` to securely separate the `key` pointing to the in-memory code verifier from the actual redirect URL.
- **Non-PKCE Flows (LinkedIn)**: You use the generated URL directly. The `getAuthorizationUrl()` method handles setting the `state` parameter automatically to prevent CSRF attacks.

## State Parameter Handling
For non-PKCE providers like LinkedIn, UniAuth embeds the state parameter logic internally. For PKCE providers, the robust PKCE challenge mitigates similar CSRF vectors.
