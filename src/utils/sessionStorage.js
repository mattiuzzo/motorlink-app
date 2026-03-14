export function loadState(key) {
  try {
    const serialized = sessionStorage.getItem(key)
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch {
    return undefined
  }
}

export function saveState(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export function removeState(key) {
  try {
    sessionStorage.removeItem(key)
  } catch {
    // ignore
  }
}
