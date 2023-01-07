import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native"

import { searchPlace } from "../api/WeatherAPI";

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [locations, setLocations] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const newSearchLocation = async () => {
        setIsRefreshing(true);
        setIsError(false);
        try {
            const WeatherAPIResult = await searchPlace(searchTerm);
            setLocations(WeatherAPIResult);
        } catch (error) {
            console.log("Error while fetching films.");
            setIsError(true);
            setLocations([]);
        }
        setIsRefreshing(false);
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
                { !isError &&
                    <FlatList
                        data={locations}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Text>{item.name}</Text>
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
      paddingHorizontal: 12,
      marginTop: 16,
    },
    searchContainer: {
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