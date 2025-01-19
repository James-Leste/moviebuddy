/** @format */

import { create } from 'zustand'
import { MovieModel, MovieListPagnation } from '@/types'

interface MovieInfoStore {
    meta: MovieModel
    updateMeta: (newMeta: MovieModel) => void
}

const initialMovieMeta: MovieModel = {
    id: '',
    title: 'not yet',
    overview: '',
    popularity: 0,
    image: '',
}

interface MovieListStore {
    movies: MovieListPagnation
    updateMovies: (newMovies: MovieListPagnation) => void
}

const initialMovieListPagnation: MovieListPagnation = {
    pageNumber: 1,
    movieList: [],
}

export const useMovieInfoStore = create<MovieInfoStore>((set) => ({
    meta: initialMovieMeta,
    updateMeta: (newMeta: MovieModel) => {
        set({ meta: newMeta })
    },
    reset: () => set({ meta: initialMovieMeta }),
}))

export const useMovieListStore = create<MovieListStore>((set) => ({
    movies: initialMovieListPagnation,
    updateMovies: (newMovies: MovieListPagnation) => {
        set({ movies: newMovies })
    },
    reset: () => set({ movies: initialMovieListPagnation }),
}))
