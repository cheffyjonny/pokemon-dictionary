import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './page/pageSlice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
  },
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
