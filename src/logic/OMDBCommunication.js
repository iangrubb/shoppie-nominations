
const key = process.env.REACT_APP_OMDB_KEY
const baseURL = `http://www.omdbapi.com/?apikey=${key}`

const baseFetch = term => {
    const thing = fetch(`${baseURL}&${term}`).then(resp => resp.json())
    console.log(thing)
    return thing
}

export const searchMoviesByTitle = (searchTerm, callback) => {
    const term = `s=${searchTerm}`
    baseFetch(term).then(callback)
}

export const findMovieById = (omdbId, callback) => {
    const term = `i=${omdbId}`
    baseFetch(term).then(callback)
}