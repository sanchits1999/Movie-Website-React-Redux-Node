export const actionTypes = {
    setlatestmovies: "setlatestmovies",
    settrendingmovies: "settrendingmovies",
    setupcomingmovies: "setupcomingmovies",
    signup: "signup",
    seterror: "seterror",
    signin: "signin",
    signout: "signout",
    addFavourites: "addfavourites",
    addWatchlater: "addwatchlater",
    removeFavourite: "removefavourite",
    removeWatchlater: "removewatchlater",
    addMovies: "addmovies"
}

export const setLatestmovies = (movies) => {
    return { type: actionTypes.setlatestmovies, payload: movies }
}

export const setTrendingmovies = (movies) => {
    return { type: actionTypes.settrendingmovies, payload: movies }
}

export const setUpcomingmovies = (movies) => {
    return { type: actionTypes.setupcomingmovies, payload: movies }
}

export const addMdetails = (data) => {
    return { type: actionTypes.addMoviesDetails, payload: data }
}

export const Signup = (data) => {
    return { type: actionTypes.signup, payload: data }
}

export const Seterror = (data) => {
    return { type: actionTypes.seterror, payload: data }
}

export const Signin = (data) => {
    return { type: actionTypes.signin, payload: data }
}

export const Signout = () => {
    return { type: actionTypes.signout }
}

export const addFavourites = (movie) => {
    return { type: actionTypes.addFavourites, payload: movie }
}

export const addWatchlater = (movie) => {
    return { type: actionTypes.addWatchlater, payload: movie }
}

export const removeFavourite = (id) => {
    return { type: actionTypes.removeFavourite, payload: id }
}

export const removeWatchlater = (id) => {
    return { type: actionTypes.removeWatchlater, payload: id }
}

export const addMovies = (data) => {
    return { type: actionTypes.addMovies, payload: data }
}