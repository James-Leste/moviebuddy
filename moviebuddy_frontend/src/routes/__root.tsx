/** @format */

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from '@heroui/react'

export const Route = createRootRoute({
    component: () => (
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
                            <Link color='foreground' href='/auth'>
                                Authentication
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarContent justify='end'>
                        <NavbarItem className='hidden lg:flex'>
                            <Link color='foreground' href='/auth'>
                                Login
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color='primary'
                                href='/auth'
                                variant='flat'
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
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
    ),
})
