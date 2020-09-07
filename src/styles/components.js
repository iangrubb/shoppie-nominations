import styled from 'styled-components'

export const PageSection = styled.section`

    grid-area: ${props => props.gridArea};

    width: 100%;
    padding: 24px;

    height: fit-content;

    background: var(--card-color);
    box-shadow: 0 0 1px 1px #aaaaaa55;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
    align-items: center;

`

export const SectionHeading = styled.h3`
    margin: 0 0 8px 0;
`

export const MovieList = styled.ul`
    margin: 0;
    padding: 0;
    width: 100%;
`

export const Info = styled.span`
    font-style: italic;
    margin: 0 0 8px 0;
`

export const Button = styled.button`

    background: ${props => props.light ? "var(--background-color)" : "var(--notification-color)" };
    
    border: none;

    margin: 2px;

    width: fit-content;
    padding: 4px 8px;
    border-radius: 4px;
    
    font-size: 15px;
    color: ${props => props.light ? "var(--text-color)" : "white" };

    cursor: pointer;

    &:disabled {
        background: rgb(119, 119, 129);
        cursor: auto;
    }
    

`