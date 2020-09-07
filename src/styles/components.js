import styled from 'styled-components'

export const PageSection = styled.section`

    grid-area: ${props => props.gridArea};

    width: 100%;
    padding: 8px;

    background: var(--card-color);
    border: var(--border);
    border-radius: 2px;

    display: flex;
    flex-direction: column;
    align-items: center;

`