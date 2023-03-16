import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const BusinessListItem = ({business}) => {
    const navigation = useNavigation();
    const navigateToDetails = () => {
        console.log("nav");
        navigation.navigate('BusinessDetails', {
            business: business
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigateToDetails()}>
            <View>
                <Text style={styles.businessName}>
                    {business.name}
                </Text>
                <Text>Distance : {Math.floor(business.distance)}m</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BusinessListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        height: 80,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 4,
        alignItems: 'center',
        padding: 10,
        flexDirection: "row",
        borderRadius: 15,
    },
    businessName: {
        flex: 2,
        fontSize: 20,
        fontWeight: 'bold'
    },
    businessInfos: {
        flex: 1
    },
    icon: {
        height: 50,
        width: 50
    }
})