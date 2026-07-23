# LinkedIn Provider

UniAuth supports LinkedIn out of the box using the **Standard Authorization Code** flow.

## Overview
Unlike Google and GitHub, the LinkedIn provider in UniAuth does **not** use PKCE. Instead, it uses a standard `state` parameter approach. This simplifies the flow slightly, as you don't need to use `ExtractKey()`.

### OAuth Endpoints Used
- **Auth URL**: `https://www.linkedin.com/oauth/v2/authorization`
- **Token URL**: `https://www.linkedin.com/oauth/v2/accessToken`
- **Profile URL**: `https://api.linkedin.com/v2/userinfo`

## Setup Credentials
1. Go to the [LinkedIn Developer Portal](https://developer.linkedin.com/).
2. Create an App and verify your company page.
3. In the **Auth** tab, add your redirect URIs (e.g., `http://localhost:3000/auth/linkedin/callback`).
4. Copy your Client ID and Client Secret.

## Common Scopes
- `openid`
- `profile`
- `email`
- `w_member_social` (If creating posts on behalf of the user)

## Integration Example

```typescript
import express from 'express';
import Uniauth from '@deba_1307/uniauth';

const app = express();

const uniauth = new Uniauth({
  providers: {
    linkedin: {
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
      redirecturl: 'http://localhost:3000/auth/linkedin/callback',
      scope: ['openid', 'profile', 'email']
    }
  }
});

// Route to start authentication
app.get('/auth/linkedin', (req, res) => {
  const provider = uniauth.getProvider('linkedin');
  
  // Direct redirect, no PKCE key needed!
  res.redirect(provider.getAuthorizationUrl());
});

// Callback route
app.get('/auth/linkedin/callback', async (req, res) => {
  try {
    const code = req.query.code as string;

    if (!code) throw new Error("Missing authorization code");

    const provider = uniauth.getProvider('linkedin');
    
    // Token exchange does NOT require a key
    const tokens = await provider.exchangeCodeForToken(code);
    
    // Fetch user profile
    const profile = await provider.getUserProfile(tokens.accessToken);
    
    res.json({ tokens, profile });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
```

## Token Refreshing
LinkedIn is the only provider currently in UniAuth that supports the `refreshAccessToken()` method.

```typescript
app.post('/auth/linkedin/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const provider = uniauth.getProvider('linkedin');
    
    const newTokens = await provider.refreshAccessToken(refreshToken);
    res.json(newTokens);
  } catch (error) {
    res.status(400).send(error.message); // e.g., "Refresh token is required..." or "can't refresh..."
  }
});
```

## Common Errors
- `Refresh token is required to refresh the access token`: Passed an empty string to `refreshAccessToken()`.
- `can't refresh the token right now!Try it later`: HTTP error from LinkedIn during refresh.

## Limitations
- LinkedIn requires a strict matching `redirecturl` configured precisely in their developer portal.
