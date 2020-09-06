import React from 'react'
import styled from 'styled-components'

import { PageSection } from '../styles/components'
import ListedMovie from './listedMovie'

const SearchResults = ({ searchInfo: { searchTerm, results }, addNomination, nominations }) => {
    return (
        <PageSection gridArea="search-results">
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
        </PageSection>
    )
}

export default SearchResults
