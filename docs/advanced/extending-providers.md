# Extending Providers

This guide is for contributors who want to add new OAuth providers to UniAuth.

## Provider File Structure

New providers should be placed in `src/providers/` and have a corresponding constants file in `src/constants/`.

1. `src/constants/twitterConstants.ts` - Define endpoints.
2. `src/providers/TwitterProvider.ts` - Implement `BaseProviderClass`.

## Implementing the Contract

Extend `BaseProviderClass` and implement the required methods:

```typescript
import { BaseProviderClass } from '../core/BaseProviderClass';
import { AuthParams, TokenResponse, UserProfile } from '../types';

export class TwitterProvider extends BaseProviderClass {
  private config: AuthParams;

  constructor(config: AuthParams) {
    super();
    this.config = config;
  }

  getAuthorizationUrl(): string {
    // Generate URL
  }

  async exchangeCodeForToken(code: string, key?: string): Promise<TokenResponse> {
    // Exchange token
  }

  async getUserProfile(accessToken: string): Promise<UserProfile> {
    // Fetch profile
  }
}
```

## Shared Helpers vs Custom Implementations

UniAuth provides shared HTTP helpers in `src/utils/`.
- **Google & GitHub** use the shared helpers for token exchange because their flows are standard.
- **LinkedIn** uses a custom token exchange implementation because its payload requirements differ slightly.

Use the shared helpers if the provider supports standard OAuth 2.0 token requests. If they deviate, write a custom Axios request inside the provider.

## Registering the Provider

1. **Update `UniauthConfig`** in `src/types.ts`:
```typescript
interface UniauthConfig {
  providers: {
    linkedin?: AuthParams;
    google?: AuthParams;
    github?: AuthParams;
    twitter?: AuthParams; // Add your provider here
  }
}
```

2. **Update `Uniauth.ts`**:
```typescript
import { TwitterProvider } from './providers/TwitterProvider';

export class Uniauth {
  // ...
  constructor(config: UniauthConfig) {
    // ...
    if (config.providers.twitter) {
      this.providers.set('twitter', new TwitterProvider(config.providers.twitter));
    }
  }
}
```

3. **Update Exports** in `src/index.ts` to export your new provider class.

## Writing Tests

Ensure you write unit tests testing the URL generation and mocking the token exchange responses.
