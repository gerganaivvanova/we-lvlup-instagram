const KEY = 'redux'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function loadState() {
    try {
        const serializedState = localStorage.getItem(KEY)
        if (!serializedState) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined
    }
}

export async function saveState(state: unknown): Promise<void> {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(KEY, serializedState)
    } catch (e) {
        // Ignore
    }
}
