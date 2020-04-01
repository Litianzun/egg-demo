export function setAppUser(info){
    return {
        type: 'SET_APPUSER',
        info
    }
}

export function setToken(token){
    return {
        type: 'SET_TOKEN',
        token
    }
}