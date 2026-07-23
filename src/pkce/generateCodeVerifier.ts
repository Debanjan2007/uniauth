import crypto from 'node:crypto';

/**
 * Generates a random PKCE code verifier string.
 * Uses 64 random bytes encoded as base64url.
 * Also used to generate state strings for non-PKCE OAuth flows (like LinkedIn).
 * 
 * @returns {string} The randomly generated base64url-encoded string.
 */
export function generateCodeVerifier() {
    return crypto.randomBytes(64).toString('base64url')
}