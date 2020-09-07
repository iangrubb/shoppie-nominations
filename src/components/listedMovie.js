import React from 'react'
import styled from 'styled-components'

import { Button } from '../styles/components'

const ListedMovie = ({title, year, buttonLabel, clickHandler, disable, highlight}) => (
    <Container highlight={highlight}>
        <Dot>•</Dot>
        <Text>{title} ({year})</Text>
        {clickHandler ? <Button onClick={clickHandler} disabled={disable}>{buttonLabel}</Button>: null }
    </Container>
)

export default ListedMovie


// ADD ABSOLUTE DOT BEFORE

const Container = styled.li`

    position: relative;

    padding: 6px 0 6px 8px;
    

    display: flex;
    justify-content: space-between;
    align-items: center;

`

const Dot = styled.span`
    position: absolute;
    left: -6px;
    top: calc(50% - 0.05rem);
    transform: translateY(-50%);

    font-size: 1.4rem;

`

const Text = styled.span`

    margin: 0 8px 0 0;

`
