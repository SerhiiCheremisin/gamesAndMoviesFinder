import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gamesState } from '../../../types/index';

const initState:gamesState = {
    isGamesListLoaded : false,
    gamesList : [],
    platformList: [],
    isGamesListFails: false,
    chosenGame : {
        id: 0,
        title:"",
        thumbnail:"",
        short_description:"",
        game_url:"",
        genre:"",
        platform:"",
        publisher:"",
        developer:"",
        release_date:"",
        freetogame_profile_url:"",
    }
}

export const fetchGamesList = createAsyncThunk(
    'gameReducer/fetchGamesList',
      async function getGamesList() {
        try {
            const request = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
                    "x-rapidapi-key": "e88515225dmshfa7f6bac40c4121p1a8de3jsn22d7da2a9d0f"
                }
            }
            );
            const response = await request.json();
            return response;
        } catch (error) {
            console.log(error)
        }
    }
)

const gameReducer = createSlice({
    name: 'gameReducer',
    initialState : initState,
    reducers: {
         setLoaded (state, action) {
           state = {...state, ...state.isGamesListLoaded = action.payload}
         },
         setPlatrorm (state, action) {
           state = {...state, ...state.platformList = action.payload}
         },
         setChosenGame (state, action) {
             state = {...state, ...state.chosenGame = action.payload}
         } 
    },
    extraReducers: {
         [fetchGamesList.fulfilled.toString()] : (state, action) => {
            state.isGamesListLoaded = true;
            state.gamesList = action.payload; 
         },
         [fetchGamesList.pending.toString()]: (state) => {
            state.isGamesListLoaded = false;
            state.isGamesListFails = false;
         },
         [fetchGamesList.rejected.toString()] : (state) => {
            state.isGamesListFails = true;
         }
    } 
})

export const { setLoaded, setPlatrorm, setChosenGame } = gameReducer.actions;

export default gameReducer.reducer;