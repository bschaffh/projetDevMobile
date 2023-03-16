import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native"
import { getAllCategories, searchBusinesses } from "../api/yelpAPI";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import NumericInput from 'react-native-numeric-input'
import * as Location from 'expo-location';
import { TouchableOpacity } from "react-native-gesture-handler";

const POSITION_FIND_TIMEOUT = 5000; //5 seconds

const Search = ({navigation}) => {
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDistance, setSearchDistance] = useState(0.5);
    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [isPositionFound, setIsPositionFound] = useState(false);
    const [isPositionLoading, setIsPositionLoading] = useState(true);

    const [errorMsg, setErrorMsg] = useState("");

    const pageSize = 20;

    useEffect(() => {
        findPosition();
        getAllCategories().then(result => {
            setAllCategories(result.categories)
        })
    },[]);

    const newSearchBusinesses = () => {
        navigateToMap();
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
        setIsPositionFound(true);
        setIsPositionLoading(false);
      }

    const onSelectedCategoriesChange = (selectedCategories) => {
        setSelectedCategories(selectedCategories);
    }

    const onDistanceChange = (value) => {
        if (value > 40)
          value = 40;
        setSearchDistance(value);
    }

    const navigateToMap = () => {
        navigation.navigate('SearchMap', {
            latitudeProp: latitude,
            longitudeProp: longitude, 
            searchTermProp: searchTerm,
            searchDistanceProp: searchDistance * 1000,
            selectedCategories: selectedCategories
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
            <View style={{alignItems: 'center', padding: 20, borderBottomWidth: 1, marginLeft: 15, marginRight: 15, marginBottom: 15}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Découvrir les environs</Text>
            </View>
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
                <View style={styles.searchDistanceContainer}>
                    <Text style={[styles.searchFieldTitle, {flex: 1.1}]}>Dans un rayon de : </Text>
                    <View style={[styles.distanceContainer, {flex: 1}]}>
                        <NumericInput 
                            type="up-down"
                            step={0.1}
                            style={styles.distanceInput}
                            value={searchDistance} 
                            onChange={onDistanceChange}
                            valueType='real'
                            minValue={0}
                            totalHeight={30}
                            upDownButtonsBackgroundColor='#472836'
                            borderColor='black'
                            totalWidth={100}
                        />
                        <Text style={{fontSize: 20}}> km</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.searchButton}
                    disabled={!isPositionFound}
                    onPress={newSearchBusinesses}
                >
                    <Text style={styles.searchButtonText}>Allons-y !</Text>
                </TouchableOpacity>
                {
                    !isPositionFound && !isPositionLoading &&
                    <View>
                    <Text style={styles.positionNotFoundError}>La recherche est impossible. ({errorMsg})</Text>
                    <Button title="Réessayer" onPress={findPosition}/>
                    </View>
                }
            </View>
        </View>
    );
}

export default Search;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center'
    },
    searchContainer: {
    paddingHorizontal: 12,
      marginBottom: 16,
    },
    inputSearchTerm: {
      marginBottom: 16,
      padding: 10,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 50
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
        fontSize: 22,
        fontWeight: 'bold'
    },
    searchButton:{
        padding: 30,
        borderRadius: 5,
        margin: 50,
        backgroundColor: '#385753',
        alignItems: 'center',
      justifyContent: 'center'
    },
    searchButtonText: {
        fontWeight: 'bold',
        fontSize: 22
    },
    searchDistanceContainer: {
        flexDirection: 'row',  
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginTop: 20
    }
  });