export function ExtractKey(url :string):unknown {
    let key : string | undefined = undefined
    url.split('?')[1].split('&').forEach((elm)=> {
        const elmkey : string[] = elm.split('=')
        console.log(elmkey);        
        if(elmkey[0] == 'scope'){
            key = elmkey[1]
        }
    })
    return key
}