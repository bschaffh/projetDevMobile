import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native"
import { getAllCategories, searchBusinesses } from "../api/yelpAPI";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import NumericInput from 'react-native-numeric-input'
import BusinessListItem from "./BusinessListItemComponent";
import * as Location from 'expo-location';

const Search = ({navigation}) => {
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [searchDistance, setSearchDistance] = useState(1000);
    const [isDistanceOK, setIsDistanceOK] = useState(true);
    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [isPositionFound, setIsPositionFound] = useState(false);

    const [foundBusinesses, setFoundBusinesses] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);

    let onEndReachedCalledDuringMomentum = false;
    let pageNumber = 0;
    const pageSize = 20;

    useEffect(() => {
        /*searchBusinesses('49.117340', '6.177030', null, 500, null, null, null, 20, null).then(
            businesses => {
                console.log("a")
                //rrsetFoundBusinesses([...foundBusinesses, ...businesses.businesses])
                //console.log(businesses);
            }

        );*/
        findPosition();
        getAllCategories().then(result => {
            setAllCategories(result.categories)
        })
    },[]);

    const newSearchBusinesses = () => {
        pageNumber = 0;
        const latitude = '49.117340';
        const longitude = '6.177030';
        searchBusinesses(latitude, longitude, searchTerm, searchDistance, selectedCategories, pageSize, 0).then(
            results => {
                setFoundBusinesses(results.businesses);
            }
        )
    }

    const findPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setIsPositionFound(false);
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        console.log(latitude);
        console.log(longitude);
        setIsPositionFound(true);
      }

    const moreBusinessSearch = () => {
        pageNumber = pageNumber + 1;
        searchBusinesses(latitude, longitude, searchTerm, searchDistance, selectedCategories, pageSize, pageNumber*pageSize).then(
            results => {
                setFoundBusinesses([...foundBusinesses, results.businesses]);
            }
        )
    }

    const onSelectedCategoriesChange = (selectedCategories) => {
        setSelectedCategories(selectedCategories);
    }

    const onDistanceChange = (value) => {
        if (value > 40000)
          value = 40000;
        setSearchDistance(value);
    }

    const navigateToMap = () => {
        console.log("navig ", foundBusinesses)
        navigation.navigate('SearchMap', {
            businessesProp: foundBusinesses, 
            latitudeProp: '49.117340', 
            longitudeProp: '6.177030', 
            searchTermProp: searchTerm,
            searchDistanceProp: searchDistance,
            selectedCategories: selectedCategories
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Que souhaitez-vous découvrir ?"
                    style={styles.inputSearchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />
               <SectionedMultiSelect
                    items={allCategories}
                    IconRenderer={Icon}
                    uniqueKey="alias"
                    displayKey="title"
                    selectText="Choisir une ou plusieurs catégories..."
                    showDropDowns={true}
                    onSelectedItemsChange={onSelectedCategoriesChange}
                    selectedItems={selectedCategories}
                    showCancelButton={true}
                    showRemoveAll={true}
                    confirmText="Confirmer"
                    searchPlaceholderText="Chercher une catégorie"
                    selectChildren={true}
                    removeAllText="Vider les filtres"
                />
                <Text style={styles.searchFieldTitle}>Localisation</Text>
                <View>
                    <Text>Autour de moi</Text>
                </View>
                <Text style={styles.searchFieldTitle}>Distance (maximum 40000 mètres)</Text>
                <View style={styles.distanceContainer}>
                    <NumericInput 
                        value={searchDistance} 
                        onChange={onDistanceChange}
                        step={1}
                        maxValue={40000}
                    />
                    <Text> mètres</Text>
                </View>
                <Button
                    disabled={!isPositionFound}
                    title="Rechercher"
                    onPress={newSearchBusinesses}
                />
                
            </View>

            <View>
                <Button
                    title="Voir la carte"
                    onPress={navigateToMap}
                />
                { !isError &&
                    <FlatList
                        data={foundBusinesses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <BusinessListItem business={item}
                            />
                        )}
                        refreshing={isRefreshing}
                        onRefresh={newSearchBusinesses}
                    />
                }
            </View>
        </View>
    );
}

export default Search;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 60
    },
    searchContainer: {
        paddingHorizontal: 12,
      marginBottom: 16,
    },
    inputSearchTerm: {
      marginBottom: 16,
    },
    noResult: {
      width: 336,
      height: 180,
      borderRadius: 8,
    },
    distanceContainer: {
        flexDirection: 'row'
    },
    searchFieldTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15
    }
  });