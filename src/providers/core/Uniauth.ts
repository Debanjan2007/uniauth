import { UniauthConfig } from './types/UniauthConfig.types'
import { LinkedinProvider }  from '../linkedin/LinkedinProvider'

export class Uniauth {
    private providers = new Map<string, any>
    constructor(config: UniauthConfig) {
        if(config.providers?.Linkedin){
            this.providers.set(
                'Linkedin',
                new LinkedinProvider(config.providers.Linkedin)
            )
        }
    }
    getProvider(providername: string){
        const provider = this.providers.get(providername)
        if(!provider){
            return 'Wrong provider call'
        }
        return provider
    }
}