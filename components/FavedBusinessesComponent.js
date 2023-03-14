import React from "react"
import { useEffect } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import {unSaveBusinessById, clearSavedBusinesses} from "../store/reducers/savedBusinesses" 
import BusinessListItem from "./BusinessListItemComponent"

import cities from 'cities.json';

const FavedBusinesses = (props) => {
    const savedBusinesses = useSelector((state) => state.savedBusinesses.businesses)
    const dispatch = useDispatch();

    useEffect(() => {
        addBusiness();
        console.log("----------------------" + savedBusinesses);
    }, []);

    const addBusiness = () => {
        /*const newBusiness = cities[Math.floor(Math.random()*cities.length)];
        dispatch(saveBusiness({name: newBusiness.name, lattitude: newBusiness.lat, longitude: newBusiness.lng}));*/
    }

    const clearBusiness = () => {
        //dispatch(clearSavedCities());
    }
    
    /*savedCities.forEach(element => {
        console.log(element.name)
    });*/

    return (
        <View style={styles.container}>
            <Text>Villes enregistrées</Text>
            <FlatList
                data={savedBusinesses}
                renderItem={({ item }) => <BusinessListItem business={item}></BusinessListItem>}
            />
            <Button onPress={() => clearBusiness()} title="Vider"/>
            <Button onPress={() => addBusiness()} title="Ajouter ville"/>

        </View>
    )
}

export default FavedBusinesses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    }
})