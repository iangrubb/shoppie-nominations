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

    const { searchInfo: { searchTerm, results, error }, addNomination, nominations } = props

    const determineContents = () => {
        if (searchTerm === "") {
            return <h4>Submit a search to view potential nominations</h4>
        } else if (error) {
            return <h4>{errorMessage(error, searchTerm)}</h4>
        } else {
            return (
                <>
                {searchTerm ? <h4>Results for "{searchTerm}"</h4> : null}
                <ul>
                    {results.map( movie => 
                        <ListedMovie
                            key={movie.id}
                            disable={nominations.length >= 5 || !!nominations.find(nom => nom.id === movie.id)}
                            {...movie}
                            buttonLabel="Nominate"
                            clickHandler={()=>addNomination(movie)}
                        />
                    )}
                </ul>
                </>
            )
        }
    }

    return (
        <PageSection gridArea="search-results">
            {determineContents()}
        </PageSection>
    )
}

export default SearchResults
