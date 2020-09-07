import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { fetchMovieById, extractMovieData } from '../logic/OMDBCommunication'

import { useHistory, useLocation } from 'react-router-dom'

import ListedMovie from './listedMovie'

const SubmissionModal = ({nominations, setNominations}) => {

    // Logic for validating against search terms and ensuring the corresponding nomination state

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
                    setNominations(responses.map(resp => extractMovieData(resp)))
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

    const renderNominationList = () => (
        <>
        <h2>Nominations</h2>
        <ul>
            {nominations.map( movie =>
                <ListedMovie key={movie.id} {...movie} />
            )}
        </ul>
        <button onClick={reviseNominations}>Revise</button>
        <button onClick={resetNominations}>Start Over</button>
        </>
    )

    const renderLoading = () => (
        <div>Loading...</div>
    )

    const renderError = () => (
        <>
            <h2>Sorry, something went wrong with this request</h2>
            <button onClick={resetNominations}>New Nominations</button>
        </>
        
    )

    const determineRender = () => {
        switch(validationStatus){
            case "CHECKING":
                return renderLoading()
            case "VALID":
                return renderNominationList()
            case "INVALID":
                return renderError()
            default:
                return <div></div>
        }

    }

    return (
        <PageCover>
            <Container>
                {determineRender()}
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

    padding: 16px;

    display: flex;
    flex-direction: column;
`