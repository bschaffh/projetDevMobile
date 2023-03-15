import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BusinessesMap from "../components/BusinessesMapComponent";
import FavedBusinesses from "../components/FavedBusinessesComponent";
import Search from "../components/SearchComponent";
import BusinessDetails from "../components/BusinessDetailsComponent";
import Assets from "../definitions/Assets";

const DefaultNavigation = createStackNavigator();
const FavedBusinessesNavigation = createStackNavigator();
const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function SearchStack() {
  return (
    <SearchNavigation.Navigator screenOptions={{
    }} initialRouteName="Search">
      <SearchNavigation.Screen 
        name="Search"
        component={Search}
        options={{title: "Recherche"}}
      />
      <SearchNavigation.Screen
        name="SearchMap"
        component={BusinessesMap}
      />
      <SearchNavigation.Screen
        name="BusinessDetails"
        component={BusinessDetails}
        options={{title: "Détails du lieu"}}
      />
    </SearchNavigation.Navigator>
  );
}

function FavedStack() {
  return (
    <FavedBusinessesNavigation.Navigator screenOptions={{
    }} initialRouteName="FavedBusinessesList">
      <FavedBusinessesNavigation.Screen 
        name="FavedBusinessesList"
        component={FavedBusinesses}
        options={{title: "Lieux favoris"}}
      />
      <FavedBusinessesNavigation.Screen
        name="BusinessDetails"
        component={BusinessDetails}
        options={{title: "Détails du lieu"}}
      />
    </FavedBusinessesNavigation.Navigator>
  );
}

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TabNavigation.Screen
        name="Recherche"
        component={SearchStack}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return (
              <Image source={Assets.icons.search} style={{ tintColor: color, flex: 1, width:25, height:25, resizeMode: 'contain' }} />
            );
          },
        })}
      />
      <TabNavigation.Screen
        name="Favoris"
        component={FavedStack}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return (
              <Image source={Assets.icons.heartFull} style={{ tintColor: color, flex: 1, width:25, height:25, resizeMode: 'contain' }} />
            );
          },
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;