import React from "react"
import { FiSearch } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./Header.css"


const Header = (props) => {


    return (
        <div style={{ width: "100%", zIndex: 2 }}>
            <div style={{ width: "100%", height: 50, backgroundColor: "#ff424f", display: "flex", flexDirection: "row" }}>
                {props.show ? <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 25, opacity: 0.9 }}><GiHamburgerMenu color="#ffffff" size={20} /></div> : null}
                <div style={{ height: "100%", display: "flex", alignItems: "center", marginLeft: 30, opacity: 0.9 }}>
                    <FiSearch size={16} style={{ color: "#ffffff" }} />
                    <Link to="/home/search"><input placeholder="Search Movies" onClick={() => { }} onChange={(target) => { props.search(target.currentTarget.value) }} style={{ color: "#ffffff", marginLeft: 8, fontSize: 15, letterSpacing: 0.5, backgroundColor: "transparent", borderWidth: 0 }} /></Link>
                </div>
                <div style={{ display: "flex", marginLeft: "auto" }}>
                    {!props.show ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginRight: 40 }}>
                        <div style={{ color: "#ffffff", fontSize: 14, paddingTop: 14, letterSpacing: 0.5, fontWeight: "500", opacity: 1 }}>{props.username}</div>
                        <div style={{ width: 32, height: 32, borderRadius: 16, overFlow: "hidden", backgroundColor: "#ffffff", marginTop: 5 }}>
                            <img src="https://i.pinimg.com/474x/a2/41/b9/a241b984a83ae01322c524cab6cfc37d.jpg" alt="Image" style={{ borderRadius: 16, width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

const MapstatetoProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(MapstatetoProps)(Header)