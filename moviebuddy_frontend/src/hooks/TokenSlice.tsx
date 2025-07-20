/** @format */

import { StateCreator } from 'zustand'

export interface TokenSlice {
    token: string | null
    setToken: (token: string | null) => void
    resetToken: () => void
}

export const initialTokenState: string = ''
export const createTokenSlice: StateCreator<TokenSlice> = (set) => ({
    token: initialTokenState,
    setToken: (token: string | null) => {
        set({ token })
    },
    resetToken: () => set({ token: initialTokenState }),
})
