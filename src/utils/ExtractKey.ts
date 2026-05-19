export function ExtractKey(url :string):unknown {
    let key : string | undefined = undefined
    url.split('?')[1].split('&').forEach((elm)=> {
        const elmkey : string[] = elm.split('=')
        if(elmkey[0] == 'key'){
            key = elmkey[1]
        }
    })
    const AuthUrl = url.split('&').slice(0,-1).join('&')
    return {key , AuthUrl}
}