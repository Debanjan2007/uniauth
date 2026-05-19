import type { useMemoryType } from "./memory.types.js"
const memorymanager = new Map()

export function useMemory({key , value , ttl} : useMemoryType){
    const expiresAt = Date.now() + ttl
    memorymanager.set(key , {value , expiresAt})

    setTimeout(() => {
        memorymanager.delete(key)
    }, ttl)
}

interface memoryReturn {
    value: string,
    expireAt: number
}

export function getMemory(key : string):memoryReturn | null{
    const value = memorymanager.get(key)
    if(!value){
        return null
    }
    return value
}