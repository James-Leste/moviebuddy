/** @format */

import { StateCreator } from 'zustand'
import { User } from '@/types'

export interface UserSlice {
    user: User | null
    setUser: (user: User | null) => void
    resetUser: () => void
}

export const initialUserState: User | null = null
export const createUserSlice: StateCreator<UserSlice> = (set) => ({
    user: initialUserState,
    setUser: (user: User | null) => {
        set({ user })
    },
    resetUser: () => set({ user: initialUserState }),
})
