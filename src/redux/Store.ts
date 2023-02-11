import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "src/views/auth/AuthSlice"

const rootReducer = {
  Auth: AuthReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store