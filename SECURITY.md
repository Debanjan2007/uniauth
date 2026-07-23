# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v0.5.x  | :white_check_mark: |
| < v0.5  | :x:                |

## Reporting a Vulnerability

We take the security of UniAuth seriously. If you discover a security vulnerability within UniAuth, please do not disclose it publicly.

Instead, please report it via GitHub Security Advisories or contact the maintainers directly through email. We will investigate all reports and do our best to quickly fix the problem.

## Security Best Practices for UniAuth Users

When using UniAuth in your applications, please adhere to the following best practices:

- **Store credentials in environment variables:** Never hardcode your `clientId` and `clientSecret` in your source code. Use environment variables (e.g., `.env` files).
- **Use HTTPS in production:** Always use HTTPS to protect tokens and user data in transit. `redirecturl` should be HTTPS in production environments.
- **Validate state parameter:** UniAuth automatically handles state generation and validation for LinkedIn to prevent CSRF attacks.
- **PKCE is used automatically:** UniAuth automatically uses Proof Key for Code Exchange (PKCE) for Google and GitHub providers to prevent authorization code interception attacks.
- **Never expose client secrets client-side:** Ensure that UniAuth is only run in a server-side environment (Node.js). Do not expose client secrets in browser-side code.
- **Store tokens server-side only:** Access and refresh tokens should be securely stored on the server. If they must be sent to the client, use secure, HTTP-only cookies.
- **Set appropriate OAuth scopes:** Follow the principle of least privilege. Only request the scopes that your application absolutely needs.

## Disclosure Policy

- We will acknowledge receipt of your vulnerability report in a timely manner.
- We will provide an estimated timeframe for addressing the vulnerability.
- We will notify you when the vulnerability is fixed.
- We will publicly disclose the vulnerability only after a patch is released and users have been given a reasonable amount of time to upgrade.
