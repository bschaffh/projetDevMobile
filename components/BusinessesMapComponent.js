import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { searchBusinesses } from "../api/yelpAPI";
import BusinessListItem from "./BusinessListItemComponent";
import { Feather } from "expo-vector-icons";
import mapStyle from "../definitions/mapStyle";

const BusinessesMap = ({route}) => {
    const [foundBusinesses, setFoundBusinesses] = useState();
    const [searchDistance, setSearchDistance] = useState(route.params.searchDistanceProp);
    const [isFlatListShown, setIsFlatListShown] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResult, setTotalResult] = useState(0);

    const [currentPosition, setCurrentPosition] = useState({
      latitude: route.params.latitudeProp,
      longitude: route.params.longitudeProp,
      latitudeDelta: (route.params.searchDistanceProp /1000) / 111.045,
      longitudeDelta: 0.0000001
    })

    useEffect(() => {
      newSearchBusinesses();
    }, []);

    const newSearchBusinesses = (latitude = null, longitude = null, newSearchDistance = null) => {
      setPageNumber(0);
      searchBusinesses(latitude ?? currentPosition.latitude, longitude ?? currentPosition.longitude, route.params.searchTerm, newSearchDistance ?? searchDistance, route.params.selectedCategories, 20, 0).then(
          results => {
              setFoundBusinesses(results.businesses);
              setTotalResult(results.total);
          }
      )
    }

    const moreSearchBusinesses = () => {
      if (foundBusinesses.length < totalResult){
        setPageNumber(pageNumber + 1);
        searchBusinesses(currentPosition.latitude, currentPosition.longitude, route.params.searchTerm, searchDistance, route.params.selectedCategories, 20, (pageNumber + 1)*20).then(
            results => {
                setFoundBusinesses(foundBusinesses.concat(results.businesses));
            }
        )
      }
    }

    const toggleFlatList = () => {
      setIsFlatListShown(!isFlatListShown);
    };

    const test = async (e) => {
      setCurrentPosition(e);
      const newSearchDistance = (e.latitudeDelta * 111.045) * 1000;
      setSearchDistance(Math.min(newSearchDistance, 40000));
      newSearchBusinesses(e.latitude, e.longitude, newSearchDistance);
    }

    return (
      <View style={styles.container}>
          <MapView style={[styles.map, { height: isFlatListShown ? '50%' : '100%' }]}
            initialRegion={currentPosition}
            region={currentPosition}
            showsMyLocationButton={true}
            showsUserLocation={true}
            showsPointsOfInterest={false}
            customMapStyle={mapStyle}
            onRegionChangeComplete={test}
          >
              {
                  foundBusinesses?.map(business => (
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
          {!isFlatListShown && (
            <TouchableOpacity style={styles.toggleButtonDown} onPress={toggleFlatList}>
              <Feather name="arrow-up" size={24} />
            </TouchableOpacity>
          )}
      {isFlatListShown && (
        <View style={[styles.flatListContainer, { height: '50%' }]}>
          { foundBusinesses?.length > 0 && 
            <FlatList
              data={foundBusinesses}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <BusinessListItem business={item}
                  />
              )}
              refreshing={false}
              onRefresh={newSearchBusinesses}
              onEndReached={moreSearchBusinesses}
              onEndReachedThreshold={0.5}
          />
          }
            
            {
              foundBusinesses?.length == 0 && 
              <View style={styles.noResultContainer}>
                <Image resizeMode="stretch" source={require('../assets/sad.png')} style={styles.sadFace}/>
                <Text style={styles.noResult}>Aucun résultat. Réessayez.</Text>
              </View>
            }
          <TouchableOpacity style={styles.toggleButtonUp} onPress={toggleFlatList}>
            <Feather name="arrow-down" size={24} />
          </TouchableOpacity>
        </View>
      )}
    </View>
    );
}

const styles = StyleSheet.create({
    /*container: {
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
    }*/
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    flatListContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 10,
      paddingTop: 40
    },
    toggleButtonUp: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingVertical: 5,
    },
    toggleButtonDown: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingVertical: 5,
    }, 
    sadFace: {
      height: 150, 
      width: 150,
      marginBottom: 30
    },
    noResult: {
      fontSize: 28,
      fontWeight: 'bold'
    },
    noResultContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export default BusinessesMap;