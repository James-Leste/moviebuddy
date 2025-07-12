/** @format */

import { createFileRoute } from '@tanstack/react-router'
import MovieList from '@/views/MovieList'

export const Route = createFileRoute('/MovieListRoute')({
    component: Index,
})

function Index() {
    return (
        <>
            <MovieList></MovieList>
        </>
    )
}
