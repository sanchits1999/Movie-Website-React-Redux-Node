import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import MenuItems from "./components/MenuItems"
import Header from "./components/Header"
import NewReleases from "./components/NewReleases"
import Trending from "./components/Trending"
import Upcoming from "./components/Upcoming"
import Favourites from "./components/Favourites"
import Watchlater from "./components/Watchlater"
import Search from "./components/Search"
import MovieOverview from "./components/MovieOverview"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import { connect } from "react-redux"
import { AutoSignin } from "./api/auth"
import { getall } from "./api/movies"
import Cookie from "js-cookie"


const App = (props) => {

  const [size, setsize] = useState({
    wwidth: window.innerWidth,
    sideNavWidth: 240,
    show: false
  })

  const [search, setsearch] = useState("")
  const [redirect, setredirect] = useState(false)
  const [isComputing, setcomputing] = useState(false)

  console.log(search)


  console.log("app.js")

  useEffect(() => {

    //ADDING LISTENER
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 800) {
        setsize({
          sideNavWidth: 0,
          wwidth: window.innerWidth,
          show: true
        })
      } else {
        setsize({
          sideNavWidth: 240,
          wwidth: window.innerWidth,
          show: false
        })
      }
    })

    //REMOVING LISTENER
    return () => {
      window.removeEventListener("resize", () => {
        setsize({
          ...size,
          wwidth: window.innerWidth
        })
      })
    }

  }, [])


  useEffect(() => {

    if (props.jwt === null) {
      let token = Cookie.get("token")
      if (token === undefined) {
        //redirect here
        setredirect(true)
        console.log(token)
      } else {
        console.log("i ran")
        setcomputing(true)
        props.autosignin()
      }
    }

    if (props.jwt !== null) {
      props.getall(props.jwt)
      setcomputing(false)
    }

  }, [props.jwt])

  console.log(redirect)

  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#222b31" }}>
        {redirect ? <Redirect to="/signup" /> : null}
        <Route path="/home" render={() => <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#222b31" }}>
          <MenuItems width={size.sideNavWidth} />
          <div style={{ display: "flex", flexDirection: "column", width: "100%", marginLeft: size.sideNavWidth }}>
            <div style={{ position: "fixed", width: size.wwidth - size.sideNavWidth, zIndex: 2 }}>
              <Header show={size.show} search={(txt) => { setsearch(txt) }} />
            </div>

            <Switch>
              <Route path="/home/toprated" exact render={() => <div style={{ marginTop: 50, backgroundColor: "#222b31", width: "100%", height: window.innerHeight - 50, zIndex: 1 }}>
                <NewReleases />
              </div>} />
              <Route path="/home/trending" exact render={() => <div style={{ marginTop: 50, backgroundColor: "#222b31", width: "100%", height: window.innerHeight - 50, zIndex: 1 }}>
                <Trending />
              </div>} />
              <Route path="/home/comingsoon" exact render={() => <div style={{ marginTop: 50, backgroundColor: "#222b31", width: "100%", height: window.innerHeight - 50, zIndex: 1 }}>
                <Upcoming />
              </div>} />
              <Route path="/home/favourites" exact render={() => <div style={{ marginTop: 50, backgroundColor: "#222b31", width: "100%", height: window.innerHeight - 50, zIndex: 1 }}>
                <Favourites isLoading={isComputing} />
              </div>} />
              <Route path="/home/watchlater" exact render={() => <div style={{ marginTop: 50, backgroundColor: "#222b31", width: "100%", height: window.innerHeight - 50, zIndex: 1 }}>
                <Watchlater isLoading={isComputing} />
              </div>} />
              <Route path="/home/search" exact render={() => <div style={{ marginTop: 50, backgroundColor: "#222b31", width: "100%", height: window.innerHeight - 50, zIndex: 1 }}>
                <Search keyword={search} />
              </div>} />
            </Switch>
          </div>
        </div>} />

        <Route path="/movie/:id" exact component={MovieOverview} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />

      </div>


    </BrowserRouter>
  )
}

const MapstatetoProps = (state) => {
  return {
    jwt: state.auth.jwt
  }
}

const MapdispatchtoProps = (dispatch) => {
  return {
    autosignin: () => {
      return new Promise((res, rej) => {
        dispatch(AutoSignin())
        res()
      })
    },
    getall: (token) => {
      dispatch(getall(token))
    }
  }
}


export default connect(MapstatetoProps, MapdispatchtoProps)(App)
