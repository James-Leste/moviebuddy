/** @format */

import { StateCreator } from 'zustand'
import { UserPublicSafe } from '@/types'

export interface UserSlice {
    user: UserPublicSafe | null
    setUser: (user: UserPublicSafe | null) => void
    resetUser: () => void
}

export const initialUserState: UserPublicSafe | null = null
export const createUserSlice: StateCreator<UserSlice> = (set) => ({
    user: initialUserState,
    setUser: (user: UserPublicSafe | null) => {
        set({ user })
    },
    resetUser: () => set({ user: initialUserState }),
})
