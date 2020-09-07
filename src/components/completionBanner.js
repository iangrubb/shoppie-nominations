import React from 'react'
import styled from 'styled-components'

import { useHistory } from 'react-router-dom'

import { Button } from '../styles/components'

const CompletionBanner = ({ nominations }) => {

    const history = useHistory()
    const searchURL = "?" + nominations.map(nom => nom.id).join("&")
    const confirmSubmissions = () => history.push(`/submission${searchURL}` )

    return (
        <Container>
            <Announcement>You've nominated 5 movies!</Announcement>
            <Button light onClick={confirmSubmissions}>Submit Nominations</Button>
        </Container>
    )
}

export default CompletionBanner

const Container = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: var(--banner-height);

    background: var(--notification-color);
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Announcement = styled.h3`
    margin: 0 16px 0 0;
    font-size: 20px;
`
