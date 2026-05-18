import crypto from 'node:crypto';

export function generateCodeVerifier() {
    return crypto.randomBytes(64).toString('base64url')
}