import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { searchBusinesses } from "../api/yelpAPI";
import BusinessListItem from "./BusinessListItemComponent";
import { Feather } from "expo-vector-icons";
import mapStyle from "../definitions/mapStyle";
import distanceInKmBetweenEarthCoordinates from "../shared/mathsUtils";
import { useRef } from "react";

const BusinessesMap = ({route, navigation}) => {
  const ref = useRef();

    const myLatitude = route.params.latitudeProp;
    const myLongitude = route.params.longitudeProp;

    const [foundBusinesses, setFoundBusinesses] = useState();
    const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(true);
    const [searchDistance, setSearchDistance] = useState(route.params.searchDistanceProp);
    const [isFlatListShown, setIsFlatListShown] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResult, setTotalResult] = useState(0);

    const [currentPosition, setCurrentPosition] = useState({
      latitude: route.params.latitudeProp,
      longitude: route.params.longitudeProp,
      latitudeDelta: (route.params.searchDistanceProp /1000) / 111.045, //Convertir le rayon de recherche en mètres pour avoir la valeur de latitudeDelta
      longitudeDelta: 0.0000001
    })

    useEffect(() => {
      newSearchBusinesses();
      console.log("searchDistance = ", searchDistance)
    }, []);

    const newSearchBusinesses = (latitude = null, longitude = null, newSearchDistance = null) => {
      setIsLoadingBusinesses(true);
      setPageNumber(0);
      searchBusinesses(latitude ?? currentPosition.latitude, longitude ?? currentPosition.longitude, route.params.searchTerm, newSearchDistance ?? searchDistance, route.params.selectedCategories, 20, 0).then(
          results => {
              setIsLoadingBusinesses(false);
              results?.businesses?.forEach(
                business => {
                  const d = distanceInKmBetweenEarthCoordinates(
                    business.coordinates.latitude,  
                    business.coordinates.longitude,
                    myLatitude,
                    myLongitude
                  ) * 1000;
                  business.distance = d
                }

              ); //Recalcul de la distance par rapport à la localisation réelle, et non celle au centre de la carte une fois le déplacement fait
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
                const newFoundBusinesses = foundBusinesses.concat(results.businesses);
                newFoundBusinesses.forEach(
                  business => {
                      const d = distanceInKmBetweenEarthCoordinates(
                      business.coordinates.latitude,  
                      business.coordinates.longitude,
                      myLatitude,
                      myLongitude
                    ) * 1000;
                    business.distance = d
                  }
                );
                setFoundBusinesses(newFoundBusinesses);
            }
        )
      }
    }

    const toggleFlatList = () => {
      setIsFlatListShown(!isFlatListShown);
    };

    const regionChangeCompleteHandle = async (e, gesture) => {
      if (gesture.isGesture) {
        setCurrentPosition(e);
        const newSearchDistance = (e.latitudeDelta * 111.045) * 1000; //convertir le nouveau latitudeDelta en rayon de recherche en mètres
        setSearchDistance(Math.min(newSearchDistance, 40000));
        newSearchBusinesses(e.latitude, e.longitude, Math.min(newSearchDistance, 40000));
      }
    }

    const navigateToDetails = (business) => {
      navigation.navigate('BusinessDetails', {
        business: business
      })
    }

    const scrollToBusiness = (businessId) => {
      setIsFlatListShown(true);
      console.log(foundBusinesses.map(b => b.id))
      console.log(businessId)
      console
      ref?.current?.scrollToIndex({
        animated: true,
        index: foundBusinesses.map(b => b.id).findIndex(id => id == businessId),
    });
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
            onRegionChangeComplete={regionChangeCompleteHandle}
          >
              {
                  foundBusinesses?.map(business => (
                    <Marker 
                      key={business.id}
                      title={business.name} 
                      pinColor="red" 
                      coordinate={{latitude: business.coordinates.latitude,longitude: business.coordinates.longitude}}
                      onPress={() => scrollToBusiness(business.id)}
                    >
                        <Callout onPress={() => navigateToDetails(business)}>
                            <View>
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>{business.name}</Text>
                              <Text style={{fontStyle: 'italic', fontSize: 12}}>{ business.distance >= 1000 ? `${(business.distance / 1000).toFixed(2)}km` : `${Math.floor(business.distance)}m`}</Text>
                              {
                                  business.is_closed &&
                                  <Text style={{color :'red'}}>Fermé</Text>
                              }
                              {
                                  !business.is_closed &&
                                  <Text style={{color: 'green'}}>Ouvert</Text>
                              }
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
            {isLoadingBusinesses && (
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 999,
                }}>
                <ActivityIndicator size="large" color="#f00" />
            </View>
          )}
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
              ref={ref}
          />
          }
            
            {
              (foundBusinesses == null || foundBusinesses?.length == 0) && !isLoadingBusinesses &&
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