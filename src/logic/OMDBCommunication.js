
const key = process.env.REACT_APP_OMDB_KEY
const baseURL = `https://www.omdbapi.com/?apikey=${key}`

const baseFetch = term => {
    return fetch(`${baseURL}&${term}`).then(resp => resp.json())
}

export const fetchMoviesByTitle = (searchTerm, page = 1) => {
    const term = `s=${searchTerm}&type=movie&page=${page}`
    return baseFetch(term)
}

export const fetchMovieById = omdbId => {
    const term = `i=${omdbId}`
    return baseFetch(term)
}

export const extractMovieData = movieResult => {
    const id = movieResult.imdbID
    const title = movieResult.Title
    const year = movieResult.Year
    return { id, year, title }
}