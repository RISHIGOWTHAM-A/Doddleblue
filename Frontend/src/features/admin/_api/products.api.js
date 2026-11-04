import { apiFetch } from '../../../api/apiClient'

export const adminCreateProduct = (body) =>
  apiFetch('/products', { method: 'POST', body })

export const adminUpdateProduct = (id, body) =>
  apiFetch(`/products/${id}`, { method: 'PUT', body })

export const adminDeleteProduct = (id) => apiFetch(`/products/${id}`, { method: 'DELETE' })

export const getUploadSignature = (folder = 'royal-sweets/products') =>
  apiFetch('/uploads/signature', { method: 'POST', body: JSON.stringify({ folder }) }).then((r) => r.data)

export const uploadToCloudinary = async (file) => {
  const sig = await getUploadSignature()
  const fd = new FormData()
  fd.append('file', file)
  fd.append('api_key', sig.apiKey)
  fd.append('timestamp', sig.timestamp)
  fd.append('signature', sig.signature)
  fd.append('folder', sig.folder)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, { method: 'POST', body: fd })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error?.message || 'Image upload failed')
  return { url: json.secure_url, publicId: json.public_id }
}

export const deleteCloudinaryImage = (publicId) =>
  apiFetch('/uploads', { method: 'DELETE', body: JSON.stringify({ publicId }) })
