# Configuration

The core of UniAuth is the `UniauthConfig` object. This configuration maps provider names to their specific OAuth parameters.

## UniauthConfig Interface

When initializing the `Uniauth` class, you must provide a configuration object that matches the `UniauthConfig` interface:

```typescript
interface UniauthConfig {
  providers: {
    linkedin?: AuthParams;
    google?: AuthParams;
    github?: AuthParams;
  }
}
```

> [!NOTE]
> Provider keys must be lowercase (`linkedin`, `google`, `github`). When retrieving a provider with `getProvider()`, UniAuth performs a case-insensitive lookup (so `getProvider('Google')` will work).

## AuthParams

Each configured provider takes an `AuthParams` object:

```typescript
interface AuthParams {
  clientId: string;
  clientSecret: string;
  redirecturl: httpurl;
  scope: string[];
}
```

### The `redirecturl` property
Notice the lowercase `u` in `redirecturl`. This is the exact property name you must use.

### The `httpurl` Constraint
The `redirecturl` property is strictly typed using a TypeScript template literal type to ensure security:

```typescript
type httpurl = `http://${string}` | `https://${string}`;
```
Your redirect URL **must** start with `http://` or `https://`.

## Configuring Multiple Providers

You can configure multiple providers simultaneously:

```typescript
import Uniauth from '@deba_1307/uniauth';

const uniauth = new Uniauth({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirecturl: 'http://localhost:3000/auth/google/callback',
      scope: ['openid', 'profile', 'email']
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirecturl: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email', 'read:user']
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      redirecturl: 'http://localhost:3000/auth/linkedin/callback',
      scope: ['openid', 'profile', 'email']
    }
  }
});
```

## Environment Variables
It is highly recommended to use environment variables (`dotenv`) for your `clientId` and `clientSecret`. Never hardcode these values in your repository.
