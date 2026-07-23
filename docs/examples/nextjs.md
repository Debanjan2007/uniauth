# Next.js App Router Integration

This example shows how to use UniAuth with Next.js App Router.
> **Note:** UniAuth is designed for server-side use only. Do not use it in client components.

## Setup

Store your keys in `.env.local` and install UniAuth. We'll use Next.js cookies to store the PKCE key.

## `lib/uniauth.ts`
Create a centralized instance.

```typescript
import { Uniauth } from '@deba_1307/uniauth';

export const uniauth = new Uniauth({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirecturl: "http://localhost:3000/api/auth/google/callback",
      scope: ["profile", "email"]
    }
  }
});
```

## Redirect Route (`app/api/auth/google/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ExtractKey } from '@deba_1307/uniauth';
import { uniauth } from '@/lib/uniauth';

export async function GET() {
  const provider = uniauth.getProvider('google');
  const rawUrl = provider.getAuthorizationUrl();
  
  const { key, AuthUrl } = ExtractKey(rawUrl);
  
  // Store the key in a secure cookie
  cookies().set('pkce_key', key, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 // The key expires in 60 seconds anyway
  });

  return NextResponse.redirect(AuthUrl);
}
```

## Callback Route (`app/api/auth/google/callback/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { uniauth } from '@/lib/uniauth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  
  const cookieStore = cookies();
  const key = cookieStore.get('pkce_key')?.value;

  if (!code || !key) {
    return NextResponse.json({ error: 'Missing code or session key' }, { status: 400 });
  }

  try {
    const provider = uniauth.getProvider('google');
    const tokens = await provider.exchangeCodeForToken(code, key);
    const profile = await provider.getUserProfile(tokens.accessToken);
    
    // Clear the PKCE cookie
    cookieStore.delete('pkce_key');

    // Create session, save to DB, etc.
    return NextResponse.json({ success: true, profile });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```
