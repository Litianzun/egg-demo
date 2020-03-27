import Store from './store'

export function setAppUser(appUser){
    return {
        type: 'SET_APP_USER',
        appUser
    }
}