import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";
import { getPlaceWeather } from "../api/WeatherAPI";

const CityListItem = ({city}) => {
    const [isWeatherLoading, setIsWeatherLoading] = useState(true);
    const [weather, setWeather] = useState();

    useEffect(() => {
        console.log("affichage dela ville " + city.name);
        loadWeather();
    }, []);

    loadWeather = async () => {
        setIsWeatherLoading(true);
        console.log("demande pour "+ city.name)
        try {
            const _weather = await getPlaceWeather(city.lattitude, city.longitude);
            setWeather(_weather.current);
        }
        catch(error){
            setWeather([]);
        }

        setIsWeatherLoading(false);
    }

    

    return (
        <View style={styles.container}>
            <Text style={styles.cityName}>
                {city.name}
            </Text>
            {!isWeatherLoading && weather && 
                <View>
                    <Text>{weather.temp_c}°C (Ressenti )</Text>
                    <Image 
                        style={styles.icon} 
                        source={{uri: "http:".concat( weather.condition.icon.toString())}}
                    />
                </View>
            }
        </View>
    )
}

export default CityListItem;

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
    cityName: {
        flex: 2,
        fontSize: 20,
        fontWeight: 'bold'
    },
    cityInfos: {
        flex: 1
    },
    icon: {
        height: 50,
        width: 50
    }
})