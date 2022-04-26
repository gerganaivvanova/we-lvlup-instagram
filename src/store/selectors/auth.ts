import { createSelector } from 'reselect'
import { RootState } from '../index'
import { AuthState } from '../authSlice'

// eslint-disable-next-line no-unused-vars
export const authSelector: (state: RootState) => AuthState = (
    state: RootState
) => state.auth

export const isAuthenticatedSelector = createSelector(authSelector, (auth) => {
    return auth.isAuthenticated
})
