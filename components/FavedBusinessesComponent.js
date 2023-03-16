import React from "react"
import { useEffect } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { clearSavedBusinesses, saveBusiness } from "../store/reducers/savedBusinesses"
import BusinessListItem from "./BusinessListItemComponent"

const FavedBusinesses = ({navigation}) => {
    const savedBusinesses = useSelector((state) => state.savedBusinesses.businesses)
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text>Lieux enregistrées</Text>
            <FlatList
                data={savedBusinesses}
                renderItem={({ item }) => 
                    <BusinessListItem navigation={navigation} business={item}keyExtractor={(item) => item.id}></BusinessListItem>
                }
            />
            <Button onPress={() => {}} title="Vider"/>
            <Button onPress={() => {}} title="Ajouter un lieu"/>

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