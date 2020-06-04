import auth from "./user"
import * as actions from "../actions/actions"

export const addFavourites = (movie, token) => {

    let m = {
        m_id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path
    }

    return (dispatch) => {
        //auth.defaults.headers.common["Authorization"]
        auth.post("/favourites", {
            favourites: m
        }, {
            headers: {
                Authorization: "Bearer " + token,
                crossorigin: true
            }
        }).then((res) => {
            console.log(res)
            if (!res.data.error) {
                dispatch(actions.addFavourites(m))

            } else {
                dispatch(actions.Seterror("Some unknown error was encountered!"))
            }
        }).catch(() => {
            dispatch(actions.Seterror("Some unknown error was encountered!"))
        })
    }
}

export const addWatchlater = (movie, token) => {

    let m = {
        m_id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path
    }

    return (dispatch) => {
        auth.post("/watchlater", {
            watchlater: m
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (!res.data.error) {
                dispatch(actions.addWatchlater(m))
            } else {
                dispatch(actions.Seterror("Some unknown error was encountered!"))
            }
        }).catch(() => {
            dispatch(actions.Seterror("Some unknown error was encountered!"))
        })
    }
}

export const RemoveFavourite = (m_id, token) => {
    console.log("stap")
    return (dispatch) => {
        auth.post("/RemoveFavourite", {
            m_id: m_id
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            console.log(res)
            if (!res.data.error) {
                dispatch(actions.removeFavourite(m_id))
            } else {
                dispatch(actions.Seterror("Some unknown error was encountered!"))
            }
        }).catch(() => {
            dispatch(actions.Seterror("Some unknown error was encountered!"))
        })
    }
}

export const RemoveWatchlater = (m_id, token) => {
    return (dispatch) => {
        auth.post("/RemoveWatchlater", {
            m_id: m_id
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (!res.data.error) {
                dispatch(actions.removeWatchlater(m_id))
            } else {
                dispatch(actions.Seterror("Some unknown error was encountered!"))
            }
        }).catch(() => {
            dispatch(actions.Seterror("Some unknown error was encountered!"))
        })
    }
}


export const getall = (token) => {

    console.log(token)
    return (dispatch) => {
        auth.get("/movies", {
            params: {
                x: "abc"
            }, headers: {
                authorization: "Bearer " + token,
                crossorigin: true
            }
        }).then((res) => {
            console.log(res)
            if (!res.data.error) {
                dispatch(actions.addMovies({ favourites: res.data.favourites, watchlater: res.data.watchlater }))
            }
            else {
                dispatch(actions.Seterror("Some unknown error was encountered!"))
            }
        }).catch(() => {
            dispatch(actions.Seterror("Some unknown error was encountered!"))
        })
    }

}