import React from 'react'
import styled from 'styled-components'

import { PageSection } from '../styles/components'
import ListedMovie from './listedMovie'

const NominationsList = ({ nominations, removeNomination }) => {
    return (
        <PageSection gridArea="nominations-list">
            <h4>Your Nominations</h4>
            <ul>
                {nominations.map( movie => 
                    <ListedMovie
                        key={movie.id}
                        {...movie}
                        buttonLabel="Remove"
                        clickHandler={()=>removeNomination(movie.id)}
                    />
                )}
            </ul>
        </PageSection>
    )
}

export default NominationsList
