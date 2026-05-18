import * as crypto from 'crypto'

export function generateCodeChallenge(code_verifier: string) {
    const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64url')
    return code_challenge
}