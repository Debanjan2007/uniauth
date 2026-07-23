# GitHub Provider

UniAuth supports GitHub out of the box using the **PKCE (Proof Key for Code Exchange)** flow.

## Overview
GitHub's OAuth 2.0 flow with UniAuth uses PKCE for enhanced security. This means you must extract a `key` from the authorization URL and supply it during the token exchange step.

### OAuth Endpoints Used
- **Auth URL**: `https://github.com/login/oauth/authorize`
- **Token URL**: `https://github.com/login/oauth/access_token`
- **Profile URL**: `https://api.github.com/user`

## Setup Credentials
1. Go to your [GitHub Developer Settings](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Fill in your application name, homepage URL, and Authorization callback URL (e.g., `http://localhost:3000/auth/github/callback`).
4. Generate a new client secret and copy your Client ID and Client Secret.

## Common Scopes
- `user` (Grants read/write access to profile info)
- `user:email` (Grants read access to a user's email addresses)
- `read:user` (Grants read access to a user's profile data)

## Integration Example

```typescript
import express from 'express';
import Uniauth, { ExtractKey } from '@deba_1307/uniauth';

const app = express();

const uniauth = new Uniauth({
  providers: {
    github: {
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      redirecturl: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email', 'read:user']
    }
  }
});

// Route to start authentication
app.get('/auth/github', (req, res) => {
  const provider = uniauth.getProvider('github');
  const { key, AuthUrl } = ExtractKey(provider.getAuthorizationUrl());
  
  // Store the key securely (e.g., encrypted cookie or session)
  res.cookie('pkce_key', key, { httpOnly: true, maxAge: 60000 });
  res.redirect(AuthUrl);
});

// Callback route
app.get('/auth/github/callback', async (req, res) => {
  try {
    const code = req.query.code as string;
    const key = req.cookies.pkce_key;

    if (!code || !key) throw new Error("Missing code or key");

    const provider = uniauth.getProvider('github');
    
    // Exchange token requires the key for PKCE verification
    const tokens = await provider.exchangeCodeForToken(code, key);
    
    // Fetch user profile
    const profile = await provider.getUserProfile(tokens.accessToken);
    
    res.json({ profile });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
```

## Common Errors
- `Key is expected`: You forgot to pass the `key` parameter to `exchangeCodeForToken()`.
- `Session expired or invalid key`: The PKCE verifier has a 60-second TTL in memory.

## Limitations
- GitHub OAuth Apps **do not support refresh tokens**. Only GitHub Apps do. UniAuth GitHub provider does not currently implement `refreshAccessToken()`.
