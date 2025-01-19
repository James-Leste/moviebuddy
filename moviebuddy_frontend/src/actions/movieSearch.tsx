/** @format */

import { queryMovies, getMovieById } from '@/services/query_movies'
import { MovieListPagnation, MovieModel } from '@/types'
import { useMovieInfoStore, useMovieListStore } from '@/hooks/MovieInfoStore'

async function getMovieInfo(id: string) {
    const data = await getMovieById(id)
    let resultMovie: MovieModel
    if (data.success === false) {
        console.log('No movie found')
        useMovieInfoStore.setState(useMovieInfoStore.getInitialState())
        return
    } else {
        resultMovie = {
            id: data.id,
            title: data.title,
            overview: data.overview,
            image: data.poster_path,
            popularity: data.popularity,
        }
    }
    console.log(data)

    useMovieInfoStore.setState({ meta: resultMovie })
    return resultMovie
}

async function getMovieList(name: string, page: number = 1) {
    const data = await queryMovies(name, page)
    if (data.results.length === 0) {
        console.log('No movie found')
        useMovieListStore.setState(useMovieListStore.getInitialState())
        return
    }
    const results: any[] = data.results
    const resultMovieList: MovieListPagnation = {
        pageNumber: data.page,
        totalPages: data.total_pages,
        movieList: results.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                image: movie.poster_path,
                popularity: movie.popularity,
            }
        }),
    }
    useMovieListStore.setState({ movies: resultMovieList })
    return resultMovieList
}

export { getMovieInfo, getMovieList }
