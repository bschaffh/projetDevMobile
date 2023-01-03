import React from "react"
import { useEffect } from "react"
import { Text } from "react-native"
import { useSelector } from "react-redux"

const FavedCities = (props) => {
    const savedCities = useSelector((state) => state.savedCities.cities)
    
    useEffect(() => {
        console.log(savedCities);
    }, []);

    return (
        <Text>Liste des villes en favori</Text>
    )
}

export default FavedCities;