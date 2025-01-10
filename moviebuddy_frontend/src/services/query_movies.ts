/** @format */

import axios from 'axios'

const API_URL = 'http://localhost:8000/movies' // Replace with your actual API URL

export async function queryMovies(
    name: string,
    page: number = 1
): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}`, {
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
