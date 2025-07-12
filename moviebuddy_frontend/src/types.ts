/** @format */

export interface MovieModel {
    id: string
    title: string
    overview: string
    image: string
    popularity: number
}

export interface MovieListPagnation {
    pageNumber: number
    totalPages: number
    movieList: MovieModel[]
}

export interface User {
    id: string
    username: string
    email: string
    buddiesList: string[]
    isAdmin?: boolean
    hashedPassword: string
}
