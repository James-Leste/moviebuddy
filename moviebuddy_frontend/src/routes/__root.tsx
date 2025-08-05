/** @format */

import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from '@heroui/react'
import Cookies from 'js-cookie'
import { useCustomStore } from '@/hooks/store'
import { getUser } from '@/services/auth'
import { LogOut } from 'lucide-react'

export const Route = createRootRoute({
    loader: async () => {
        console.log('Preloading user data...')
        const store = useCustomStore.getState()

        if (store.user) {
            console.log('User already loaded:', store.user)
            return
        }

        if (!store.token || !store.user) {
            const token = Cookies.get('token')

            if (token) {
                store.setToken(token)

                try {
                    const user = await getUser()
                    console.log('Preloaded user:', user)
                    store.setUser(user)
                } catch (err) {
                    console.error('Failed to preload user', err)
                    Cookies.remove('token')
                    store.reset()
                }
            }
        }
    },
    component: () => {
        const user = useCustomStore((state) => state.user)
        const reset = useCustomStore((state) => state.reset)
        const router = useRouter()
        return (
            <div className='flex flex-col h-screen w-screen overflow-hidden'>
                <div>
                    <Navbar
                        shouldHideOnScroll
                        maxWidth='full'
                        className='shadow-sm bg-white/80 backdrop-blur-md border-b border-gray-100'
                    >
                        <NavbarBrand className='flex items-center gap-2'>
                            <img
                                src='/movie_logo.svg'
                                alt='Logo'
                                className='h-8 w-8'
                            />
                            <span className='font-bold text-lg text-gray-800 tracking-tight'>
                                Movie Buddy
                            </span>
                            <span className='ml-2 text-xs text-gray-400 font-medium'>
                                v0.1
                            </span>
                        </NavbarBrand>
                        <NavbarContent
                            className='hidden sm:flex gap-8'
                            justify='center'
                        >
                            <NavbarItem>
                                <Link
                                    color='foreground'
                                    href='/movieList'
                                    className='font-medium text-gray-700 hover:text-blue-600 transition'
                                >
                                    Explore
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link
                                    color='foreground'
                                    href='/user/personal'
                                    className='font-medium text-gray-700 hover:text-blue-600 transition'
                                >
                                    Me
                                </Link>
                            </NavbarItem>
                        </NavbarContent>
                        <NavbarContent justify='end' className='gap-4'>
                            {!user ? (
                                <>
                                    <NavbarItem className='hidden lg:flex'>
                                        <Link
                                            color='foreground'
                                            href='/auth/login'
                                            className='font-medium text-gray-700 hover:text-blue-600 transition'
                                        >
                                            Login
                                        </Link>
                                    </NavbarItem>
                                    <NavbarItem>
                                        <Button
                                            as={Link}
                                            color='primary'
                                            href='/auth/register'
                                            variant='flat'
                                            className='font-semibold px-4'
                                        >
                                            Sign Up
                                        </Button>
                                    </NavbarItem>
                                </>
                            ) : (
                                <>
                                    <NavbarItem className='flex items-center gap-2'>
                                        <Link
                                            color='foreground'
                                            href='/user/personal'
                                            className='flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition'
                                        >
                                            <img
                                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.username)}`}
                                                alt='Avatar'
                                                className='h-7 w-7 rounded-full border border-gray-200 shadow-sm bg-gray-100'
                                            />
                                            {user.username}
                                        </Link>
                                    </NavbarItem>
                                    <NavbarItem>
                                        <Button
                                            as={Link}
                                            color='primary'
                                            variant='ghost'
                                            onPress={() => {
                                                Cookies.remove('token')
                                                reset()
                                                router.navigate({
                                                    to: '/movieList',
                                                })
                                            }}
                                            className='flex items-center gap-2 font-medium px-3'
                                        >
                                            <LogOut className='h-5 w-5 mr-1' />
                                            Logout
                                        </Button>
                                    </NavbarItem>
                                </>
                            )}
                        </NavbarContent>
                    </Navbar>
                </div>

                <div className='w-screen flex-1 overflow-auto' id='outlet'>
                    <Outlet />
                </div>
                <TanStackRouterDevtools />
            </div>
        )
    },
})
