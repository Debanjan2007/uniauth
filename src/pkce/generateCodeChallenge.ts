// @ts-ignore
import crypto from 'node:crypto'

export async function generateCodeChallenge(code_verifier: string) {
    const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64url')
    return code_challenge
}