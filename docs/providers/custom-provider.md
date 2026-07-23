# Custom Providers

While UniAuth comes with built-in support for Google, GitHub, and LinkedIn, you can easily extend the library or use its architecture to add your own providers in a fork.

## When to create a custom provider?
You should create a custom provider if you need to authenticate users with an OAuth 2.0 service that UniAuth doesn't natively support (e.g., Discord, Spotify, Auth0).

## Step-by-Step Guide (For Library Contributors)

If you are contributing a new provider directly to UniAuth's source code, follow these steps:

### 1. Create a directory under `src/providers/`
Create a folder for your new provider, e.g., `src/providers/acme/`.

### 2. Define constants file with OAuth endpoints
Create `constants.ts` to hold the URLs:
```typescript
export const ACME_AUTH_URL = "https://acme.com/oauth/authorize";
export const ACME_TOKEN_URL = "https://acme.com/oauth/token";
export const ACME_PROFILE_URL = "https://api.acme.com/v1/user";
```

### 3. Create provider class extending `BaseProviderClass`
Create `AcmeProvider.ts` extending the abstract base class:

```typescript
import { BaseProviderClass } from '../../core/BaseProviderClass';
import type { AuthParams, TokenResponse, UserProfile } from '../../types';

export class AcmeProvider extends BaseProviderClass {
  constructor(config: AuthParams) {
    super();
    // Initialize properties
  }

  getAuthorizationUrl(): string {
    // Generate state, potentially PKCE, and return URL
    return "...";
  }

  async exchangeCodeForToken(code: string, key?: string): Promise<TokenResponse> {
    // Perform POST request to exchange code
    return { accessToken: "...", raw: {} };
  }

  async getUserProfile(accessToken: string): Promise<UserProfile> {
    // Perform GET request to profile endpoint
    return { provider: "acme", raw: {} };
  }
}
```

### 4. Optionally implement `refreshAccessToken()`
If your provider supports refresh tokens, you can implement the optional method:
```typescript
async refreshAccessToken(refreshToken: string): Promise<TokenRefresh> {
  // Perform refresh token exchange
  return { ... };
}
```

### 5. Register in `Uniauth.ts`
Modify the `Uniauth` class to instantiate and expose your new provider. Add it to the map of initialized providers if it's present in the config.

### 6. Add to `UniauthConfig` type
Update the main config interface so TypeScript knows about it:
```typescript
interface UniauthConfig {
  providers: {
    linkedin?: AuthParams;
    google?: AuthParams;
    github?: AuthParams;
    acme?: AuthParams; // New!
  }
}
```

### 7. Export from `index.ts`
While you don't have to export the provider class itself (unless desired), ensure consumers can access it via `getProvider('acme')`.

## Testing Recommendations
Ensure you write automated tests that mock the HTTP requests (using a library like `msw` or `nock`) to verify that URL generation, token exchange, and error handling behave correctly.
