/** @format */

import { api } from '@/services/fetch'
import { MovieFavor } from '@/types'

export const createMovieFavor = async (
    movie_id: string,
    rating: number = 0,
    wanted: boolean = false
): Promise<MovieFavor> => {
    const response = await api.post<MovieFavor>(
        `/api/v1/movie/favor/${movie_id}`,
        {
            params: {
                rating: rating,
                wanted: wanted,
            },
        }
    )

    if (response.status !== 200) {
        throw new Error('Failed to create movie favor')
    }

    return response.data
}

export const getMovieFavorByUser = async (): Promise<MovieFavor> => {
    const response = await api.get<MovieFavor>(`/api/v1/movie/favor/`)

    if (response.status !== 200) {
        throw new Error('Failed to fetch movie favor')
    }

    return response.data
}
