import { describe , expect , it } from 'vitest'
import { InstagramProvider } from './InstagramProvider'

describe('Google-Provider',()=> {
    const provider = new InstagramProvider({
        clientId: 'agrurbrrqcrgnnq',
        clientSecret: 'qriwmrowrcyqrqmc',
        redirecturl: 'http://localhost:4545/callback/auth',
        scope: ['email' , 'profile']
    })
    it('should generate an auth url with specific fields' , () => {
        const url = provider.getAuthorizationUrl()
        expect(url).toBeDefined()
        expect(url).toContain("https://api.instagram.com/oauth/authorize")
        expect(url).toContain('state')
    })
})