import { actionTypes } from "../actions/actions"

const initialState = {
    jwt: null,
    username: null,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.signup: return { jwt: action.payload.jwt, username: action.payload.username, error: null }
            break
        case actionTypes.signin: return { jwt: action.payload.jwt, username: action.payload.username, error: null }
            break
        case actionTypes.signout: return { jwt: null, username: null, error: null }
            break
        case actionTypes.seterror: return { ...state, error: action.payload }
            break
        default: return state
            break
    }
}

export default authReducer