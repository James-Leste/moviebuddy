/** @format */

import axios from 'axios'
import { api } from '@/services/fetch'
import { User, UserPublicSafe } from '@/types'

interface LoginResponse {
    access_token: string
    token_type: string
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const login = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    const response = await axios.post<LoginResponse>(
        `${BASE_URL}/api/v1/token`,
        params
    )

    if (response.status !== 200) {
        throw new Error('Login failed')
    }

    return response.data
}

const register = async (
    username: string,
    password: string,
    email: string
): Promise<User> => {
    const response = await axios.post<User>(`${BASE_URL}/api/v1/moviebuddies`, {
        username: username,
        plain_password: password,
        email: email,
    })

    if (response.status !== 200) {
        throw new Error('Registration failed')
    }

    return response.data
}

const getUser = async (): Promise<UserPublicSafe> => {
    const response = await api.get(`${BASE_URL}/api/v1/users/me`)

    if (response.status !== 200) {
        throw new Error('Failed to fetch user data')
    }

    return response.data
}

export { login, register, getUser }
