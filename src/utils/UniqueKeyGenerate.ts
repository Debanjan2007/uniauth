import { v4 as uuid } from 'uuid'

export function generateUniqueid(){
    const uid = uuid() 
    return uid
}