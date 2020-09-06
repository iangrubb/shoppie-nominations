import React from 'react'
import styled from 'styled-components'

import { PageSection } from '../styles/components'
import ListedMovie from './listedMovie'

const SearchResults = ({ searchInfo: { searchTerm, results } }) => {
    return (
        <PageSection gridArea="search-results">
            {searchTerm && <h4>Results for "{searchTerm}"</h4>}
            <ul>
                {results.map( movie => <ListedMovie key={movie.id} {...movie} buttonLabel="Nominate" clickHandler={()=>console.log("test")} />)}
            </ul>
        </PageSection>
    )
}

export default SearchResults
