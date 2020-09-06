import React from 'react'
import styled from 'styled-components'

import { PageSection } from '../styles/components'

const SearchResults = ({ searchInfo: { searchTerm, results } }) => {
    return (
        <PageSection gridArea="search-results">
            {searchTerm && <h4>Results for "{searchTerm}"</h4>}
            {results.map( movie => {
                return <li key={movie.id}>{movie.title} ({movie.year})</li>
            })}
        </PageSection>
    )
}

export default SearchResults
