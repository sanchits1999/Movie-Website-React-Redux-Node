import auth from "./user"
import * as actions from "../actions/actions"
import Cookie from "js-cookie"

export const signup = (username, password) => {

  return (dispatch) => {

    auth.post("/signup", {
      UserName: username,
      Password: password
    }).then((res) => {
      console.log(res.data)
      console.log(!res.data.error)
      if (!res.data.error) {
        Cookie.set("token", { jwt: res.data.token, username: username })
        dispatch(actions.Signup({ jwt: res.data.token, username: username }))
      } else {
        if (res.data.message === "user already exists") {
          dispatch(actions.Seterror(res.data.message))
        } else {
          dispatch(actions.Seterror("Request Failed!.Please try again later or check you network connection"))
        }
      }
    }).catch((error) => {
      console.log("hey2")
      console.log(error)
      dispatch(actions.Seterror("Request Failed!.Please try again later or check you network connection"))
    })
  }
}


export const signin = (username, password) => {

  return (dispatch) => {

    auth.post("/signin", {
      UserName: username,
      Password: password
    }).then((res) => {
      console.log(res.data)
      console.log(!res.data.error)
      if (!res.data.error) {
        Cookie.set("token", { jwt: res.data.token, username: username })
        dispatch(actions.Signin({ jwt: res.data.token, username: username }))
      } else {
        if (res.data.message === "No user with the username found") {
          dispatch(actions.Seterror(res.data.message))
        } else {
          dispatch(actions.Seterror("Request Failed!.Please try again later or check you network connection"))
        }
      }
    }).catch((error) => {
      console.log("hey2")
      console.log(error)
      dispatch(actions.Seterror("Request Failed!.Please try again later or check you network connection"))
    })
  }
}

export const signout = () => {
  return (dispatch) => {
    Cookie.remove("token")
    dispatch(actions.Signout())
  }
}

export const AutoSignin = () => {
  return (dispatch) => {
    let data = Cookie.get("token")
    data = JSON.parse(data)
    console.log(data)
    dispatch(actions.Signin({ jwt: data.jwt, username: data.username }))
  }
}