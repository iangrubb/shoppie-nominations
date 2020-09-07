import React, { useState } from 'react';
import styled from 'styled-components'

import { fetchMoviesByTitle, extractMovieData } from './logic/OMDBCommunication'

import { Route } from 'react-router-dom'

import SearchBar from './components/searchBar'
import SearchResults from './components/searchResults'
import NominationsList from './components/nominationsList'
import CompletionBanner from './components/completionBanner'
import SubmissionModal from './components/submissionModal'


function App() {

  // Movie Search Logic

  const defaultSearch = {searchTerm: "", results: {}, error: null, page: 1, totalResults: 0}

  const [searchInfo, setSearchInfo] = useState(defaultSearch)

  const updateSearchResults = (searchTerm, page = 1) => {
    if (searchTerm === "") {
      // Resets the search results field on empty search
      setSearchInfo(defaultSearch)
    } else if (searchTerm === searchInfo.searchTerm && !!searchInfo.results[page]) {
      // Skip fetch when local data is available, just update the current page
      setSearchInfo({...searchInfo, page })
    } else {
      // Fetches data when needed.
      console.log("ABOUT TO FETCH")
      fetchMoviesByTitle(searchTerm, page)
      .then(data => {
        if (data.Error) {
          setSearchInfo({ searchTerm, results: {}, error: data.Error, page: 1, totalResults: 0 })
        } else {
          // Reset results for a new search term, but add to it for an old one
          const fetchedMovies = data.Search.map(extractMovieData)
          const results = searchTerm === searchInfo.searchTerm ? {...searchInfo.results} : {}
          results[page] = fetchedMovies
          setSearchInfo({ searchTerm, results, error: null, page, totalResults: data.totalResults })
        }
      })
    }
  }


  // Movie Nomination Logic

  const [nominations, setNominations] = useState([])
  const nominationsComplete = nominations.length >= 5

  const addNomination = movie => {
    if (!nominationsComplete) {
      setNominations([...nominations, movie])
    }
  }

  const removeNomination = id => {
    setNominations(nominations.filter(nom => nom.id !== id))
  }

  
  
  return (
    <>
      {nominationsComplete ? <CompletionBanner nominations={nominations} /> : null}

      <Route path="/submission" render={()=><SubmissionModal nominations={nominations} setNominations={setNominations} />} />
  
      <Page nominationsComplete={nominationsComplete}>
        <Title>The Shoppies</Title>
        <SearchBar updateSearchResults={updateSearchResults} />
        <SearchResults searchInfo={searchInfo} addNomination={addNomination} nominations={nominations} updateSearchResults={updateSearchResults}/>
        <NominationsList nominations={nominations} removeNomination={removeNomination} />
      </Page>
    </>
  );
}

export default App;

const Title = styled.h1`
  grid-area: title;
  margin: 0;
`

const Page = styled.main`

  margin: calc( ${props => props.nominationsComplete ? "var(--banner-height)" : "0px"} + 64px ) auto 0 auto;
  width: 96vw;
  max-width: 1000px;

  display: grid;
  gap: 8px;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "nominations-list"
    "search-bar"
    "search-results"
  ;

  @media (min-width: 600px) {
    gap: 16px;
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title ."
      "search-bar search-bar"
      "search-results nominations-list"
    ;
  }

`


