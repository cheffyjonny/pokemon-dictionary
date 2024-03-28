import { createSlice } from '@reduxjs/toolkit'
import { names, moves, types, abilities } from '@/server/translation'
import { Translation } from '@/entities/Translation'

interface PageState {
  value: number
  translation: Translation
}

const initialState: PageState = {
  value: 1,
  translation: {
    names: names,
    moves: moves,
    types: types,
    abilities: abilities,
  },
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
