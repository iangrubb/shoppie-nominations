import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionHeading, MovieList, Button, Info } from '../styles/components'
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

    const totalPages = Math.ceil(totalResults / 10)


    // Conditional Rendering Logic

    const exterior = contents => (
        <PageSection gridArea="search-results">
            <SectionHeading>Search Results</SectionHeading>
            {contents}
        </PageSection>
    )

    if (searchTerm === "") {
        return exterior(
            <Info>Submit a search to view potential nominations</Info>
        )
    }

    if (error) {
        return exterior(
            <Info>{errorMessage(error, searchTerm)}</Info>
        )
    }

    return exterior(
            <>
            <Info>showing results for "{searchTerm}"</Info>
            <Pagination>
                <Button
                    disabled={page === 1}
                    onClick={()=>updateSearchResults(searchTerm, page - 1)}
                >{"<"}</Button>
                <PageCounter>page {page} of {totalPages}</PageCounter>
                <Button
                    disabled={page === totalPages}
                    onClick={()=>updateSearchResults(searchTerm, page + 1)}
                >{">"}</Button>
            </Pagination>
            <MovieList>
                {results[page].map( movie => {
                    const movieNominated = !!nominations.find(nom => nom.id === movie.id)
                    return (
                    <ListedMovie
                        key={movie.id}
                        disable={nominations.length >= 5 || movieNominated}
                        highlight={movieNominated}
                        {...movie}
                        buttonLabel="Nominate"
                        clickHandler={()=>addNomination(movie)}
                    />)
                    }
                )}
            </MovieList>
            </>
        )
}

export default SearchResults

const Pagination = styled.div`
    width: 100%;
    margin: 0 0 8px 0;
    display: flex;
    justify-content: center;
    align-items: baseline;
`

const PageCounter = styled.span`
    font-style: italic;
    margin: 0 8px;
`
