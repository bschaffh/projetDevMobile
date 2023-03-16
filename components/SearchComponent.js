import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, ActivityIndicator } from "react-native"
import { getAllCategories, searchBusinesses } from "../api/yelpAPI";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import NumericInput from 'react-native-numeric-input'
import BusinessListItem from "./BusinessListItemComponent";
import * as Location from 'expo-location';

const POSITION_FIND_TIMEOUT = 5000; //5 seconds

const Search = ({navigation}) => {
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDistance, setSearchDistance] = useState(1000);
    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [isPositionFound, setIsPositionFound] = useState(false);
    const [isPositionLoading, setIsPositionLoading] = useState(true);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [foundBusinesses, setFoundBusinesses] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const pageSize = 20;

    useEffect(() => {
        findPosition();
        getAllCategories().then(result => {
            setAllCategories(result.categories)
        })
    },[]);

    const newSearchBusinesses = () => {
        pageNumber = 0;
        console.log("fdfd")
        searchBusinesses(latitude, longitude, searchTerm, searchDistance, selectedCategories, pageSize, 0).then(
            results => {
                console.log(results)
                setFoundBusinesses(results.businesses);
                navigateToMap(results.businesses);
            }
        )
    }

    const findPosition = async () => {
        setIsPositionLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Accès au GPS non autorisé.');
          setIsPositionFound(false);
          setIsPositionLoading(false);
          return;
        }
        
        let timer = setTimeout(() => {
            setErrorMsg('Impossible d\'accéder à votre position.');
            setIsPositionFound(false);
        }, POSITION_FIND_TIMEOUT);

        let location = await Location.getCurrentPositionAsync({
            timeout: POSITION_FIND_TIMEOUT
        });

        clearTimeout(timer);

        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        console.log("testset location", location)
        setIsPositionFound(true);
        setIsPositionLoading(false);
      }

    const onSelectedCategoriesChange = (selectedCategories) => {
        setSelectedCategories(selectedCategories);
    }

    const onDistanceChange = (value) => {
        if (value > 40000)
          value = 40000;
        setSearchDistance(value);
    }

    const navigateToMap = (businesses) => {
        console.log("navig vers map")
        navigation.navigate('SearchMap', {
            businessesProp: businesses, 
            latitudeProp: latitude,
            longitudeProp: longitude, 
            searchTermProp: searchTerm,
            searchDistanceProp: searchDistance,
            selectedCategories: selectedCategories,
            navigation: navigation
        })
    }

    return (
        <View style={styles.container}>
            {isPositionLoading && (
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
                {
                    !isPositionFound && !isPositionLoading &&
                    <Text style={styles.positionNotFoundError}>La recherche est impossible. ({errorMsg})</Text>
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
    },
  });