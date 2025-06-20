import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  user: null,
  loading: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("theme");
    }
  },
})

export const { setUser,logout, setLoading } = profileSlice.actions

export default profileSlice.reducer
