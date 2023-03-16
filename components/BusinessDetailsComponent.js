import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, Linking, Alert } from "react-native";

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

    const phoneCall = () => {
      const phoneNumber = business.phone ? business.phone : business.display_phone;
      if (phoneNumber) {
        Alert.alert(`Faire un appel à ${business.name}`, `Numéro: ${phoneNumber}`, [
            {
                text: 'Retour',
                style: 'cancel',
            }, {
                text: 'Oui', 
                onPress: () => {
                  Linking.openURL(`tel:${phoneNumber}`)
                }
            },
        ]);
      }
    }

    const maps = () => {
      let url = `https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.latitude},${business.coordinates.longitude}&dir_action=navigate`;
      if (business.coordinates.latitude && business.coordinates.longitude) {
        Alert.alert(`Montrer un itinéraire vers ${business.name}`, `Adresse: ${business.location.display_address.join(", ")}`, [
            {
                text: 'Retour',
                style: 'cancel',
            }, {
                text: 'Oui', 
                onPress: () => {
                  Linking.openURL(url);
                }
            },
        ]);
      }
    }

    const ratingStars = () => {
      const rating = business.rating;

      const fullStarsNumber = Math.floor(rating);
      const halfStarsNumber = rating - fullStarsNumber > 0 ? 1 : 0;
      const emptyStarsNumber = 5 - fullStarsNumber - halfStarsNumber;
      
      let ratingStarsComponent = [];

      for (let i = 0; i < fullStarsNumber; i++)
        ratingStarsComponent.push(
          <Image style={styles.starStyle} source={Assets.icons.filledStar}/>
        );

      if (halfStarsNumber == 1)
        ratingStarsComponent.push(
          <Image style={styles.starStyle} source={Assets.icons.halfStar}/>
        );
      
      for(let i = 0; i < emptyStarsNumber; i++)
        ratingStarsComponent.push(
          <Image style={styles.starStyle} source={Assets.icons.emptyStar}/>
        );
      
        return (<View style={styles.starsContainer}>{ratingStarsComponent}</View>);
    }

    return (
        <View style={styles.container}>
            {displayImage()}
            <View style={styles.containerCardTop}>
              <View style={styles.containerHeader}>
                <Text style={styles.textTitle}>{business.name}</Text>
                {ratingStars()}
                { 
                  business.is_closed !== undefined && business.is_closed &&
                  <Text style={{color: 'red'}}>Fermé</Text>
                }
                { 
                  business.is_closed !== undefined && !business.is_closed &&
                  <Text style={{color: 'green'}}>Ouvert</Text>
                }
              </View>
              <View style={styles.containerFav}>
                <TouchableOpacity activeOpacity = { .5 } onPress={favouritePressed}>
                  {displayFavouriteIcon()}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerCardBottom}>
              <Image style={styles.bottomCardIcon} source={Assets.icons.phone}/>
              <View style={styles.bottomCardText}>
                {
                  !business.phone && !business.display_phone && 
                  <Text>Numéro non fourni.</Text>
                }
                {
                  (business.phone || business.display_phone) && 
                  <TouchableOpacity activeOpacity = { .5 } onPress={phoneCall}>
                    <Text>Tel: <Text style={styles.phoneNumber}>{business.display_phone ? business.display_phone : business.phone}</Text></Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
            <View style={styles.containerCardBottom}>
              <Image style={styles.bottomCardIcon} source={Assets.icons.mapLocation}/>
              <View style={styles.bottomCardText}>
                <TouchableOpacity activeOpacity = { .5 } onPress={maps}>
                    { business.distance !== undefined &&<Text>À { business.distance >= 1000 ? `${(business.distance / 1000).toFixed(2)} kilomètres` : `${Math.floor(business.distance)} mètres`}</Text> }
                    <Text>{business.location.display_address.join(", ")}</Text>
                </TouchableOpacity>
              </View>
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
        flexDirection: 'row',
    },
    bottomCardIcon: {
      height: 25,
      width: 25,
      tintColor: Colors.primary_blue,
    },
    bottomCardText: {
      flex:3, 
      marginLeft: 15, 
      justifyContent: 'center'
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
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    }, 
    phoneNumber: {
      color: Colors.primary_blue
    },
    starStyle: {
      height: 20, 
      width: 20, 
      tintColor: 'gold', 
      marginRight: 3
    },
    starsContainer: {
      flexDirection: 'row', 
      marginTop: 8, 
      marginBottom: 5
    }
  });

export default BusinessDetails;