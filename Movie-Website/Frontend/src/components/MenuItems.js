import React, { useState } from "react"
import { TiMediaEject } from 'react-icons/ti'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { NavLink, useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { signout } from "../api/auth"


const MenuItems = (props) => {

    console.log(useLocation().pathname)

    const [active, setactive] = useState(1)

    return (
        <div style={{ display: "flex", flexDirection: "column", position: "fixed", alignItems: "center", width: props.width, height: "100vh" }}>
            <div style={{ height: 50, backgroundColor: "#f83745", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <TiMediaEject size={18} style={{ height: "100%", color: "#ffffff", marginRight: 3 }} />
                    <div style={{ height: "100%", textAlign: "center", paddingTop: 14, fontSize: 15, fontWeight: "700", color: "#ffffff" }}>MEDIA APP</div>
                </div>
            </div>
            <div style={{ width: "100%", flex: 1, backgroundColor: "#191c1f" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 30 }}>
                    <div style={{ width: "100%", marginTop: 0 }}>
                        <NavLink to="/home/toprated" onClick={() => { setactive(1) }} activeStyle={{ textDecoration: "none", color: "#f83745", backgroundColor: "#222b31" }} style={{ width: "100%", display: "flex", height: 40, alignItems: "center", textDecoration: "none", color: "#ffffff", fontWeight: "500", backgroundColor: "#191c1f", fontSize: 14, letterSpacing: 1.2 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
                                <div style={{ paddingLeft: 25 }}>Top Rated</div>
                                <div style={{ display: "flex", marginLeft: "auto", marginRight: 15 }}><IoIosArrowRoundForward size={22} style={{ color: "#555c61", opacity: useLocation().pathname == "/home/toprated" ? 1 : 0 }} /></div>
                            </div>
                        </NavLink>
                    </div>
                    <div style={{ width: "100%", marginTop: 0 }}>
                        <NavLink to="/home/trending" onClick={() => { setactive(2) }} activeStyle={{ textDecoration: "none", color: "#f83745", backgroundColor: "#222b31" }} style={{ width: "100%", display: "flex", height: 40, alignItems: "center", textDecoration: "none", color: "#ffffff", fontWeight: "500", backgroundColor: "#191c1f", fontSize: 14, letterSpacing: 1.2 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
                                <div style={{ paddingLeft: 25 }}>Trending</div>
                                <div style={{ display: "flex", marginLeft: "auto", marginRight: 15 }}><IoIosArrowRoundForward size={22} style={{ color: "#555c61", opacity: useLocation().pathname === "/home/trending" ? 1 : 0 }} /></div>
                            </div>
                        </NavLink>
                    </div>
                    <div style={{ width: "100%", marginTop: 0 }}>
                        <NavLink to="/home/comingsoon" onClick={() => { setactive(3) }} activeStyle={{ textDecoration: "none", color: "#f83745", backgroundColor: "#222b31" }} style={{ width: "100%", display: "flex", height: 40, alignItems: "center", textDecoration: "none", color: "#ffffff", fontWeight: "500", backgroundColor: "#191c1f", fontSize: 14, letterSpacing: 1.2 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
                                <div style={{ paddingLeft: 25 }}>Coming Soon</div>
                                <div style={{ display: "flex", marginLeft: "auto", marginRight: 15 }}><IoIosArrowRoundForward size={22} style={{ color: "#555c61", opacity: useLocation().pathname === "/home/comingsoon" ? 1 : 0 }} /></div>
                            </div>
                        </NavLink>
                    </div>
                    <div style={{ width: "100%", marginTop: 0 }}>
                        <NavLink to="/home/favourites" onClick={() => { setactive(4) }} activeStyle={{ textDecoration: "none", color: "#f83745", backgroundColor: "#222b31" }} style={{ width: "100%", display: "flex", height: 40, alignItems: "center", textDecoration: "none", color: "#ffffff", fontWeight: "500", backgroundColor: "#191c1f", fontSize: 14, letterSpacing: 1.2 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
                                <div style={{ paddingLeft: 25 }}>Favourites</div>
                                <div style={{ display: "flex", marginLeft: "auto", marginRight: 15 }}><IoIosArrowRoundForward size={22} style={{ color: "#555c61", opacity: useLocation().pathname === "/home/favourites" ? 1 : 0 }} /></div>
                            </div>
                        </NavLink>
                    </div>
                    <div style={{ width: "100%", marginTop: 0 }}>
                        <NavLink to="/home/watchlater" onClick={() => { setactive(5) }} activeStyle={{ textDecoration: "none", color: "#f83745", backgroundColor: "#222b31" }} style={{ width: "100%", display: "flex", height: 40, alignItems: "center", textDecoration: "none", color: "#ffffff", fontWeight: "500", backgroundColor: "#191c1f", fontSize: 14, letterSpacing: 1.2 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
                                <div style={{ paddingLeft: 25 }}>Watch Later</div>
                                <div style={{ display: "flex", marginLeft: "auto", marginRight: 15 }}><IoIosArrowRoundForward size={22} style={{ color: "#555c61", opacity: useLocation().pathname === "/home/watchlater" ? 1 : 0 }} /></div>
                            </div>
                        </NavLink>
                    </div>
                    <div style={{ width: "100%", borderBottom: "1px solid white", marginTop: 5, marginBottom: 5, opacity: 0.2 }}></div>
                    <NavLink to="/signup">
                        <div onClick={() => { props.signout() }} style={{ width: "100%", marginTop: 0 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: 40 }}>
                                <div style={{ paddingLeft: 25, color: "#ffffff", fontWeight: "500", backgroundColor: "#191c1f", fontSize: 14, letterSpacing: 1.2 }}>Sign Out</div>
                                <div style={{ display: "flex", marginLeft: "auto", marginRight: 15 }}><IoIosArrowRoundForward size={22} style={{ color: "#555c61", opacity: false ? 1 : 0 }} /></div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

const MapdispatchtoProps = (dispatch) => {
    return {
        signout: () => {
            dispatch(signout())
        }
    }
}

export default connect(null, MapdispatchtoProps)(MenuItems)