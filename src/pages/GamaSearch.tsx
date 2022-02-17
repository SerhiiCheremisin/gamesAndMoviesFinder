import React, {useState, useEffect} from 'react';
import { fetchGamesList, setPlatrorm, setChosenGame, setActivePlatform } from '../redux/store/slices/gamesSlice';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux/store/index';
import styled from 'styled-components';
import GameItem from '../components/GameItem';
import PlatformList from '../components/PlatformList';

const GameWrapper = styled.div`
    display: flex;
    padding: 15px 15%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.h1`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 10vh;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 40%;
`

const Input = styled.input`
    height: 50px;
    padding: 10px 15px;
`

const HiddenItem = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    background-color: gray;
    margin-bottom: 15px;
    cursor: pointer;
    align-items: center;
    gap : 25px;
`

const IMG = styled.img`
    width: 200px;
    height: 100%;
`

const ButtonGroup = styled.ul`
    display: flex;
    justify-content: center;
    gap: 10px;
`
const PlatformItem = styled.li`
    cursor: pointer;
    background-color: aqua;
    border-radius: 15px;
    padding: 5px 10px;
    transition: all .5s ease;
    &:hover{
        background-color: antiquewhite;
    }
`

const GamaSearch = ():JSX.Element => {
const dispatch = useDispatch();
const gameList = useSelector((state:RootState) => state.games.gamesList);
const gamesLoaded = useSelector((state:RootState) => state.games.isGamesListLoaded);
const platform = useSelector((state:RootState) => state.games.platformList);
const chosenGame = useSelector((state:RootState) => state.games.chosenGame);

//local state
const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
const [searchValue, setSearchValue] = useState<string>('');
const [gameChosen, setGameChosen] = useState<boolean>(false);
const [platformList, setPlatformList] = useState<boolean>(false);

const HiddenSearch = styled.div`
    display: ${isSearchActive ? 'flex' : 'none'};
    height: 600px;
    width: 100%;
    border: 1px solid black;
    flex-direction: column;
    overflow: scroll;
    overflow-X: hidden;
`

useEffect(() => {
    if (gameList.length !== 0) {
        return
    }
    dispatch(fetchGamesList())
},[])    

useEffect(() => {
  if (chosenGame.title !== ''){
    setGameChosen(true);
    setPlatformList(false);
  }
},[chosenGame])

useEffect(() => {
  if(gamesLoaded) {
      const newSet = new Set()
      const list = []
      gameList.map(el => {
        newSet.add(el.platform)
      })
      for (let value of Array.from(newSet) ){
        list.push(value)
      }
      dispatch(setPlatrorm(list))
  }
},[gamesLoaded])

useEffect(() => {
    if (searchValue === ''){
        setIsSearchActive(false)
    }
    if  (searchValue !== ''){
        setIsSearchActive(true)
    }
},[searchValue])

const choseHandler = (title:string):void => {
   const pickedGame = gameList.filter(game => game.title === title)
   dispatch(setChosenGame(pickedGame[0]));
   setGameChosen(true);
   setIsSearchActive(false);
   setSearchValue('');
   setPlatformList(false);
}

const platforHandler = (el:string):void => {
    setGameChosen(false);
    setPlatformList(true);
    dispatch(setActivePlatform(el));
}

const hiddenRenderLogic = () => {
    const filteredArr = gameList.filter(game => game.title.toLowerCase().includes(searchValue.toLowerCase()));
  if (filteredArr.length === 0){
      return(
          <h2>Nothing has found</h2>
      )
  }
    return(
        filteredArr.map(el => {
            return(
                <HiddenItem key={el.id} onClick={() => choseHandler(el.title)} >
                  <IMG src={el.thumbnail} alt="poster" />
                  {el.title}
                </HiddenItem>
            )
        })
    )
}

  return (
      <GameWrapper>
        <Title>You can search details about any Free-to-Play game</Title>
         <Form>
           <Input value={searchValue} onChange={(e) =>setSearchValue(e.target.value)} placeholder='Type to search a game'/>
           <Title>Or you can shose list by platform</Title>
           <ButtonGroup>
            {platform.map((el) => (
                  <PlatformItem onClick={() => platforHandler(el)}>{el}</PlatformItem>      
            ))}
            </ButtonGroup>   
         </Form>
         <HiddenSearch>
          {hiddenRenderLogic()}
         </HiddenSearch>
         {gameChosen && <GameItem/>}
         {platformList && <PlatformList/>}
      </GameWrapper>

  )
}

export default GamaSearch;