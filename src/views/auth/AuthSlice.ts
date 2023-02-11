import { createSlice } from '@reduxjs/toolkit'

export type initialStateType = {}

const initialState: initialStateType = {}

const AuthSlice = createSlice({
  name: 'aside',
  initialState,
  reducers: {
  }
})

export const { actions, reducer } = AuthSlice

export default reducer