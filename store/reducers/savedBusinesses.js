import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businesses : []
};

const savedBusinessesSlice = createSlice({
    name: "savedBusinesses",
    initialState: initialState,
    reducers: {
        saveBusiness(state, action){
            state.cities.push(action.payload);
        },
        unSaveBusinessById(state, action){
            state.cities = state.cities.filter((id) => id !== action.payload);
        },
        clearSavedBusinesses(state){
            state.cities = [];
        }
    }
})

export const {saveBusiness, unSaveBusinessById, clearSavedBusinesses} = savedBusinessesSlice.actions;
export default savedBusinessesSlice.reducer;

