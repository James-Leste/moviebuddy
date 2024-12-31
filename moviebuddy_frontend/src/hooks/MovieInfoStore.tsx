/** @format */

import { create } from 'zustand'
import { MovieModel } from '@/types'

interface MovieInfoStore {
    meta: MovieModel
    updateMeta: (newMeta: MovieModel) => void
}

interface MovieListStore {
    movies: MovieModel[]
    updateMovies: (newMovies: MovieModel[]) => void
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
    movies: [],
    updateMovies: (newMovies: MovieModel[]) => {
        set({ movies: newMovies })
    },
}))
