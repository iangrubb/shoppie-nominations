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
      // On an empty search, reset searchInfo
      setSearchInfo(defaultSearch)
    } else if (searchTerm === searchInfo.searchTerm && !!searchInfo.results[page]) {
      // On a search to a previously seen page of the current searchTerm, load cached data
      setSearchInfo({...searchInfo, page })
    } else {
      // For a new searchTerm or a new page on the old searchTerm, fetch more data
      fetchMoviesByTitle(searchTerm, page)
      .then(data => {
        if (data.Error) {
          // Display an error message if the fetched data contains an error
          setSearchInfo({ searchTerm, results: {}, error: data.Error, page: 1, totalResults: 0 })
        } else {
          // Add new page data to old results if the searchTerm is the same
          // Reset the results if the searchTerm is new
          const baseResults = searchTerm === searchInfo.searchTerm ? {...searchInfo.results} : {}
          const fetchedMovies = data.Search.map(extractMovieData)
          baseResults[page] = fetchedMovies
          setSearchInfo({ searchTerm, results: baseResults, error: null, page, totalResults: data.totalResults })
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
      <CompletionBanner nominations={nominations} show={nominationsComplete} />

      <Route path="/submission" render={() =>
        <SubmissionModal nominations={nominations} setNominations={setNominations} />
      } />
  
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

  margin: 64px auto;
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

  transform: translateY(${props => props.nominationsComplete ? "var(--banner-height)" : "0"});
  transition: transform 0.2s ease;

  @media (min-width: 650px) {
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


