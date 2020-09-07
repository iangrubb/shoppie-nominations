import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionHeading, MovieList, Info } from '../styles/components'
import ListedMovie from './listedMovie'

const NominationsList = ({ nominations, removeNomination }) => {
    return (
        <PageSection gridArea="nominations-list">
            <SectionHeading>Nominations</SectionHeading>
            {nominations.length === 0 ?
            <Info>You haven't added any nominations</Info> :  
            <MovieList>
                {nominations.map( movie => 
                    <ListedMovie
                        key={movie.id}
                        {...movie}
                        buttonLabel="Remove"
                        clickHandler={()=>removeNomination(movie.id)}
                    />
                )}
            </MovieList>
            }
        </PageSection>
    )
}

export default NominationsList
