# Google Provider

UniAuth supports Google out of the box using the **PKCE (Proof Key for Code Exchange)** flow.

## Overview
Google's OAuth 2.0 flow with UniAuth uses PKCE for enhanced security. This means you must extract a `key` from the authorization URL and supply it during the token exchange step.

### OAuth Endpoints Used
- **Auth URL**: `https://accounts.google.com/o/oauth2/v2/auth`
- **Token URL**: `https://oauth2.googleapis.com/token`

## Setup Credentials
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services** > **Credentials**.
4. Click **Create Credentials** > **OAuth client ID**.
5. Add your authorized redirect URIs (e.g., `http://localhost:3000/auth/google/callback`).
6. Copy your Client ID and Client Secret.

## Required Scopes
Typically, you'll want the following scopes to authenticate a user:
- `openid`
- `email`
- `profile`

## Integration Example

```typescript
import express from 'express';
import Uniauth, { ExtractKey } from '@deba_1307/uniauth';

const app = express();

const uniauth = new Uniauth({
  providers: {
    google: {
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      redirecturl: 'http://localhost:3000/auth/google/callback',
      scope: ['openid', 'email', 'profile']
    }
  }
});

// Route to start authentication
app.get('/auth/google', (req, res) => {
  const provider = uniauth.getProvider('google');
  const { key, AuthUrl } = ExtractKey(provider.getAuthorizationUrl());
  
  // Store the key securely (e.g., encrypted cookie or session)
  res.cookie('pkce_key', key, { httpOnly: true, maxAge: 60000 });
  res.redirect(AuthUrl);
});

// Callback route
app.get('/auth/google/callback', async (req, res) => {
  try {
    const code = req.query.code as string;
    const key = req.cookies.pkce_key;

    if (!code || !key) throw new Error("Missing code or key");

    const provider = uniauth.getProvider('google');
    
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
- `Session expired or invalid key`: The PKCE verifier has a 60-second TTL. Ensure the user completes the login quickly, or the session will expire.

## Limitations
- Google issues refresh tokens only on the first authorization unless you enforce `prompt=consent`, which UniAuth currently does not explicitly expose in `AuthParams`.
- Google Provider currently does not implement `refreshAccessToken()`.
