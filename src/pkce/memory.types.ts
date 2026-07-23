/**
 * In-memory cache entry used by PKCE state management.
 */
export type useMemoryType = {
    /** Unique cache key for the saved PKCE value. */
    key: string,
    /** The stored value, typically a PKCE code verifier. */
    value: string,
    /** The time-to-live for this cache entry, in milliseconds. */
    ttl: number
}