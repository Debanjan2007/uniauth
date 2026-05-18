import { describe , expect , it } from 'vitest'
import { LinkedinProvider } from './LinkedinProvider.js'

describe('Linkedin-Provider', () => {
    const provider = new LinkedinProvider({
        clientId: 'iueycnrweirwocnryw',
        clientSecret: 'rcuyirnwcnrwmrqrcw',
        redirecturl: 'http://localhost:5467/log/callback',
        scope: []
    })
    it('Should generate an auth url with specific fields', () => {
        const url = provider.getAuthorizationUrl()
        expect(url).toBeDefined()
        expect(url).toContain('www.linkedin.com/oauth/v2/authorization')
        expect(url).toContain('scope')
    })
})