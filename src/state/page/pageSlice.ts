import { createSlice } from '@reduxjs/toolkit'
import { translation } from '@/server/translation'

interface PageState {
  value: number
  translation: { [key: string]: string }
}

const initialState: PageState = {
  value: 1,
  translation: translation,
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
