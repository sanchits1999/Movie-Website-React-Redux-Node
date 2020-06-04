import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { MdPlayCircleFilled } from 'react-icons/md'
import { IoMdHeart } from 'react-icons/io'
import { MdWatchLater } from 'react-icons/md'
import { getMovieOverview, getVideos, getCast } from "../api/getters"
import { connect } from "react-redux"
import Carousel from "react-multi-carousel"
import { Modal, OverlayTrigger, Popover } from "react-bootstrap"
import { addFavourites, addWatchlater, RemoveWatchlater, RemoveFavourite } from "../api/movies"
//import { Button, Header, Image, Modal } from "semantic-ui-react";
import "react-multi-carousel/lib/styles.css"
import "./MovieOverview.css"


const MovieOverview = (props) => {


    console.log(props.f)
    console.log(props.w)

    const [show, setshow] = useState(false);
    const [Mdetails, setdetails] = useState({})
    const [trailer, settrailer] = useState("")
    const [cast, setcast] = useState([])
    const [focus, setfocus] = useState(null)
    const [Favourite, setFavourite] = useState(false)
    const [Watchlater, setWatchlater] = useState(false)
    const [loaded, setloaded] = useState(false)
    const [iload, setiload] = useState(false)

    useEffect(() => {
        //getting movie details


        getMovieOverview(props.match.params.id).then((response) => {
            setdetails(response.data)
        }).catch((error) => {
        })


        getVideos(props.match.params.id).then((response) => {
            settrailer(response.data.results[0].key)
        }).catch((error) => {
        })

        getCast(props.match.params.id).then((response) => {
            setcast(response.data.cast)
        }).catch((error) => {
        })

    }, [])




    useEffect(() => {

        if (props.jwt !== null) {
            let fav = props.f.find((m) => {
                return m.m_id == Mdetails.id
            })
            if (fav) {
                setFavourite(true)
                setloaded(true)
            } else {
                setFavourite(false)
                setloaded(true)
            }
        }

    }, [props.f, Mdetails])

    useEffect(() => {

        if (props.jwt !== null) {
            let watch = props.w.find((m) => {
                return m.m_id == Mdetails.id
            })
            if (watch) {
                setWatchlater(true)
                setloaded(true)
            } else {
                setWatchlater(false)
                setloaded(true)
            }
        }

    }, [props.w, Mdetails])


    const handleLoaded = () => {
        setiload(true)
    }

    const handleFavourite = () => {
        if (Favourite) {
            props.removeFavourites(Mdetails.id, props.jwt)
            setloaded(false)
        } else {
            props.addFavourites(Mdetails, props.jwt)
            setloaded(false)
        }
    }

    const handleWatchlater = () => {
        if (Watchlater) {
            props.removeWatchlater(Mdetails.id, props.jwt)
            setloaded(false)
        } else {
            props.addWatchlater(Mdetails, props.jwt)
            setloaded(false)
        }
    }

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", backgroundColor: "#222b31" }}>
            {!iload | !loaded ? <div style={{ width: window.innerWidth, height: window.innerHeight, zIndex: 100, position: "absolute", backgroundColor: "#000000" }}>
                <div class="ui segment" style={{ width: "100%", height: "100%", border: "0px solid white" }}>
                    <p></p>
                    <div class="ui active dimmer">
                        <div class="ui loader"></div>
                    </div>
                </div>
            </div> : null}
            <div style={{ width: window.innerWidth, height: window.innerHeight, overflow: "hidden", position: "absolute" }}>
                <img onLoad={handleLoaded} src={"http://image.tmdb.org/t/p/original" + Mdetails.backdrop_path} alt="Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "row", height: window.innerHeight, width: window.innerWidth, backgroundColor: "rgba(34, 43, 49 , 0.8)", zIndex: 1 }}>
                <div style={{ flex: 7 }}>
                    <div style={{ display: "flex", flexDirection: "column", paddingTop: 100, paddingLeft: 100 }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ fontSize: 10, fontWeight: "500", color: "#ffffff", letterSpacing: 2 }}>
                                {Mdetails.vote_average} / 10 |
                                </div>
                            <div style={{ fontSize: 10, fontWeight: "500", color: "#ffffff", letterSpacing: 2, paddingLeft: 10 }}>
                                HOLLYWOOD |
                                </div>
                            <div style={{ fontSize: 10, fontWeight: "500", color: "#ffffff", letterSpacing: 2, paddingLeft: 10 }}>
                                ENGLISH
                                </div>
                        </div>
                        <div style={{ width: "100%", display: "flex", marginTop: 20 }}>
                            <div style={{ fontSize: 50, lineHeight: 1, width: "100%", paddingRight: 50, textAlign: "match-parent", textAnchor: "middle", fontWeight: "700", color: "#ffffff", letterSpacing: 1.5 }}>
                                {Mdetails.original_title} <span style={{ fontSize: 50, fontWeight: "700", color: "red" }}>.</span>
                            </div>
                        </div>
                        <div style={{ fontSize: 14, width: "100%", paddingRight: 50, marginTop: 30, color: "#ffffff", letterSpacing: 1.5 }}>
                            {Mdetails.overview}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", paddingRight: 50, marginTop: 40 }}>
                            <div onClick={() => { setshow(true) }} onMouseOver={() => { setfocus("wt") }} onMouseOut={() => { setfocus(null) }} style={{ width: 180, height: 45, borderRadius: 30, backgroundColor: "red", display: "flex", justifyContent: "center", alignItems: "center", opacity: focus !== "wt" ? 0.9 : 1 }}>
                                <MdPlayCircleFilled size={28} style={{ color: "#ffffff", paddingBottom: 2 }} />
                                <div style={{ fontSize: 16, fontWeight: "500", color: "#ffffff", letterSpacing: 0.5, paddingBottom: 2, marginLeft: 5 }}>Watch Trailer</div>
                            </div>
                            <VideoModal Tkey={trailer} show={show} setshow={() => setshow(false)} />
                            <div className="visitweb" onMouseOver={() => { setfocus("vw") }} onMouseOut={() => { setfocus(null) }} style={{ width: 180, height: 45, borderRadius: 30, backgroundColor: focus !== "vw" ? "transparent" : "#ffffff", border: "2px solid white", marginLeft: 16, color: focus !== "vw" ? "#ffffff" : "black", fontWeight: "500", fontSize: 16, textAlign: "center", paddingTop: 10 }}>
                                Visit Website
                                </div>
                            <OverlayTrigger
                                onEnter={() => { setfocus("atf") }}
                                onExit={() => { setfocus(null) }}
                                trigger={["hover", "click"]}
                                key={"top1"}
                                placement={"top"}
                                overlay={
                                    <Popover>
                                        <Popover.Content>
                                            {Favourite ? "Remove from" : "Add to"} <strong>Favourites</strong>
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <div onClick={handleFavourite} style={{ display: "flex", height: 45, width: 45, marginLeft: 16, justifyContent: "center", alignItems: "center", borderRadius: 30, backgroundColor: "rgba(255, 255, 255 , 0.2)" }}>
                                    <IoMdHeart size={24} style={{ color: focus === "atf" | Favourite ? "red" : "#ffffff", paddingBottom: 2 }} />
                                </div>
                            </OverlayTrigger>
                            <OverlayTrigger
                                onEnter={() => { setfocus("wl") }}
                                onExit={() => { setfocus(null) }}
                                trigger={["hover", "click"]}
                                key={"top2"}
                                placement={"top"}
                                overlay={
                                    <Popover>
                                        <Popover.Content>
                                            {Watchlater ? "Remove from" : "Add to"}  <strong>Watch Later</strong>
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <div onClick={handleWatchlater} style={{ display: "flex", height: 45, width: 45, marginLeft: 16, justifyContent: "center", alignItems: "center", borderRadius: 30, backgroundColor: "rgba(255, 255, 255 , 0.2)" }}>
                                    <MdWatchLater size={24} style={{ color: focus === "wl" | Watchlater ? "#dddddd" : "#ffffff", paddingBottom: 2 }} />
                                </div>
                            </OverlayTrigger>

                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, height: 110, width: window.innerWidth, backgroundColor: "transparent", marginLeft: "auto", marginRight: "auto", left: 0, right: 0, paddingLeft: 20 }}>
                        <div style={{ fontSize: 18, fontWeight: "500", color: "#ffffff", marginBottom: 15, marginLeft: 30, letterSpacing: 1.5 }}>Cast</div>
                        <Carousel
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={false}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            style={{ marginBottom: 5 }}>
                            {cast.slice(0, 10).map((cast) => {
                                return (<div style={{ display: "flex", flexDirection: "row", marginBottom: 2, alignItems: "center", paddingLeft: 10, backgroundColor: "rgba(255, 255, 255 , 0.05)", borderTopLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: "center", paddingTop: 2, paddingBottom: 2, height: "100%", width: 220, borderRight: "1px solid white" }}>
                                    <div style={{ width: 40, height: 40, overflow: "hidden", borderRadius: 20 }}>
                                        <img src={"http://image.tmdb.org/t/p/w185" + cast.profile_path} alt="Image" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20 }} />
                                    </div>
                                    <div style={{ paddingLeft: 15, paddingRight: 10, paddingTop: 3 }}>
                                        <div style={{ fontSize: 11, fontWeight: "700", color: "red" }}>{cast.character}</div>
                                        <div style={{ fontSize: 12, fontWeight: "700", color: "white" }}>{cast.name}</div>
                                    </div>
                                </div>)
                            })}
                        </Carousel>
                    </div>
                </div>

                <div style={{ flex: 3, display: "flex", justifyContent: "center", paddingTop: 80 }}>
                    <div style={{ width: 240, height: 360, overflow: "hidden", border: "0.5px solid grey", borderRadius: 2 }}>
                        <img src={"http://image.tmdb.org/t/p/w500" + Mdetails.poster_path} alt="Image" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }} />
                    </div>
                </div>
            </div>

        </div>

    )
}

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 5 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    }
}


const VideoModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={() => props.setshow()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
                <ReactPlayer url={"https://www.youtube.com/watch?v=" + props.Tkey} />
            </Modal.Body>

        </Modal>
    );
}

const MapstatetoProps = (state) => {
    return {
        jwt: state.auth.jwt,
        f: state.r.favourites,
        e: state.auth.error,
        w: state.r.watchlater
    }
}

const MapdispatchtoProps = (dispatch) => {
    return {
        addFavourites: (movie, token) => {
            dispatch(addFavourites(movie, token))
        },
        addWatchlater: (movie, token) => {
            dispatch(addWatchlater(movie, token))
        },
        removeFavourites: (m_id, token) => {
            dispatch(RemoveFavourite(m_id, token))
        },
        removeWatchlater: (m_id, token) => {
            dispatch(RemoveWatchlater(m_id, token))
        }
    }
}

export default connect(MapstatetoProps, MapdispatchtoProps)(MovieOverview)