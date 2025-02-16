import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const partypalaceSlice = createSlice({
  name: "partypalace",
  initialState: {
    partypalace: [],
    selectedPartyPalace: null,
    bookedPartyPalaceLength: null,
    myPartyPalace: [],
  },
  reducers: {
    setPartyPalace: (state, action) => {
      state.partypalace = action?.payload;
    },
    setSelectedPartyPalace: (state, action) => {
      state.selectedPartyPalace = action?.payload;
    },
    setBookedPartyPalaceLength: (state, action) => {
      state.bookedPartyPalaceLength = action?.payload;
    },
    setMyPartyPalace: (state, action) => {
      state.myPartyPalace = action?.payload;
    },
  },
});
export const {
  setPartyPalace,
  setSelectedPartyPalace,
  setBookedPartyPalaceLength,
  setMyPartyPalace,
} = partypalaceSlice.actions;
export default partypalaceSlice.reducer;
