/** @format */

export interface MovieModel {
    id: number
    title: string
    image: string
    popularity: number
}

export interface MovieListPagnation {
    pageNumber: number
    movieList: MovieModel[]
}
