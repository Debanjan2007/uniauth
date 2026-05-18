import type { httpurl } from '../google/Google.types.js'
export interface LinkedinAuthParams {
    clientId: string,
    redirecturl: httpurl,
    clientSecret: string,
    scope: string[]
}