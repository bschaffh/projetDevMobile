import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";

const BusinessListItem = ({business}) => {
    const [isWeatherLoading, setIsWeatherLoading] = useState(true);
    const [weather, setWeather] = useState();

    useEffect(() => {
        console.log("affichage dela ville " + business.name);
        loadWeather();
    }, []);

    loadWeather = async () => {
        /*setIsWeatherLoading(true);
        console.log("demande pour "+ city.name)
        try {
            const _weather = await getPlaceWeather(city.lattitude, city.longitude);
            setWeather(_weather.current);
        }
        catch(error){
            console.log("dzqdzqdzqdqzdqzdqzdqz" + error)
            setWeather([]);
        }

        setIsWeatherLoading(false);*/
    }

    

    return (
        <View style={styles.container}>
            <Text style={styles.businessName}>
                {business.name}
            </Text>
            <Text>Distance : {Math.floor(business.distance)}m</Text>
        </View>
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