export type apiKey = string; 

export interface movieState {
    title: string,
    isSearchAtive: boolean,
    searchSucceed: boolean,
    searchFails: boolean
    foundMovie : movie
}

export interface rateSource {
    Source: string,
    Value: string,
}

export interface movie {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Ratings: rateSource[],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    Type: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: string,
}


interface singleGame {
    id: number ,
    title: string,
    thumbnail: string,
    short_description: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    developer: string,
    release_date: string,
    freetogame_profile_url: string
}


export interface gamesState {
    isGamesListLoaded : boolean,
    isGamesListFails : boolean,
    gamesList : singleGame[],
    platformList: string[]
    chosenGame : singleGame,
}