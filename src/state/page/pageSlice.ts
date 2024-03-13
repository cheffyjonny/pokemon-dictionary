import { createSlice } from '@reduxjs/toolkit'

interface PageState {
  value: number
}

const initialState: PageState = {
  value: 1,
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

export const { increment } = pageSlice.actions

export default pageSlice.reducer
