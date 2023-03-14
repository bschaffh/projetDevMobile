import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, FlatList } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useSelector } from "react-redux";
import { searchBusinesses } from "../api/yelpAPI";
import BusinessListItem from "./BusinessListItemComponent";

import * as Location from 'expo-location';
const BusinessInformations = ({route}) => {
    const [foundBusinesses, setFoundBusinesses] = useState(route.params.businessesProp);
    const [latitude, setLatitude] = useState(route.params.latitudeProp);
    const [longitude, setLongitude] = useState(route.params.longitudeProp);
    const [searchDistance, setSearchDistance] = useState(route.params.searchDistanceProp);

    const [currentPosition, setCurrentPosition] = useState({
      latitude: route.params.latitudeProp,
      longitude: route.params.longitudeProp,
      latitudeDelta: 0.00001,
      longitudeDelta: 0.1
    })
    /*const [isPositionRefreshing, setIsPositionRefreshing] = useState(true);*/

    useEffect(() => {
      console.log(currentPosition)
     //refreshPosition();
    }, []);

    /*const refreshPosition = async () => {
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
    }*/

    const newSearchBusinesses = () => {
      pageNumber = 0;
      const latitude = '49.117340';
      const longitude = '6.177030';
      searchBusinesses(latitude, longitude, route.params.searchTerm, searchDistance, route.params.selectedCategories, 20, 0).then(
          results => {
              setFoundBusinesses(results.businesses);
          }
      )
  }

    return (
      <View style={styles.container}>
        <MapView
            initialRegion={currentPosition}
            region={currentPosition}
            style={styles.mapStyle}
            customMapStyle={mapStyle}
        >
          <Marker 
            coordinate={{latitude: route.params.latitudeProp, longitude: route.params.longitudeProp}}
            />
            {
              foundBusinesses.map(business => (
                <Marker 
                key={business.id}
                  title={business.name} 
                  pinColor="red" 
                  coordinate={{latitude: business.coordinates.latitude,longitude: business.coordinates.longitude}}>
                    <Callout>
                        <View>
                          <Text style={styles.redText}>{business.distance}</Text>
                        </View>
                    </Callout>
                  </Marker>
              )) 
            }
        </MapView>
        <FlatList
          data={foundBusinesses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <BusinessListItem business={item}
              />
          )}
          refreshing={false}
          onRefresh={newSearchBusinesses}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 60
    },
    mapStyle: {
      width: "100%",
      height: "100%",
    },
    redText: {
      color: "red",
    }
  });

const mapStyle = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }];

export default BusinessInformations;