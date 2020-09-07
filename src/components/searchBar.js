import React, { useState } from 'react'
import styled from 'styled-components'

import { PageSection } from '../styles/components'

const SearchBar = ({ updateSearchResults }) => {

    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        updateSearchResults(searchTerm)
        setSearchTerm("")
    }

    return (
        <PageSection gridArea="search-bar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="movie-search">Movie title</label>
                <input id="movie-search" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
            </form>
        </PageSection>
    )
}

export default SearchBar
