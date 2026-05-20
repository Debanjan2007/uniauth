/**
 * Canonical user profile returned by an authenticated provider.
 */
export interface UserProfile {
    email?: string
    username?: string
    displayName?: string
    avatarUrl?: string
    provider: string
    raw?: unknown
}