/** @format */
import { api } from '@/services/fetch'
import { UserPublicSafe } from '@/types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const searchUsers = async (
    query: string,
    offset: number = 0,
    limit: number = 10
): Promise<UserPublicSafe[]> => {
    const response = await api.get(
        `${BASE_URL}/api/v1/moviebuddies/search/fuzzy`,
        {
            params: {
                query,
                offset,
                limit,
            },
        }
    )

    if (response.status !== 200) {
        throw new Error('Failed to fetch user data')
    }

    return response.data
}
