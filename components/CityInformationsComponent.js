import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";

import * as Location from 'expo-location';

const CityInformations = (props) => {
    const metz = useSelector((state) => state.savedCities.cities[2]);
    const [currentPosition, setCurrentPosition] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    })
    const [isPositionRefreshing, setIsPositionRefreshing] = useState(true);

    useEffect(() => {
     refreshPosition();
    }, []);

    const refreshPosition = async () => {
      setIsPositionRefreshing(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition({
        latitude : location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01}
        );
        setIsPositionRefreshing(false);
    }

    return (
      <View style={styles.container}>
        <Text>Ville</Text>
        <MapView
            initialRegion={currentPosition}
            region={currentPosition}
            style={styles.mapStyle}
        >
            {
              !isPositionRefreshing && 
                <Marker 
                  title="Moi" 
                  pinColor="red" 
                  coordinate={{latitude: currentPosition.latitude,longitude: currentPosition.longitude}}
                />
            }
        </MapView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 60,
    },
    mapStyle: {
      width: "100%",
      height: "100%",
    },
  });
  

export default CityInformations;