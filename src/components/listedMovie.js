import React from 'react'

const ListedMovie = ({title, year, buttonLabel, clickHandler, disable}) => (
    <li>{title} ({year}) {clickHandler ? <button onClick={clickHandler} disabled={disable}>{buttonLabel}</button>: null }</li>
)


export default ListedMovie
