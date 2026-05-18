import type { useMemoryType } from "./memory.types"
const memorymanager = new Map()

export function useMemory({key , value , ttl} : useMemoryType){
    const expiresAt = Date.now() + ttl
    memorymanager.set(key , {value , expiresAt})

    setTimeout(() => {
        memorymanager.delete(key)
    }, ttl)
}

export function getMemory(key : string):string | null{
    const value = memorymanager.get(key)
    if(!value){
        return null
    }
    return value
}