import type { useMemoryType } from "./memory.types"
const memorymanager = new Map()

/**
 * Store a value in the in-memory session map with an expiration.
 *
 * Records the value and its computed expiration timestamp in the module-level memory manager and schedules automatic removal after the provided TTL.
 *
 * @param key - The key under which to store the value
 * @param value - The value to store
 * @param ttl - Time-to-live in milliseconds; the entry will be removed after this duration
 */
export function useMemory({key , value , ttl} : useMemoryType){
    const expiresAt = Date.now() + ttl
    memorymanager.set(key , {value , expiresAt})

    setTimeout(() => {
        memorymanager.delete(key)
    }, ttl)
}