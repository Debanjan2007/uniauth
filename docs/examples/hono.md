# Hono Integration

Hono is a fast web framework for Edge, Deno, Bun, and Node.js.

## Complete Example

```typescript
import { Hono } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { Uniauth, ExtractKey } from '@deba_1307/uniauth';

const app = new Hono();

const uniauth = new Uniauth({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirecturl: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"]
    }
  }
});

app.get('/auth/google', (c) => {
  const provider = uniauth.getProvider('google');
  const { key, AuthUrl } = ExtractKey(provider.getAuthorizationUrl());
  
  setCookie(c, 'pkce_key', key, {
    httpOnly: true,
    maxAge: 60
  });
  
  return c.redirect(AuthUrl);
});

app.get('/auth/google/callback', async (c) => {
  const code = c.req.query('code');
  const key = getCookie(c, 'pkce_key');

  if (!code || !key) {
    return c.text('Missing code or key', 400);
  }

  try {
    const provider = uniauth.getProvider('google');
    const tokens = await provider.exchangeCodeForToken(code, key);
    const profile = await provider.getUserProfile(tokens.accessToken);
    
    deleteCookie(c, 'pkce_key');
    return c.json({ profile });
  } catch (error: any) {
    return c.text(error.message, 500);
  }
});

export default app;
```
