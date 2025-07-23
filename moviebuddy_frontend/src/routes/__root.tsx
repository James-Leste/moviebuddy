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
            <div className='flex flex-col h-screen w-screen'>
                <div>
                    <Navbar shouldHideOnScroll maxWidth='full'>
                        <NavbarBrand>
                            <p className='font-bold text-inherit'>
                                Movie Buddy V0.1
                            </p>
                        </NavbarBrand>
                        <NavbarContent
                            className='hidden sm:flex gap-12'
                            justify='center'
                        >
                            <NavbarItem>
                                <Link color='foreground' href='/'>
                                    Me
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link color='foreground' href='/movieList'>
                                    Explore
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link color='foreground' href='/auth/login'>
                                    Authentication
                                </Link>
                            </NavbarItem>
                        </NavbarContent>
                        {!user ? (
                            <NavbarContent justify='end'>
                                <NavbarItem className='hidden lg:flex'>
                                    <Link color='foreground' href='/auth/login'>
                                        Login
                                    </Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button
                                        as={Link}
                                        color='primary'
                                        href='/auth/register'
                                        variant='flat'
                                    >
                                        Sign Up
                                    </Button>
                                </NavbarItem>
                            </NavbarContent>
                        ) : (
                            <NavbarContent justify='end'>
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
                                    >
                                        <LogOut />
                                        Logout
                                    </Button>
                                </NavbarItem>
                                <NavbarItem className='hidden lg:flex'>
                                    <Link color='foreground' href='/auth/login'>
                                        {user.username}
                                    </Link>
                                </NavbarItem>
                            </NavbarContent>
                        )}
                    </Navbar>
                </div>

                <div
                    className='w-screen h-full flex flex-col align-center justify-center'
                    id='outlet'
                >
                    <Outlet />
                </div>
                <TanStackRouterDevtools></TanStackRouterDevtools>
            </div>
        )
    },
})
