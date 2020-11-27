import Axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS, LOGOUT } from './actionTypes';

export const loginRequest = payload => ({
  type: LOGIN_REQUEST,
  payload
})

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
})

export const loginFailure = payload => ({
  type: LOGIN_FAILURE,
  payload
})

export const saveAuth = payload => dispatch => {
  localStorage.setItem('email', payload.email)
  localStorage.setItem('name', payload.name)
}

export const logoutActionCreator = () => ({
  type: LOGOUT
})

export const logout = () => dispatch => {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('name')
  dispatch(logoutActionCreator())
}

export const login = payload => async dispatch => {
  dispatch(loginRequest())
  try {
    const { data } = await Axios.post('http://localhost:5000/user/login', payload)
    dispatch(loginSuccess(data))
    dispatch(saveAuth(data))
  } catch (error) {
    dispatch(loginFailure(error.response.data.message))
  }
}

export const registerRequest = payload => ({
  type: REGISTER_REQUEST,
  payload
})

export const registerSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload
})

export const registerFailure = payload => ({
  type: REGISTER_FAILURE,
  payload
})


export const register = (payload, history) => async dispatch => {
  dispatch(registerRequest())
  try {
    const { data } = await Axios.post('http://localhost:5000/user/register', payload)
    dispatch(registerSuccess(data))
    history.push('/login')
  } catch (error) {
    dispatch(registerFailure(error.response.data.message))
  }
}


