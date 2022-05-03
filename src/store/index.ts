import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { loadState } from './browser-storage'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: loadState(),
})

export const { dispatch } = store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
