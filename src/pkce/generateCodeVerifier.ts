// @ts-ignore
import crypto from 'node:crypto';

export function generateCodeVerifier() {
    return crypto.randomBytes(32).toString('base64url')
}