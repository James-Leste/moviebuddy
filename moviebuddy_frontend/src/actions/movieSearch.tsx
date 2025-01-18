/** @format */

import { queryMovies } from '@/services/query_movies'
import { MovieListPagnation, MovieModel } from '@/types'
import { useMovieInfoStore, useMovieListStore } from '@/hooks/MovieInfoStore'

async function getMovieInfo(name: string) {
    const data = await queryMovies(name)
    let resultMovie: MovieModel
    if (data.results.length === 0) {
        console.log('No movie found')
        useMovieInfoStore.setState(useMovieInfoStore.getInitialState())
        return
    } else {
        resultMovie = {
            id: data.results[0].id,
            title: data.results[0].title,
            image: data.results[0].poster_path,
            popularity: data.results[0].popularity,
        }
    }

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
        movieList: results.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                image: movie.poster_path,
                popularity: movie.popularity,
            }
        }),
    }

    useMovieListStore.setState({ movies: resultMovieList })
    return resultMovieList
}

export { getMovieInfo, getMovieList }
