export interface UserProfile {
    id: string
    email?: string
    username?: string
    displayName?: string
    avatarUrl?: string
    provider: string
    raw?: unknown
}