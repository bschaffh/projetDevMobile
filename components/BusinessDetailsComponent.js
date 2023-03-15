import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

import Colors from "../definitions/Colors";
import Assets from "../definitions/Assets";

import { saveBusiness, unSaveBusinessById } from "../store/reducers/savedBusinesses";
import { useSelector, useDispatch } from "react-redux";

const BusinessDetails = ({route}) => {
    const business = route.params.business;
    const [isSaved, setIsSaved] = useState(false);
    const dispatch = useDispatch();

    const savedBusinesses = useSelector((state) => state.savedBusinesses.businesses)

    useEffect(() => {
      if (savedBusinesses && business.id in savedBusinesses) {
        setIsSaved(true);
      }
    }, []);

    const displayImage = () => {
      if (business.image_url) {
        return (<Image style={styles.image} source={{ uri:business.image_url }}/>);
      } else {
        return (<View style={styles.containerNoImage}><Image source={Assets.icons.missingIMG} /></View>);
      }
    }

    const displayFavouriteIcon = () => {
      if (isSaved) {
        return (
          <Image style={styles.imageFav} source={Assets.icons.heartFull} />
        );
      } else {
        return (
          <Image style={styles.imageFav} source={Assets.icons.heartOutline} />
        );
      }
    }

    const favouritePressed = () => {
      if (isSaved) {
        dispatch(unSaveBusinessById(business.id))
      } else {
        dispatch(saveBusiness(business))
      }
      setIsSaved(!isSaved);
    };

    return (
        <View style={styles.container}>
            {displayImage()}
            <View style={styles.containerCardTop}>
              <View style={styles.containerHeader}>
                <Text style={styles.textTitle}>{business.name}</Text>
                <Text>{business.rating}/5</Text>
              <Text>{business.is_closed ? "Fermé" : "Ouvert"}</Text>
              </View>
              <View style={styles.containerFav}>
                <TouchableOpacity activeOpacity = { .5 } onPress={favouritePressed}>
                  {displayFavouriteIcon()}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerCardBottom}>
              <Text>À {Math.round(business.distance)} mètres.</Text>
              <Text>Tel: {business.display_phone}</Text>
              <Text>{business.location.display_address.join(", ")}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
    containerCardTop: {
        elevation: 1,
        borderRadius: 3,
        padding: 12,
        flexDirection: "row",
        backgroundColor: "white",
    },
    containerHeader: {
        flex: 3,
    },
    containerFav: {
        flex: 1,
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    containerCardBottom: {
        elevation: 1,
        marginTop: 16,
        borderRadius: 3,
        padding: 12,
        backgroundColor: "white",
    },
    image: {
      height: 180,
      backgroundColor: Colors.primary_blue,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    }, 
    containerNoImage: {
      height: 128,
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      backgroundColor: "white",
    },
    imageFav: {
      height: 50,
      tintColor: Colors.primary_blue,
      //backgroundColor:"#ff0000",
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    }, 
  });

export default BusinessDetails;