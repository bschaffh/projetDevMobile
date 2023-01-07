import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native"

import { searchPlace } from "../api/WeatherAPI";
import CityListItem from "./CityListItemComponent";

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [locations, setLocations] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const newSearchLocation = async () => {
        if (searchTerm.trim().length > 0){
            setIsRefreshing(true);
            setIsError(false);
            try {
                const WeatherAPIResult = await searchPlace(searchTerm);
                setLocations(WeatherAPIResult);
            } catch (error) {
                console.log("Error while fetching weather." + error);
                setIsError(true);
                setLocations([]);
            }
            console.log(locations);
            setIsRefreshing(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Terme à chercher"
                    style={styles.inputSearchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                    onSubmitEditing={()=>newSearchLocation()}
                />
                <Button
                    title="Rechercher"
                    onPress={newSearchLocation}
                />
            </View>
            <View>
                { !isError && locations &&
                    <FlatList
                        data={locations}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <CityListItem city={
                                {id: item.id, name: item.name, lattitude: item.lat, longitude: item.long}
                            }/>
                        )}
                        refreshing={isRefreshing}
                        onRefresh={newSearchLocation}
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
  });