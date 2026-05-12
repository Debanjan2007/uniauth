// @ts-ignore
import crypto from 'node:crypto'

/**
 * Compute a PKCE code challenge from a code verifier.
 *
 * @param code_verifier - The PKCE code verifier string to transform
 * @returns The base64url-encoded SHA-256 digest of `code_verifier`, suitable as a PKCE code challenge
 */
export async function generateCodeChallenge(code_verifier: string) {
    const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64url')
    return code_challenge
}