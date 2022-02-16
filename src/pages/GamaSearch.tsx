import React, {useState, useEffect} from 'react';
import { fetchGamesList, setPlatrorm, setChosenGame } from '../redux/store/slices/gamesSlice';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux/store/index';
import styled from 'styled-components';

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

const GameSelf = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

`
const Poster = styled.img`
    
`
const GameItem = styled.div`
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
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
   dispatch(setChosenGame(pickedGame[0]))
   setGameChosen(true)
   setIsSearchActive(false)
   setSearchValue('')
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
           <Input value={searchValue} onChange={(e) =>setSearchValue(e.target.value) } placeholder='Type to search a game'/>
         </Form>
         <HiddenSearch>
          {hiddenRenderLogic()}
         </HiddenSearch>
         {gameChosen && 
         <GameSelf>
          <GameItem>{chosenGame.title}</GameItem>
          <Poster src={chosenGame.thumbnail}/>
          <GameItem>{`Released in ${chosenGame.release_date}`}</GameItem>
          <GameItem>{`Developed by: ${chosenGame.developer}`}</GameItem>
          <GameItem>{`Publisher is: ${chosenGame.publisher}`}</GameItem>
          <GameItem>{`Genre is: ${chosenGame.genre}`}</GameItem>
          <GameItem>{`URL: ${chosenGame.game_url}`}</GameItem>
         </GameSelf>
         }
      </GameWrapper>

  )
}

export default GamaSearch;