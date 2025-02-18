/** @format */

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from '@heroui/react'

export default function Topbar() {
    return (
        <Navbar shouldHideOnScroll maxWidth='full'>
            <NavbarBrand>
                <p className='font-bold text-inherit'>Movie Buddy V0.1</p>
            </NavbarBrand>
            <NavbarContent className='hidden sm:flex gap-4' justify='center'>
                <NavbarItem>
                    <Link color='foreground' href='#'>
                        placeholder #1
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current='page' href='#'>
                        placeholder #2
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color='foreground' href='#'>
                        placeholder #3
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color='foreground' href='#'>
                        placeholder #4
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <NavbarItem className='hidden lg:flex'>
                    <Link href='#'>Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color='primary' href='#' variant='flat'>
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
