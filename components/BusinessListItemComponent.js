import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Feather } from "expo-vector-icons";

const BusinessListItem = ({business}) => {
    const navigation = useNavigation();
    const navigateToDetails = () => {
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
                <Text style={styles.businessLocation}>
                    {business.location?.city} ({ business.distance >= 1000 ? `${(business.distance / 1000).toFixed(2)}km` : `${Math.floor(business.distance)}m`})
                </Text>
                {
                    business.is_closed &&
                    <Text style={styles.closedText}>Fermé</Text>
                }
                {
                    !business.is_closed &&
                    <Text style={styles.openedText}>Ouvert</Text>
                }
            </View>
            <Feather name="arrow-right" size={40} />
        </TouchableOpacity>
    )
}

export default BusinessListItem;

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#677e85',
        justifyContent: 'space-between'
    },
    businessName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    businessLocation: {
        fontStyle: 'italic',
        fontSize: 13
    },
    businessInfos: {
        flex: 1
    },
    icon: {
        height: 50,
        width: 50
    },
    closedText: {
        color: 'red'
    },
    openedText: {
        color: 'green'
    }
})