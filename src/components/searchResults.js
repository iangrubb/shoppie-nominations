import React from 'react'
import styled from 'styled-components'

import { PageSection } from '../styles/components'
import ListedMovie from './listedMovie'


const errorMessage = (error, searchTerm) => {
    switch(error) {
        case "Too many results.":
            return `Sorry, "${searchTerm}" has too many results. You'll need to use a more specific search`
        case "Movie not found!":
            return `Sorry, nothing matches "${searchTerm}", please choose a different search`
        default:
            return `Sorry, the search for "${searchTerm}" produced an unknown error`
    }
}

const SearchResults = props => {

    const { searchInfo: { searchTerm, results, error, page, totalResults }, addNomination, nominations, updateSearchResults } = props

    if (searchTerm === "") {
        return (
            <PageSection gridArea="search-results">
                <h4>Submit a search to view potential nominations</h4>
            </PageSection>
        )
    }

    if (error) {
        return (
            <PageSection gridArea="search-results">
                <h4>{errorMessage(error, searchTerm)}</h4>
            </PageSection>
        )
    }

    const totalPages = Math.ceil(totalResults / 10)

    return (
        <PageSection gridArea="search-results">
            <h4>Results for "{searchTerm}"</h4>
            <div>
                <button
                    disabled={page === 1}
                    onClick={()=>updateSearchResults(searchTerm, page - 1)}
                >-</button>
                <span>page {page} of {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={()=>updateSearchResults(searchTerm, page + 1)}
                >+</button>
            </div>
            <ul>
                {results[page].map( movie => 
                    <ListedMovie
                        key={movie.id}
                        disable={nominations.length >= 5 || !!nominations.find(nom => nom.id === movie.id)}
                        {...movie}
                        buttonLabel="Nominate"
                        clickHandler={()=>addNomination(movie)}
                    />
                )}
            </ul>
        </PageSection>
    )
            
}

export default SearchResults
