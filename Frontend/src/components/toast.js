// Tiny global toast — call `toast('message')` from anywhere, mount <Toaster /> once.
const listeners = new Set()
export const subscribeToasts = (fn) => { listeners.add(fn); return () => listeners.delete(fn) }
export const toast = (message, type = 'success') => {
  listeners.forEach((fn) => fn({ id: Date.now() + Math.random(), message, type }))
}
