const KEY = 'questology:loggedIn'

export function isLoggedIn(): boolean {
    try {
        return localStorage.getItem(KEY) === 'true'
    } catch {
        return false
    }
}

export function logIn(): void {
    localStorage.setItem(KEY, 'true')
}

export function logOut(): void {
    localStorage.removeItem(KEY)
}
