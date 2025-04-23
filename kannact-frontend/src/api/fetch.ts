const DEFAULT_URL = "http://localhost:3000"

export function apiClientGet<T>(baseUrl: string): Promise<T> {
    const URL = DEFAULT_URL + baseUrl
    const options: RequestInit = {
        method: "GET"
    }

    return fetchWithType<T>(URL, options)
}

export function apiClientPost<T>(baseUrl: string, payload: string): Promise<T> {
    const URL = DEFAULT_URL + baseUrl
    const options: RequestInit = {
        method: "POST",
        body: payload
    }
    return fetchWithType<T>(URL, options)
}
export function apiClientPatch<T>(
    baseUrl: string,
    payload: string
): Promise<T> {
    const URL = DEFAULT_URL + baseUrl

    const options: RequestInit = {
        method: "PATCH",
        body: payload
    }
    return fetchWithType<T>(URL, options)
}
export function apiClientDelete<T>(baseUrl: string): Promise<T> {
    const URL = DEFAULT_URL + baseUrl
    const options: RequestInit = {
        method: "DELETE"
    }
    return fetchWithType<T>(URL, options)
}

async function fetchWithType<T>(url: string, options: RequestInit): Promise<T> {
    const defaultHeaders: HeadersInit = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }

    const optionsWithHeaders: RequestInit = {
        ...options,
        headers: { ...options.headers, ...defaultHeaders }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await fetch(url, optionsWithHeaders)

    if (!response.ok) {
        const responseJson = await response.json()
        throw new Error(responseJson.message)
    }

    return (await response.json()) as Promise<T>
}
