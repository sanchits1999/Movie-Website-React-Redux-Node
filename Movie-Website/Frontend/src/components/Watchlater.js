import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import Cookie from "js-cookie"



const Watchlater = (props) => {

    const [hover, sethover] = useState({
        opacity: 0,
        color: "#ffb10a",
        id: null
    })

    return (
        <div style={{ heigth: "100vh", backgroundColor: "#222b31" }}>
             {Cookie.get("token")===undefined?<Redirect to="/signup"/>:null}
            <div style={{ color: "#ffffff", fontSize: 22, letterSpacing: 1.2, paddingLeft: 30, paddingTop: 50 }}>
                WATCH LATER
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
                {true ? props.watchlater.map((movie, index) => {
                    return (
                        <Link to={{
                            pathname: "/movie/" + movie.m_id
                        }} key={movie.id} style={{ textDecoration: "none" }}>
                            <div onMouseOver={() => { sethover({ color: "#ff4351", opacity: 0.6, id: index }) }} onMouseOut={() => { sethover({ color: "#ff4351", opacity: 0.3, index: null }) }} style={{ marginLeft: 30, width: 150, marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ width: 30, height: 20, borderRadius: 15, position: "absolute", fontWeight: "700", color: "#ffffff", backgroundColor: hover.id === index ? hover.color : "#ffb10a", textAlign: "center", paddingBottom: 2, fontSize: 12, zIndex: 2, opacity: 0 }}>
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
        watchlater: state.r.watchlater
    }
}

export default connect(MapstateToprops, null)(Watchlater)