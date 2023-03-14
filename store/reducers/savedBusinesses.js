import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businesses : [
        {id: 'wdzqdzq', name: 'fav1'}
    ]
};

const savedBusinessesSlice = createSlice({
    name: "savedBusinesses",
    initialState: initialState,
    reducers: {
        saveBusiness(state, action){
            state.businesses.push(action.payload);
        },
        unSaveBusinessById(state, action){
            state.businesses = state.businesses.filter((id) => id !== action.payload);
        },
        clearSavedBusinesses(state){
            state.businesses = [];
        }
    }
})

export const {saveBusiness, unSaveBusinessById, clearSavedBusinesses} = savedBusinessesSlice.actions;
export default savedBusinessesSlice.reducer;

