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
            <SearchForm onSubmit={handleSubmit}>
                <label htmlFor="movie-search">Movie title</label>
                <input id="movie-search" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
            </SearchForm>
        </PageSection>
    )
}

export default SearchBar

const SearchForm = styled.form`
    display: flex;
    flex-direction: column;

    width: 100%;

    & > label {
        margin: 0 0 8px 0;
        font-weight: 700;
        font-size: 15px;
    }

    & > input[type=text] {
        padding: 8px;
        font-size: 16px;
        background: var(--card-color);

        border: 1px solid #A9AAB2;
        border-radius: 4px;
    }
`
