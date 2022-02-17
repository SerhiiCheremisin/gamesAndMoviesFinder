import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiKey, movieState } from '../../../types/index';


const key:apiKey = '4f2ea0a5';

const initState: movieState = {
    title: '',
    isSearchAtive: false,
    searchSucceed: false,
    searchFails: false,
    foundMovie : {
        Title: '',
        Year: '',
        Rated: '',
        Released: '',
        Runtime: '',
        Genre: '',
        Director: '',
        Writer: '',
        Actors: '',
        Plot: '',
        Language: '',
        Country: '',
        Awards: '',
        Poster: '',
        Ratings: [],
        Metascore: '',
        imdbRating: '',
        imdbVotes: '',
        imdbID: '',
        Type: '',
        DVD: '',
        BoxOffice: '',
        Production: '',
        Website: '',
        Response: '',
    }
}

export const fetchMovie = createAsyncThunk(
    'movieReducer/fetchMovie',
     async function getMovieByName(movieTitle:string) {
        try{
          const request = await fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${key}`);
          const response = await request.json();
          return response;
        }
        catch (error) {
          console.log(error)
        }
    }
)

const movieReducer = createSlice({
    name: 'movieReducer',
    initialState : initState,
    reducers: {
       setTitle (state, action) {
            state = {...state, ...state.title = action.payload}
       },
       setResponseIncorrect (state, action) {
           const {success, fail} = action.payload;
           state = {...state, ...state.searchSucceed = success, ...state.searchFails = fail}
       },
    },
    extraReducers : {
        [fetchMovie.pending.toString()] : (state:any) => { state.isSearchAtive = true},
        [fetchMovie.fulfilled.toString()] : (state:any, action) => {
            state.isSearchAtive = false;
            state.searchSucceed = true;
            state.searchFails = false;
            state.foundMovie = action.payload;
        },
        [fetchMovie.rejected.toString()] : (state:any) => {state.searchFails = true}

    }
})

export const { setTitle,setResponseIncorrect } = movieReducer.actions;

export default movieReducer.reducer;