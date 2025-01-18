/** @format */

import { create } from 'zustand'
import { MovieModel, MovieListPagnation } from '@/types'

interface MovieInfoStore {
    meta: MovieModel
    updateMeta: (newMeta: MovieModel) => void
}

interface MovieListStore {
    movies: MovieListPagnation
    updateMovies: (newMovies: MovieListPagnation) => void
}

export const useMovieInfoStore = create<MovieInfoStore>((set) => ({
    meta: {
        id: -1,
        title: 'not yet',
        popularity: 0,
        image: '',
    },
    updateMeta: (newMeta: MovieModel) => {
        set({ meta: newMeta })
    },
}))

export const useMovieListStore = create<MovieListStore>((set) => ({
    movies: {
        pageNumber: 1,
        movieList: [],
    },
    updateMovies: (newMovies: MovieListPagnation) => {
        set({ movies: newMovies })
    },
}))
