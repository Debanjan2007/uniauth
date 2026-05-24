import { describe , expect , it } from 'vitest'
import { GithubProvider } from './GithubProviders'

describe('Google-Provider',()=> {
    const provider = new GithubProvider({
        clientId: 'agrurbrrqcrgnnq',
        clientSecret: 'qriwmrowrcyqrqmc',
        redirecturl: 'http://localhost:4545/callback/auth',
        scope: ['email' , 'profile']
    })
    it('should generate an auth url with specific fields' , () => {
        const url = provider.getAuthorizationUrl()
        expect(url).toBeDefined()
        expect(url).toContain("https://github.com")
        expect(url).toContain('code_challenge')
        expect(url).toContain('code_challenge_method')
        expect(url).toContain('key')
    })
})