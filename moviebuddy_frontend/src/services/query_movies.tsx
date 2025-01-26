/** @format */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL // Replace with your actual API URL

export async function queryMovies(
    name: string,
    page: number = 1
): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}/movie/search`, {
            params: {
                name: name,
                page: page,
            },
        })
        console.log(import.meta.env.BASE_URL)
        return response.data
    } catch (error) {
        console.error('Error querying movies:', error)
        throw error
    }
}

export async function getMovieById(id: string): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}/movie/${id}`)
        return response.data
    } catch (error) {
        console.error('Error querying movies:', error)
        throw error
    }
}
