import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
  name: 'userinfo',
  initialState: {
    uservalue: undefined
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.uservalue = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer