import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

const CompletionBanner = ({ nominations }) => {
    const searchURL = "?" + nominations.map(nom => nom.id).join("&")
    return (
        <Container>
            <h4>You've nominated 5 movies!</h4>
            <Link to={{
                pathname: "/submission",
                search: searchURL
            }}>Submit Nominations</Link>
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
