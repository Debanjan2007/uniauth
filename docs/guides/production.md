# Production Considerations

When moving your UniAuth integration to a production environment, keep these best practices in mind.

## Environment Variables for Secrets
Never hardcode your `clientId` and `clientSecret`. Use environment variables and load them via a tool like `dotenv`.

```typescript
const uniauth = new Uniauth({
  providers: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirecturl: process.env.OAUTH_REDIRECT_URL as any, // Cast required if using strict httpurl constraint via env vars
      scope: ['read:user']
    }
  }
});
```

## HTTPS Requirement
In production, your `redirecturl` should always use `https://`. UniAuth enforces `http://` or `https://` via the `httpurl` type constraint, but for production, TLS is mandatory to prevent interception of the authorization code.

## PKCE TTL Considerations
UniAuth uses an in-memory store for PKCE code verifiers with a **strict 60-second TTL**. 
- **High Latency Environments**: If you have a highly distributed system or users on very slow networks, be aware that taking longer than 60 seconds on the provider consent screen will result in a `Session expired or invalid key` error.
- **Multi-Server Deployment**: Since the PKCE store is **in-memory**, if your backend is deployed across multiple instances (e.g., a Kubernetes cluster), the callback request *must* hit the exact same server that initiated the login, otherwise the `key` won't be found. You will need to use sticky sessions.

## Logging Best Practices
**Never log tokens**. Ensure that `TokenResponse` objects and `req.query.code` are excluded from your access logs.

> [!CAUTION]
> Logging raw URLs during the callback phase can expose authorization codes to your logging aggregator.

## CORS Configuration
OAuth callbacks are typically standard browser redirects, so CORS usually doesn't apply to the callback route itself. However, if your frontend is a SPA making XHR requests to start the flow, ensure your CORS policy allows your frontend domain.

## Secure Token Storage
Follow the principles outlined in the [Token Management](./token-management.md) guide. Never store access tokens in `localStorage`. Use encrypted HTTP-only cookies or a secure backend database session.

## Error Handling
Always wrap your token exchanges and profile fetches in `try/catch` blocks and serve a user-friendly error page when authentication fails. Monitor OAuth flows for frequent failures to proactively detect misconfigured credentials or API changes.
