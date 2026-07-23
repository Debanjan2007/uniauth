import type { useMemoryType } from "./memory.types.js"
const memorymanager = new Map()

/**
 * Stores a value in memory with a specified time-to-live (TTL).
 * Automatically removes the value from memory once the TTL expires.
 * 
 * @param {useMemoryType} params - Object containing the key, value, and TTL in milliseconds.
 */
export function useMemory({key , value , ttl} : useMemoryType){
    const expiresAt = Date.now() + ttl
    memorymanager.set(key , {value , expiresAt})

    setTimeout(() => {
        memorymanager.delete(key)
    }, ttl)
}

/**
 * Interface representing the data returned from memory.
 */
interface memoryReturn {
    /** The stored value, typically a PKCE code verifier */
    value: string,
    /** The timestamp (in milliseconds) when this value expires */
    expireAt: number
}

/**
 * Retrieves a value from memory by its key.
 * 
 * @param {string} key - The unique key associated with the stored value.
 * @returns {memoryReturn | null} The stored value and expiration time, or null if it doesn't exist or has expired.
 */
export function getMemory(key : string):memoryReturn | null{
    const value = memorymanager.get(key)
    if(!value){
        return null
    }
    return value
}