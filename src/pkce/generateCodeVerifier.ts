// @ts-ignore
import crypto from 'node:crypto';

/**
 * Generates a PKCE code verifier suitable for OAuth 2.0 PKCE flows.
 *
 * @returns A URL-safe Base64-encoded string to be used as the code verifier.
 */
export function generateCodeVerifier() {
    return crypto.randomBytes(32).toString('base64url')
}