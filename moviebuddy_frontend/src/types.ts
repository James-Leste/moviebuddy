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

export interface UserPublicSafe {
    id: string
    username: string
    full_name: string | null
    bio: string | null
    avatar_url: string | null
    location: string | null
    favorite_genres: string[]
    is_verified: boolean
    created_at: string
    last_seen: string | null
}
