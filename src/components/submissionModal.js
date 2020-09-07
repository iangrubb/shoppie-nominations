import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

import { fetchMovieById, extractMovieData } from '../logic/OMDBCommunication'

import { MovieList, Button, Info, SectionHeading } from '../styles/components'
import ListedMovie from './listedMovie'

const SubmissionModal = ({nominations, setNominations}) => {

    // Search Term Validation Logic

    const [ validationStatus, setValidationStatus ] = useState("CHECKING")

    const location = useLocation()

    useEffect(()=> {
        const searchTerm = location.search
        const validSearchTerm = searchTerm.charAt(0) === "?" && searchTerm.split("&").length === 5
        const submittedSearchIds = searchTerm.substring(1).split("&")
        const idsMatchExistingState = submittedSearchIds.every(id => nominations.find( nom => nom.id === id))
        if (!validSearchTerm) {
            setValidationStatus("INVALID")
        } else if (idsMatchExistingState) {
            setValidationStatus("VALID")
        } else {
            Promise.all(submittedSearchIds.map(id => fetchMovieById(id)))
            .then(responses => {
                if (responses.some(resp => resp.Error)) {
                    setValidationStatus("INVALID")
                } else {
                    setNominations(responses.map(extractMovieData))
                    setValidationStatus("VALID")
                }
            })
        }

    }, [])


    // Navigation Logic

    const history = useHistory()

    const resetNominations = () => {
        setNominations([])
        history.push("/")
    }

    const reviseNominations = () => history.push("/")


    // Conditional Rendering Logic

    if (validationStatus === "CHECKING") {
        return (
            <PageCover>
                <Container>
                    <Info>Loading Submissions...</Info>
                </Container>
            </PageCover>
        )
    }

    if (validationStatus === "INVALID") {
        return (
            <PageCover>
                <Container>
                    <Info>Sorry, something went wrong with this request</Info>
                    <Button onClick={resetNominations}>New Nominations</Button>
                </Container>
            </PageCover>
        )
    }

    return (
        <PageCover>
            <Container>
            <SectionHeading>Nominations</SectionHeading>
            <MovieList>
                {nominations.map( movie =>
                    <ListedMovie key={movie.id} {...movie} />
                )}
            </MovieList>
            <ButtonRow>
                <Button onClick={reviseNominations}>Revise</Button>
                <Button onClick={resetNominations}>Start Over</Button>
            </ButtonRow>
            </Container>
        </PageCover>
    )
}

export default SubmissionModal

const PageCover = styled.div`
    position: fixed;
    z-index: 3;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #555555ee;

    display: grid;
    place-items: center;
`

const Container = styled.aside`
    background: var(--card-color);
    border-radius: 4px;

    padding: 24px;


    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonRow = styled.div`
    display: flex;
    margin: 8px 0 0 0;
    
`