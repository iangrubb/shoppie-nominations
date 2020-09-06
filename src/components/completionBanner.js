import React from 'react'
import styled from 'styled-components'

const CompletionBanner = () => {
    return (
        <Container>
            <h4>You've nominated 5 movies!</h4>
        </Container>
    )
}

export default CompletionBanner

const Container = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--banner-height);

    background: var(--notification-color);
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
`
