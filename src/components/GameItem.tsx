import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux/store/index';
import styled from 'styled-components';

const GameSelf = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

`
const Poster = styled.img`
    width: 100%;
`
const GameItemSelf = styled.div`
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
`


const GameItem = () => {
 const chosenGame = useSelector((state:RootState) => state.games.chosenGame);


  return (
         <GameSelf>
          <GameItemSelf>{chosenGame.title}</GameItemSelf>
          <Poster src={chosenGame.thumbnail}/>
          <GameItemSelf>{`Released in ${chosenGame.release_date}`}</GameItemSelf>
          <GameItemSelf>{`Developed by: ${chosenGame.developer}`}</GameItemSelf>
          <GameItemSelf>{`Publisher is: ${chosenGame.publisher}`}</GameItemSelf>
          <GameItemSelf>{`Genre is: ${chosenGame.genre}`}</GameItemSelf>
          <GameItemSelf>{`URL: ${chosenGame.game_url}`}</GameItemSelf>
         </GameSelf>
  )
}

export default GameItem;
