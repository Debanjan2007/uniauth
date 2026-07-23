# Architecture

UniAuth is designed with a clear separation of concerns, providing a unified interface across disparate OAuth implementations.

## Class Hierarchy

```mermaid
classDiagram
    class BaseProviderClass {
        <<abstract>>
        +getAuthorizationUrl() string
        +exchangeCodeForToken(code, key?) Promise
        +getUserProfile(accessToken) Promise
        +refreshAccessToken?(refreshToken) Promise
    }
    class GoogleProvider {
        +getAuthorizationUrl() string
        +exchangeCodeForToken(code, key) Promise
        +getUserProfile(accessToken) Promise
    }
    class LinkedinProvider {
        +getAuthorizationUrl() string
        +exchangeCodeForToken(code) Promise
        +getUserProfile(accessToken) Promise
        +refreshAccessToken(refreshToken) Promise
    }
    class GithubProvider {
        +getAuthorizationUrl() string
        +exchangeCodeForToken(code, key) Promise
        +getUserProfile(accessToken) Promise
    }
    
    BaseProviderClass <|-- GoogleProvider
    BaseProviderClass <|-- LinkedinProvider
    BaseProviderClass <|-- GithubProvider
    Uniauth --> BaseProviderClass : Manages instances
```

## Request Flow (PKCE Example: Google/GitHub)

```mermaid
sequenceDiagram
    participant App as Application
    participant Uniauth as UniAuth Library
    participant Memory as Internal Memory
    participant OAuth as OAuth Provider (Google)
    
    App->>Uniauth: getProvider('google').getAuthorizationUrl()
    Uniauth->>Uniauth: Generate code_verifier & challenge
    Uniauth->>Memory: Store verifier with TTL (key)
    Uniauth-->>App: Returns raw URL with appended `key`
    App->>Uniauth: ExtractKey(rawUrl)
    Uniauth-->>App: { key, AuthUrl }
    App->>App: Store key in session/cookie
    App->>OAuth: Redirect user to AuthUrl
    OAuth-->>App: Redirect back with `code`
    App->>Uniauth: exchangeCodeForToken(code, key)
    Uniauth->>Memory: Retrieve verifier using key
    Memory-->>Uniauth: verifier
    Uniauth->>OAuth: POST /token (code, verifier)
    OAuth-->>Uniauth: Access Token
    Uniauth-->>App: TokenResponse
```

## Provider Abstraction Pattern

The `BaseProviderClass` guarantees that regardless of the underlying OAuth 2.0 or OIDC implementation details, the application developer interacts with the exact same method signatures.

## PKCE Memory Management

For flows requiring PKCE, a challenge is generated dynamically per request. Since UniAuth doesn't manage HTTP sessions, it stores the raw `code_verifier` in an internal Node.js memory map, indexed by a short-lived UUID (`key`). The developer bridges the gap by persisting this lightweight `key` in the user's session between the redirect and callback phases.
