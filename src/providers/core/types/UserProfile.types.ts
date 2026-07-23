/**
 * Canonical user profile returned by an authenticated provider.
 */
export interface UserProfile {
    /** The user's primary email address, if provided. */
    email?: string
    /** The user's username handle on the provider platform. */
    username?: string
    /** The user's full display name. */
    displayName?: string
    /** URL pointing to the user's profile avatar image. */
    avatarUrl?: string
    /** The name of the provider that returned this profile (e.g., "Google", "GitHub"). */
    provider: string
    /** The raw JSON profile response returned by the provider's user info endpoint. */
    raw?: unknown
}