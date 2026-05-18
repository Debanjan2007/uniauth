export type httpurl = `http://${string}` | `https://${string}`
export interface GoogleAuthParams {
    clientId: string,
    redirecturl: httpurl,
    clientSecret: string,
    scope: string[],
}