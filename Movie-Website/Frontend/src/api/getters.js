import imdb from "./imdb"
import * as actions from "../actions/actions"
import moviedb from "./moviedb"


export const getlatest = (page) => {
    let p = page + 1

    return new Promise((res, rej) => {
        moviedb.get("/top_rated", {
            params: {
                api_key: "296e41d71c750e1fe001d0a0faa5935c",
                page: p.toString()
            }
        }).then((response) => {
            res({ response: response.data.results, page: p })
        }).catch((e) => {

        })
    })
}

export const gettrending = (page) => {
    let p = page + 1

    return new Promise((res, rej) => {
        moviedb.get("/popular", {
            params: {
                api_key: "296e41d71c750e1fe001d0a0faa5935c",
                page: p.toString()
            }
        }).then((response) => {
            res({ response: response.data.results, page: p })
        }).catch((e) => {

        })
    })
}

export const getupcoming = (page) => {
    let p = page + 1

    return new Promise((res, rej) => {
        moviedb.get("/upcoming", {
            params: {
                api_key: "296e41d71c750e1fe001d0a0faa5935c",
                page: p.toString()
            }
        }).then((response) => {
            res({ response: response.data.results, page: p })
        }).catch((e) => {

        })
    })
}

export const getMovieOverview = (id) => {
    return new Promise((res, rej) => {
        moviedb.get("/" + id, {
            params: {
                api_key: "296e41d71c750e1fe001d0a0faa5935c"
            }
        }).then((response) => {
            res(response)
        }).catch((error) => {
            rej(error)
        })
    })

}

export const getSimilarMovies = (id) => {
    return new Promise((res, rej) => {
        moviedb.get("/" + id + "/similar", {
            params: {
                api_key: "296e41d71c750e1fe001d0a0faa5935c",
                page: "1"
            }
        }).then((response) => {
            res(response)
        }).catch((error) => {
            rej(error)
        })
    })

}

export const getCast = (id) => {
    return new Promise((res, rej) => {
        moviedb.get("/" + id + "/credits", {
            params: {
                api_key: "296e41d71c750e1fe001d0a0faa5935c"
            }
        }).then((response) => {
            res(response)
        }).catch((error) => {
            rej(error)
        })
    })
}

export const getVideos = (id) => {
    return new Promise((res, rej) => {
        moviedb.get("/" + id + "/videos", {
            params: {
                api_key: "296e41d71c750e1fe001d0a0faa5935c"
            }
        }).then((response) => {
            res(response)
        }).catch((error) => {
            rej(error)
        })
    })
}





