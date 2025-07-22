/** @format */

import { useCustomStore } from '@/hooks/store'
import axios from 'axios'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config) => {
    const token = useCustomStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            useCustomStore.getState().resetToken()
        }
        return Promise.reject(error)
    }
)
