# Express.js Integration

This example demonstrates how to integrate UniAuth with Express.js using `express-session` to store the PKCE key.

## Setup

```bash
npm install express express-session @deba_1307/uniauth dotenv
```

## Environment Variables (`.env`)

```env
PORT=3000
SESSION_SECRET=supersecret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

## Complete Example (`app.js`)

```javascript
import express from 'express';
import session from 'express-session';
import { Uniauth, ExtractKey } from '@deba_1307/uniauth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Initialize UniAuth
const uniauth = new Uniauth({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirecturl: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"]
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      redirecturl: "http://localhost:3000/auth/linkedin/callback",
      scope: ["openid", "profile", "email"]
    }
  }
});

// --- GOOGLE OAUTH (Requires PKCE) ---

app.get('/auth/google', (req, res) => {
  const provider = uniauth.getProvider('google');
  const rawUrl = provider.getAuthorizationUrl();
  
  // Google uses PKCE, so we extract the key and the clean URL
  const { key, AuthUrl } = ExtractKey(rawUrl);
  
  // Store the key in the session
  req.session.googlePkceKey = key;
  
  res.redirect(AuthUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  const key = req.session.googlePkceKey;

  if (!code || !key) {
    return res.status(400).send('Missing code or session key');
  }

  try {
    const provider = uniauth.getProvider('google');
    
    // Exchange code for token using the PKCE key
    const tokens = await provider.exchangeCodeForToken(code, key);
    
    // Fetch user profile
    const profile = await provider.getUserProfile(tokens.accessToken);
    
    res.json({ tokens, profile });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// --- LINKEDIN OAUTH (No PKCE) ---

app.get('/auth/linkedin', (req, res) => {
  const provider = uniauth.getProvider('linkedin');
  // LinkedIn doesn't use PKCE in UniAuth, so no key extraction needed
  const url = provider.getAuthorizationUrl();
  res.redirect(url);
});

app.get('/auth/linkedin/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing code');
  }

  try {
    const provider = uniauth.getProvider('linkedin');
    
    // Exchange code for token (no key required)
    const tokens = await provider.exchangeCodeForToken(code);
    
    // Fetch user profile
    const profile = await provider.getUserProfile(tokens.accessToken);
    
    res.json({ tokens, profile });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
```
