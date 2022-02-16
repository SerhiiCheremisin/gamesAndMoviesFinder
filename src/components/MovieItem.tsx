import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/index';
import styled from 'styled-components';


const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
`
const ItemItself = styled.div`
    font-size: 30px;
    font-weight: bold;
`

const MovieItem = () =>  {
  const movie = useSelector((state:RootState) => state.movie.foundMovie);
  return (
    <ItemWrapper>
        <ItemItself>{movie.Title}</ItemItself>
        <ItemItself>{`Released in : ${movie.Released}`}</ItemItself>
        <ItemItself>{`Starring : ${movie.Actors}`}</ItemItself>
        <ItemItself>{`Director : ${movie.Director}`}</ItemItself>
        <ItemItself>{`Awards : ${movie.Awards}`}</ItemItself>
        <ItemItself><img src={movie.Poster} alt={`${movie.Title} poster`} /></ItemItself>
        <ItemItself>{`Type : ${movie.Type}`}</ItemItself>
    </ItemWrapper>
  )
}


export default MovieItem;