import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiFetch, getToken } from '../api/apiClient'

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  if (!getToken()) return { items: [] }
  const res = await apiFetch('/cart')
  return res.data
})
export const addItem = createAsyncThunk('cart/add', async (body) => (await apiFetch('/cart/items', { method: 'POST', body })).data)
export const updateItem = createAsyncThunk('cart/update', async (body) => (await apiFetch('/cart/items', { method: 'PUT', body })).data)
export const removeItem = createAsyncThunk('cart/remove', async (productId) => (await apiFetch(`/cart/items/${productId}`, { method: 'DELETE' })).data)
export const clearCart = createAsyncThunk('cart/clear', async () => (await apiFetch('/cart', { method: 'DELETE' })).data)

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], subtotal: 0, total: 0, status: 'idle' },
  reducers: {
    bumpCount: (s, a) => { s.items.push({ quantity: a.payload || 1, optimistic: true }) },
  },
  extraReducers: (b) => {
    b.addCase(fetchCart.pending, (s) => { s.status = 'loading' })
    b.addMatcher(
      (a) => a.type.startsWith('cart/') && a.type.endsWith('/fulfilled'),
      (s, a) => { const d = a.payload || {}; s.items = d.items || []; s.subtotal = d.subtotal || 0; s.total = d.total || 0; s.status = 'idle' }
    )
  },
})

export const { bumpCount } = cartSlice.actions
export const selectCartCount = (s) => s.cart.items.reduce((n, i) => n + (i.unavailable ? 0 : i.quantity), 0)
export default cartSlice.reducer
