/**
 * In-memory cache entry used by PKCE state management.
 */
export type useMemoryType = {
    /** Unique cache key for the saved PKCE value. */
    key: string , // unique key
    value: string,
    ttl: number  // in miliseconds
}