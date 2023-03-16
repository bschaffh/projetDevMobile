import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BusinessesMap from "../components/BusinessesMapComponent";
import FavedBusinesses from "../components/FavedBusinessesComponent";
import Search from "../components/SearchComponent";
import BusinessDetails from "../components/BusinessDetailsComponent";

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
        options={{title: "Résultats"}}
      />
      <SearchNavigation.Screen
        name="BusinessDetails"
        component={BusinessDetails}
        options={{title: "Détails"}}
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
        options={{title: "Favoris"}}
      />
      <FavedBusinessesNavigation.Screen
        name="BusinessDetails"
        component={BusinessDetails}
        options={{title: "Détails"}}
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
      />
      <TabNavigation.Screen
        name="Favoris"
        component={FavedStack}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;