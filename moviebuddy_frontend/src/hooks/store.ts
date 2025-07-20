/** @format */

import { create } from 'zustand'
import {
    MovieInfoSlice,
    MovieListSlice,
    createMovieInfoSlice,
    createMovieListSlice,
    initialMovieInfo,
    initialMovieListPagnation,
} from './MovieSlice'
import { TokenSlice, createTokenSlice } from './TokenSlice'
import { MovieListPagnation, MovieModel } from '@/types'

export const useCustomStore = create<
    TokenSlice & MovieInfoSlice & MovieListSlice
>()((...a) => ({
    ...createTokenSlice(...a),
    ...createMovieInfoSlice(...a),
    ...createMovieListSlice(...a),
    setToken: (token: string | null) => {
        useCustomStore.setState({ token })
    },
    setMoiveInfo: (newMeta: MovieModel) => {
        useCustomStore.setState({ meta: newMeta })
    },
    setMovieList: (newMovies: MovieListPagnation) => {
        useCustomStore.setState({ movies: newMovies })
    },
    reset: () => ({
        token: '',
        meta: initialMovieInfo,
        movies: initialMovieListPagnation,
    }),
}))
