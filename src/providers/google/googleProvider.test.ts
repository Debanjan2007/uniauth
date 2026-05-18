import { describe , expect , it } from 'vitest'
import { GoogleProvider } from './GoogleProvider.js'

describe('Google-Provider',()=> {
    const provider = new GoogleProvider({
        clientId: 'agrurbrrqcrgnnq',
        clientSecret: 'qriwmrowrcyqrqmc',
        redirecturl: 'http://localhost:4545/callback/auth',
        scope: ['email' , 'profile']
    })
    it('should generate an auth url with specific fields' , () => {
        const url = provider.getAuthorizationUrl()
        expect(url).toBeDefined()
        expect(url).toContain("accounts.google.com/o/oauth2/v2/auth")
        expect(url).toContain('code_challenge')
        expect(url).toContain('code_challenge_method')
        expect(url).toContain('key')
    })
})