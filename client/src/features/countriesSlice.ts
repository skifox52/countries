import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
interface CountriesState {
  name: string
  code: string
}
interface InitalState {
  countries: CountriesState[] | null
  pages: number
  status: "idle" | "error" | "pending" | "succeded"
}
const initialState: InitalState = {
  countries: null,
  pages: 1,
  status: "idle",
}
//Async thunk
export const pagesCounting = createAsyncThunk(
  "countries/count",
  async (page: number = 1) => {
    const response = await axios.get(
      `http://localhost:5000/countries?page=${page}`
    )
    return response.data
  }
)

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pagesCounting.pending, (state, { payload }) => {
        state.status = "pending"
      })
      .addCase(pagesCounting.rejected, (state, { payload }) => {
        state.status = "error"
      })
      .addCase(pagesCounting.fulfilled, (state, { payload }) => {
        state.pages = payload.pages
        state.countries = payload.result
        state.status = "succeded"
      })
  },
})

export default countriesSlice.reducer
