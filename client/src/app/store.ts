import { configureStore } from "@reduxjs/toolkit"
import countriesSlice from "../features/countriesSlice"

const store = configureStore({
  reducer: {
    countries: countriesSlice,
  },
})
export default store
