# Fastify Integration

Integrating UniAuth with Fastify, using `@fastify/cookie` for PKCE state management.

## Complete Example

```javascript
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import { Uniauth, ExtractKey } from '@deba_1307/uniauth';

const fastify = Fastify({ logger: true });

fastify.register(cookie, {
  secret: "my-secret-key",
});

const uniauth = new Uniauth({
  providers: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirecturl: "http://localhost:3000/auth/github/callback",
      scope: ["user:email"]
    }
  }
});

fastify.get('/auth/github', async (request, reply) => {
  const provider = uniauth.getProvider('github');
  const { key, AuthUrl } = ExtractKey(provider.getAuthorizationUrl());
  
  reply.setCookie('pkce_key', key, {
    path: '/',
    httpOnly: true,
    maxAge: 60
  });

  reply.redirect(AuthUrl);
});

fastify.get('/auth/github/callback', async (request, reply) => {
  const { code } = request.query;
  const key = request.cookies.pkce_key;

  if (!code || !key) return reply.code(400).send('Bad Request');

  try {
    const provider = uniauth.getProvider('github');
    const tokens = await provider.exchangeCodeForToken(code, key);
    const profile = await provider.getUserProfile(tokens.accessToken);
    
    reply.clearCookie('pkce_key');
    return { profile };
  } catch (err) {
    return reply.code(500).send(err.message);
  }
});

fastify.listen({ port: 3000 });
```
