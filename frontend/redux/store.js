import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from "./slices/UserSlice"

export const store =  configureStore({
    reducer: {
        userinfo:userInfoReducer,
    },
})