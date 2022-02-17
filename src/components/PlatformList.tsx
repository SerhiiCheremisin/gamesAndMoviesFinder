import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux/store/index';
import styled from 'styled-components';
import { singleGame } from '../types/index';
import { setChosenGame } from '../redux/store/slices/gamesSlice';

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
`
const ListItem = styled.div`
    display: flex;
    background-color: gray;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    cursor: pointer;
    border-radius: 15px;
    padding: 5px 15px;
    transition: all .5s ease;
    
    &:hover{
     background-color: bisque;
    }
`
const IMG = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
`
const Title = styled.span`
    display: flex;
    font-weight: bold;
`

const PlatformList = () => {

const [platformList, setPlatformList] = useState<singleGame[]>([])   

const activePlatform = useSelector((state:RootState) => state.games.activePlatform);
const gameList = useSelector((state:RootState) => state.games.gamesList);

const dispatch = useDispatch();

useEffect(() => {
  const listCopy = gameList.filter(game => game.platform === activePlatform);
  setPlatformList(listCopy)
},[activePlatform])

const itemHandler = (title:string):void => {
    const filteredArr = gameList.filter(game => game.title === title)
    dispatch(setChosenGame(filteredArr[0]))
}

  return (
    <ListWrapper>
       {platformList.map((el) => {
           return(
               <>
                <ListItem onClick={() => itemHandler(el.title)} key={el.id}>
                 <Title>{el.title}</Title>
                <IMG src={el.thumbnail} alt="" />
                </ListItem>
               </>
           )
       })}

    </ListWrapper>
  )
}

export default PlatformList;
