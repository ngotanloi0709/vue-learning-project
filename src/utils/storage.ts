export function setSessionData<T = unknown>(key: string, value: T) {
    sessionStorage.setItem(key, JSON.stringify(value))
}

export function getSessionData<T = unknown>(key: string): T | null {
    const data = sessionStorage.getItem(key)
    return data ? (JSON.parse(data) as T) : null
}

export function removeSessionData(key: string) {
    sessionStorage.removeItem(key)
}

export function setLocalData<T = unknown>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalData<T = unknown>(key: string): T | null {
    const data = localStorage.getItem(key)
    return data ? (JSON.parse(data) as T) : null
}

export function removeLocalData(key: string) {
    localStorage.removeItem(key)
}
