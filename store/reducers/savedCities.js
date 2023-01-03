import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities: [
            {name: "Paris", lattitude: 49.3, longitude: 50}, 
            {name: "New-York", lattitude: 49.3, longitude: 50},
            {name: "Metz", lattitude: 49.13, longitude: 6.17}
        ]
};

const savedCitiesSlice = createSlice({
    name: "savedCities",
    initialState: initialState,
    reducers: {
        saveCity(state, action){
            state.cities.push(action.payload);
        },
        unSaveCityByName(state, action){
            state.cities = state.cities.filter((name) => name !== action.payload);
        }
    }
})

export const {saveCity, unSaveCityByName} = savedCitiesSlice.actions;
export default savedCitiesSlice.reducer;

