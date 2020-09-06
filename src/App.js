import React from 'react';
import styled from 'styled-components'

import SearchBar from './components/searchBar'
import SearchResults from './components/searchResults'
import NominationsList from './components/nominationsList'

function App() {
  return (
    <Page>
      <SearchBar />
      <SearchResults />
      <NominationsList />
    </Page>
  );
}

export default App;

const Page = styled.main`

  margin: 64px auto 0 auto;
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


