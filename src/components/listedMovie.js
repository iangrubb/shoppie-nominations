import React from 'react'

const ListedMovie = ({title, year, buttonLabel, clickHandler, disable}) => {
    return (
        <li>{title} ({year}) <button onClick={clickHandler} disabled={disable}>{buttonLabel}</button> </li>
    )
}

export default ListedMovie
