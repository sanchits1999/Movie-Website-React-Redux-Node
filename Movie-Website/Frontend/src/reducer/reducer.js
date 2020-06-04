import { actionTypes } from "../actions/actions"

const initialState = {
    LatestMovies: {
        movies: [],
        page: 0
    },
    TrendingMovies: {
        movies: [],
        page: 0
    },
    UpcomingMovies: {
        movies: [],
        page: 0
    },
    movieDetails: [],
    page: 0,
    favourites: [],
    watchlater: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.setlatestmovies: return { ...state, LatestMovies: { movies: state.LatestMovies.movies.concat(action.payload), page: state.LatestMovies.page + 1 } }
            break
        case actionTypes.settrendingmovies: return { ...state, TrendingMovies: { movies: state.TrendingMovies.movies.concat(action.payload), page: state.TrendingMovies.page + 1 } }
            break
        case actionTypes.setupcomingmovies: return { ...state, UpcomingMovies: { movies: state.UpcomingMovies.movies.concat(action.payload), page: state.UpcomingMovies.page + 1 } }
            break
        case actionTypes.addFavourites: return { ...state, favourites: [action.payload, ...state.favourites] }
            break
        case actionTypes.addWatchlater: return { ...state, watchlater: [action.payload, ...state.watchlater] }
            break
        case actionTypes.addMovies: return { ...state, favourites: action.payload.favourites, watchlater: action.payload.watchlater }
            break
        case actionTypes.removeFavourite: console.log(action.payload)
            return { ...state, favourites: state.favourites.filter((m) => { return m.m_id != action.payload }) }
            break
        case actionTypes.removeWatchlater: return { ...state, watchlater: state.watchlater.filter((m) => { return m.m_id != action.payload }) }
            break
        default: return state
            break
    }
}

export default reducer