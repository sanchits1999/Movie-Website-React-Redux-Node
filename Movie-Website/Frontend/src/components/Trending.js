import React, { useEffect, useState } from "react"
import { gettrending } from "../api/getters"
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import { setTrendingmovies } from "../actions/actions"
import Cookie from "js-cookie"

const Trending = (props) => {

    console.log(props.page)
    console.log(props.username)

    const [hover, sethover] = useState({
        opacity: 0,
        color: "#ffb10a",
        id: null
    })

    const [isFetching, setFetching] = useState(false)


    useEffect(() => {

        gettrending(props.page).then((res) => {
            props.settrendingmovies(res.response)
        }).catch(() => {

        })

        //adding eventListener to listen to scrolls

        window.addEventListener('scroll', onScroll)

        //removing event listeners
        return () => window.removeEventListener('scroll', onScroll)

    }, [])

    useEffect(() => {
        if (isFetching) {
            console.log("hey")
            gettrending(props.page).then((res) => {
                console.log("called")
                props.settrendingmovies(res.response)
                setFetching(false)
            }).catch(() => {

            })
        }

    }, [isFetching])

    const onScroll = (e) => {

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            console.log("bottom")
            setFetching(true)
        } else {
            console.log("not bottom")
        }


    }


    return (
        <div style={{ heigth: "100vh", backgroundColor: "#222b31" }}>
            {Cookie.get("token") === undefined ? <Redirect to="/signup" /> : null}
            {props.movies.length === 0 ? <div style={{ width: window.innerWidth - 240, height: "100%", zIndex: 100, position: "absolute", backgroundColor: "#000000" }}>
                <div class="ui segment" style={{ width: "100%", height: "100%", border: "0px solid white" ,backgroundColor: "#222b31"}}>
                    <p></p>
                    <div class="ui active dimmer">
                        <div class="ui loader"></div>
                    </div>
                </div>
            </div> : null}
            <div style={{ color: "#ffffff", fontSize: 22, letterSpacing: 1.2, paddingLeft: 30, paddingTop: 50 }}>
                TRENDING
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
                {true ? props.movies.map((movie, index) => {
                    return (
                        <Link to={{
                            pathname: "/movie/" + movie.id,
                            data: "hey"
                        }} key={movie.id} style={{ textDecoration: "none" }}>
                            <div onMouseOver={() => { sethover({ color: "#ff4351", opacity: 0.6, id: index }) }} onMouseOut={() => { sethover({ color: "#ff4351", opacity: 0.3, index: null }) }} style={{ marginLeft: 30, width: 150, marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ width: 30, height: 20, borderRadius: 15, position: "absolute", fontWeight: "700", color: "#ffffff", backgroundColor: hover.id === index ? hover.color : "#ffb10a", textAlign: "center", paddingBottom: 2, fontSize: 12, zIndex: 2 }}>
                                    {movie.vote_average}
                                </div>
                                <div style={{ width: "100%", marginTop: 10, height: 219, borderRadius: 0, overFlow: "hidden", backgroundColor: "#191c1f" }}>
                                    <img src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#ffffff", fontWeight: "500", marginTop: 5, alignSelf: "start", maxWidth: "100%" }}>
                                    {movie.title}
                                </div>
                                <div style={{ fontSize: 10, color: "#ffffff", opacity: 0.7, marginTop: 5, alignSelf: "start" }}>
                                    {movie.release_date}
                                </div>
                                <div style={{ position: "absolute", marginTop: 10, backgroundColor: "#ff4351", opacity: hover.id === index ? hover.opacity : 0, height: 219, width: 150, zIndex: 1 }}>

                                </div>
                            </div>
                        </Link>
                    )
                }) : null}
            </div>
        </div>
    )
}

const MapstateToprops = (state) => {
    return {
        movies: state.r.TrendingMovies.movies,
        page: state.r.TrendingMovies.page,
        username: state.auth.username
    }
}

const MapdispatchToprops = (dispatch) => {
    return {
        settrendingmovies: (movies) => {
            dispatch(setTrendingmovies(movies))
        }
    }
}

export default connect(MapstateToprops, MapdispatchToprops)(Trending)