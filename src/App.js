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

  const defaultSearch = {searchTerm: "", results: [], error: null}

  const [searchInfo, setSearchInfo] = useState(defaultSearch)

  const fetchThenSetResults = searchTerm => {

    if (searchTerm === "") {
      setSearchInfo(defaultSearch)
    } else {
      fetchMoviesByTitle(searchTerm)
      .then(data => {
        if (data.Error) {
          setSearchInfo({ searchTerm, results: [], error: data.Error })
        } else {
          const results = data.Search.map(extractMovieData)
          setSearchInfo({ searchTerm, results, error: null })
        }
      })
    }

  }

  const [nominations, setNominations] = useState([])

  const addNomination = movie => {
    if (nominations.length < 5) {
      setNominations([...nominations, movie])
    }
  }

  const removeNomination = id => {
    setNominations(nominations.filter(nom => nom.id !== id))
  }

  const nominationsComplete = nominations.length >= 5


  
  return (
    <>
      {nominationsComplete ? <CompletionBanner nominations={nominations} /> : null}
      <Route path="/submission" render={()=><SubmissionModal nominations={nominations} setNominations={setNominations} />} />
  
      <Page nominationsComplete={nominationsComplete}>
        <SearchBar fetchThenSetResults={fetchThenSetResults} />
        <SearchResults searchInfo={searchInfo} addNomination={addNomination} nominations={nominations} />
        <NominationsList nominations={nominations} removeNomination={removeNomination} />
      </Page>
    </>
  );
}

export default App;

const Page = styled.main`

  margin: calc( ${props => props.nominationsComplete ? "var(--banner-height)" : "0px"} + 64px ) auto 0 auto;
  width: 96vw;
  max-width: 1000px;

  display: grid;
  gap: 16px;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "search-bar search-bar"
    "search-results nominations-list"
  ;

`


