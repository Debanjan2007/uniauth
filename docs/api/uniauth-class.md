# Uniauth Class

The `Uniauth` class is the main entry point for the `@deba_1307/uniauth` package. It initializes configured OAuth providers and provides access to their instances.

## Import

```typescript
import { Uniauth } from '@deba_1307/uniauth';
// or
import Uniauth from '@deba_1307/uniauth';
```

## Constructor

```typescript
new Uniauth(config: UniauthConfig)
```

Initializes the providers based on the provided configuration.

### Parameters
- `config` (`UniauthConfig`): The configuration object containing options for `google`, `linkedin`, and `github` providers.

### Example

```typescript
const auth = new Uniauth({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirecturl: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"]
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      redirecturl: "http://localhost:3000/auth/linkedin/callback",
      scope: ["r_liteprofile", "r_emailaddress"]
    }
  }
});
```

## Methods

### `getProvider<T extends BaseProviderClass>(providerName: string): T`

Retrieves the instance of the configured provider by name.

#### Parameters
- `providerName` (`string`): The name of the provider (e.g., `'google'`, `'linkedin'`, `'github'`). This lookup is **case-insensitive**.

#### Returns
- `T`: The provider instance, extending `BaseProviderClass`.

#### Throws
- `Error("Unknown provider: ${providerName}")`: If the requested provider is not configured or recognized.

#### Example

```typescript
import { GoogleProvider } from '@deba_1307/uniauth';

const googleProvider = auth.getProvider<GoogleProvider>('google');
// 'Google' or 'GOOGLE' also works due to case-insensitivity
```

## Usage Patterns

1. **Initialization**: Create a singleton instance of `Uniauth` in your application setup.
2. **Retrieval**: Use `getProvider()` in your route handlers to get the specific provider instance for the current flow.
3. **Execution**: Call provider methods like `getAuthorizationUrl()`, `exchangeCodeForToken()`, and `getUserProfile()` to complete the OAuth flow.
