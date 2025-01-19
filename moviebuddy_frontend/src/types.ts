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
    movieList: MovieModel[]
}
