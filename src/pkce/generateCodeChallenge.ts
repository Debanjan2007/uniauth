import * as crypto from 'crypto'

/**
 * Generates a PKCE code challenge from a code verifier using SHA-256 and base64url encoding.
 * 
 * @param {string} code_verifier - The generated code verifier string.
 * @returns {string} The base64url-encoded code challenge.
 */
export function generateCodeChallenge(code_verifier: string) {
    const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64url')
    return code_challenge
}