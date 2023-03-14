import React, { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

const BusinessDetails = ({route}) => {
    const business = route.params.business;

    return (
        <View style={styles.container}>
            <Text>Business Details {business.name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 60
    },
  });

export default BusinessDetails;