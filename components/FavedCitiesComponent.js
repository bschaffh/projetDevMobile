import React from "react"
import { useEffect } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { saveCity, clearSavedCities } from "../store/reducers/savedCities"
import CityListItem from "./CityListItemComponent"

import cities from 'cities.json';

const FavedCities = (props) => {
    const savedCities = useSelector((state) => state.savedCities.cities)
    const dispatch = useDispatch();

    useEffect(() => {
        addCity();
        console.log("----------------------" + savedCities);
    }, []);

    const addCity = () => {
        const newCity = cities[Math.floor(Math.random()*cities.length)];
        dispatch(saveCity({name: newCity.name, lattitude: newCity.lat, longitude: newCity.lng}));
    }

    const clearCity = () => {
        dispatch(clearSavedCities());
    }
    
    savedCities.forEach(element => {
        console.log(element.name)
    });

    return (
        <View style={styles.container}>
            <Text>Villes enregistrées</Text>
            <FlatList
                data={savedCities}
                renderItem={({ item }) => <CityListItem city={item}></CityListItem>}
            />
            <Button onPress={() => clearCity()} title="Vider"/>
            <Button onPress={() => addCity()} title="Ajouter ville"/>

        </View>
    )
}

export default FavedCities;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    }
})