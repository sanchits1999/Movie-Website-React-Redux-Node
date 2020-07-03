import React, { useState, useEffect } from "react"
import img from "../utils/Images/signup-image.jpg"
import { Form, Button } from "semantic-ui-react"
import { signup, signout } from "../api/auth"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Cookie from "js-cookie"
import { connect } from "react-redux"
import { Redirect, Link } from "react-router-dom"
import * as actions from "../actions/actions"


const Signup = (props) => {


    const [error, seterror] = useState({
        error1: null,
        error2: null,
        error3: null
    })

    const [checked, setchecked] = useState(false)
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [open, setopen] = useState(false)
    const [loaded, setloaded] = useState(false)


    useEffect(() => {
        if (props.error === null) {
            setTimeout(() => {
                setloaded(true)
                setopen(false)
            }, 500)
        } else {
            // alert(props.error)
            setloaded(true)
            setopen(true)
            setTimeout(() => {
                setopen(false)
                props.seterror()
            }, 2000)
        }
    }, [props.error])

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#ffffff", display: "flex", flexDirection: "row" }}>
            {props.jwt !== null ? <Redirect to="/home/toprated" /> : null}
            {!loaded ? <div style={{ width: window.innerWidth, height: window.innerHeight, zIndex: 100, position: "absolute", backgroundColor: "#000000" }}>
                <div class="ui segment" style={{ width: "100%", height: "100%", border: "0px solid white" }}>
                    <p></p>
                    <div class="ui active dimmer">
                        <div class="ui loader"></div>
                    </div>
                </div>
            </div> : null}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ width: "60%", alignSelf: "flex-end", marginRight: 40 }}>
                    <div style={{ fontSize: 50, fontWeight: "700", color: "#000000" }}>Sign Up</div>
                    <Form style={{ marginTop: 50 }}>
                        <Form.Input
                            error={error.error1 === null ? null : { content: error.error1, pointing: 'below' }}
                            fluid
                            label='Username'
                            placeholder='Username'
                            id='form-input-first-name'
                            onChange={(txt) => {
                                setname(txt.currentTarget.value)
                                setopen(false)
                            }}
                        />
                        <Form.Input
                            error={error.error2}
                            fluid
                            label='Password'
                            placeholder='Password'
                            onChange={(txt) => {
                                setpassword(txt.currentTarget.value)
                                setopen(false)
                            }}
                        />
                        <Form.Checkbox
                            label='I agree to the Terms and Conditions'
                            error={error.error3 === null ? null : {
                                content: error.error3,
                                pointing: 'left',
                            }}
                            onChange={() => { setchecked(!checked) }}
                        />
                    </Form>
                    <Button content='Sign Up' primary style={{ width: 100, marginTop: 20 }} onClick={() => {
                        let error1 = null
                        let error2 = null
                        let error3 = null
                        if (name.trim().length === 0) {
                            error1 = "Username cannot be empty!"
                        }
                        if (password.trim().length === 0) {
                            error2 = "Password cannot be empty!"
                        }
                        if (!checked) {
                            error3 = "Please accept to continue!"
                        }
                        seterror({
                            error1: error1,
                            error2: error2,
                            error3: error3,
                        })
                        if (error1 === null & error2 === null & error3 === null) {
                            setloaded(false)
                            props.signup(name, password)
                        }
                    }} />
                </div>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <img onLoad={() => { setTimeout(() => { setloaded(true) }, 500) }} src={img} style={{ maxWidth: "100%", height: 400 }} />
                <Link to="/signin" style={{ marginTop: 20, letterSpacing: 0.7, textDecoration: "none" }}>Already have an account? Signin..</Link>
            </div>
            <div>
                <Snackbar open={open} autoHideDuration={3000}>
                    <Alert severity="error">
                        {props.error}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )

}

const MapdispatchtoProps = (dispatch) => {
    return {
        signup: (name, password) => {
            dispatch(signup(name, password))
        },
        signout: () => {
            dispatch(signout())
        },
        seterror: () => {
            dispatch(actions.Seterror(null))
        }
    }
}

const MapstatetoProps = (state) => {
    return {
        error: state.auth.error,
        jwt: state.auth.jwt
    }
}

export default connect(MapstatetoProps, MapdispatchtoProps)(Signup)
