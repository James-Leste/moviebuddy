/** @format */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL // Replace with your actual API URL

export async function queryMovies(
    name: string,
    page: number = 1
): Promise<any> {
    console.log(API_URL)
    console.log(`production: ${import.meta.env.PROD}`)
    try {
        const response = await axios.get(`${API_URL}/api/v1/movie/search`, {
            params: {
                name: name,
                page: page,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error querying movies:', error)
        throw error
    }
}

export async function getMovieById(id: string): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}/api/vi/movie/${id}`)
        return response.data
    } catch (error) {
        console.error('Error querying movies:', error)
        throw error
    }
}
