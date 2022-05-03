/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
    isAuthenticated?: boolean
    email: string
    uid?: string
    fullName: string
    username: string
    avatar?: string
    password?: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    email: '',
    uid: '',
    fullName: '',
    username: '',
    avatar: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, userData) {
            state.isAuthenticated = true
            state.email = userData.payload.email
            state.uid = userData.payload.uid
            state.username = userData.payload.username
            state.fullName = userData.payload.fullName
            state.avatar = userData.payload.avatar
        },
        logout(state) {
            state.isAuthenticated = false
            state.email = ''
            state.uid = ''
            state.username = ''
            state.fullName = ''
            state.avatar = ''
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
