import React from "react"
import { useEffect } from "react"
import { Button, StyleSheet, Text, View, Alert } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { clearSavedBusinesses, saveBusiness } from "../store/reducers/savedBusinesses"
import BusinessListItem from "./BusinessListItemComponent"

const FavedBusinesses = ({navigation}) => {
    const savedBusinesses = useSelector((state) => state.savedBusinesses.businesses)
    const dispatch = useDispatch();

    useEffect(() => {
        //
    }, []);

    const clearSavedBusinessesButton = () => {
        Alert.alert('Retirer tout les favoris', 'Êtes vous sûr ?', [
            {
                text: 'Retour',
                style: 'cancel',
            }, {
                text: 'Oui', 
                onPress: () => dispatch(clearSavedBusinesses())
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(savedBusinesses)}
                renderItem={({ item }) => 
                    <BusinessListItem navigation={navigation} business={savedBusinesses[item]} keyExtractor={(item) => item}></BusinessListItem>
                }
            />
            <Button onPress={clearSavedBusinessesButton} title="Vider"/>
        </View>
    )
}

export default FavedBusinesses;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})