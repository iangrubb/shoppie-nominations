import React from 'react'

const ListedMovie = ({title, year, buttonLabel, clickHandler}) => {
    return (
        <li>{title} ({year}) <button onClick={clickHandler}>{buttonLabel}</button> </li>
    )
}

export default ListedMovie
