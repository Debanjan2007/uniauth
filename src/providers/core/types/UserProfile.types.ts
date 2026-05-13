export interface UserProfile {
    email?: string
    username?: string
    displayName?: string
    avatarUrl?: string
    provider: string
    raw?: unknown
}