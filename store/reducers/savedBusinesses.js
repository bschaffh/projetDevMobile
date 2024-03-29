import { createSlice } from "@reduxjs/toolkit";
import Toast from 'react-native-root-toast';

const initialState = {
    businesses: {}
};

const savedBusinessesSlice = createSlice({
    name: "savedBusinesses",
    initialState: initialState,
    reducers: {
        saveBusiness(state, action){
            const businessCopy = JSON.parse(JSON.stringify(action.payload));
            delete businessCopy.is_closed; // will not always stay the same
            delete businessCopy.distance;
            state.businesses[action.payload.id] = businessCopy;
            Toast.show(`${action.payload.name} a été ajouté favoris.`, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                hideOnPress: true,
            });
        },
        unSaveBusinessById(state, action){
            let name = state.businesses[action.payload].name;
            delete state.businesses[action.payload];
            Toast.show(`${name} a été retiré des favoris.`, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                hideOnPress: true,
            });
        },
        clearSavedBusinesses(state){
            state.businesses = {};
            Toast.show("Tous les lieux ont été retiré des favoris.", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                hideOnPress: true,
            });
        }
    }
})

export const {saveBusiness, unSaveBusinessById, clearSavedBusinesses} = savedBusinessesSlice.actions;
export default savedBusinessesSlice.reducer;

