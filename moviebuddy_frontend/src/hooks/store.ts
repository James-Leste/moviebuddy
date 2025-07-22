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
import { createUserSlice, initialUserState, UserSlice } from './UserSlice'
import Cookies from 'js-cookie'

const initialState = {
    token: '',
    meta: initialMovieInfo,
    movies: initialMovieListPagnation,
    user: initialUserState,
}

type CustomStore = TokenSlice &
    MovieInfoSlice &
    MovieListSlice &
    UserSlice & { reset: () => void }

export const useCustomStore = create<CustomStore>()((set, get, store) => ({
    ...createTokenSlice(set, get, store),
    ...createMovieInfoSlice(set, get, store),
    ...createMovieListSlice(set, get, store),
    ...createUserSlice(set, get, store),
    reset: () => {
        set(() => ({ ...initialState }))
        Cookies.remove('token')
    },
}))
