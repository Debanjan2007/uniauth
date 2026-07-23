# Quick Start

This guide will walk you through setting up your first OAuth flow using UniAuth. We'll use **Google** as our authentication provider in an Express.js application.

## 1. Install the package
Make sure you've installed the package as described in the [Installation](installation.md) guide.

## 2. Create OAuth Credentials
Go to the Google Cloud Console, create a new project, and set up an OAuth 2.0 Client ID. Add your authorized redirect URI (e.g., `http://localhost:3000/auth/google/callback`).

## 3. Initialize Uniauth
Create an instance of `Uniauth` with your configuration.

```typescript
import express from 'express';
import Uniauth, { ExtractKey } from '@deba_1307/uniauth';

const app = express();

const uniauth = new Uniauth({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
      redirecturl: 'http://localhost:3000/auth/google/callback',
      scope: ['openid', 'email', 'profile']
    }
  }
});
```

## 4. Complete Express Example

Here is a complete example demonstrating the entire flow: generating the auth URL, extracting the PKCE key, and exchanging the code for tokens.

```typescript
// Memory store for demo purposes. In production, use a secure session or Redis.
const sessionKeys: Record<string, string> = {};

app.get('/auth/google', (req, res) => {
  try {
    // 1. Get the provider
    const googleProvider = uniauth.getProvider('google');
    
    // 2. Generate authorization URL (contains PKCE key)
    const rawAuthUrl = googleProvider.getAuthorizationUrl();
    
    // 3. Extract the PKCE key and clean Auth URL
    const { key, AuthUrl } = ExtractKey(rawAuthUrl);
    
    // Save the key (e.g. in a cookie, or session mapped to a user session id)
    res.cookie('oauth_key', key, { httpOnly: true, maxAge: 60000 });
    
    // 4. Redirect user to the clean AuthUrl
    res.redirect(AuthUrl);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/auth/google/callback', async (req, res) => {
  try {
    const code = req.query.code as string;
    // Retrieve the key we saved earlier
    const key = req.cookies?.oauth_key;

    if (!code || !key) {
      return res.status(400).send("Missing code or key");
    }

    const googleProvider = uniauth.getProvider('google');
    
    // 5. Exchange code for token using the key
    const tokens = await googleProvider.exchangeCodeForToken(code, key);
    
    // 6. Fetch user profile
    const profile = await googleProvider.getUserProfile(tokens.accessToken);
    
    res.json({ tokens, profile });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
