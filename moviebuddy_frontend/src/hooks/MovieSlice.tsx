/** @format */

import { MovieModel, MovieListPagnation } from '@/types'
import { StateCreator } from 'zustand'

export interface MovieInfoSlice {
    meta: MovieModel
    updateMeta: (newMeta: MovieModel) => void
}

export const initialMovieInfo: MovieModel = {
    id: '',
    title: 'not yet',
    overview: '',
    popularity: 0,
    image: '',
}

export interface MovieListSlice {
    movies: MovieListPagnation
    updateMovies: (newMovies: MovieListPagnation) => void
}

export const initialMovieListPagnation: MovieListPagnation = {
    pageNumber: 1,
    totalPages: 1,
    movieList: [],
}

export const createMovieInfoSlice: StateCreator<MovieInfoSlice> = (set) => ({
    meta: initialMovieInfo,
    updateMeta: (newMeta: MovieModel) => {
        set({ meta: newMeta })
    },
    reset: () => set({ meta: initialMovieInfo }),
})

export const createMovieListSlice: StateCreator<MovieListSlice> = (set) => ({
    movies: initialMovieListPagnation,
    updateMovies: (newMovies: MovieListPagnation) => {
        set({ movies: newMovies })
    },
    reset: () => set({ movies: initialMovieListPagnation }),
})
