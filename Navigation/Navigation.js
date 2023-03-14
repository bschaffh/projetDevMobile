import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BusinessInformations from "../components/BusinessInformationsComponent";
import FavedBusinesses from "../components/FavedBusinessesComponent";
import Search from "../components/SearchComponent";

const DefaultNavigation = createStackNavigator();
const FavedBusinessesNavigation = createStackNavigator();
const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function DefaultStack() {
  return (
    <DefaultNavigation.Navigator screenOptions={{
      headerShown: false,
    }} initialRouteName="BusinessInfoView">
      <DefaultNavigation.Screen
        name="BusinessInfoView"
        component={BusinessInformations}
      />
    </DefaultNavigation.Navigator>
  );
}

function SearchStack() {
  return (
    <SearchNavigation.Navigator screenOptions={{
      headerShown: false,
    }} initialRouteName="Search">
      <SearchNavigation.Screen 
        name="Search"
        component={Search}
        options={{title: "Recherche"}}
      />
      <SearchNavigation.Screen
        name="SearchMap"
        component={BusinessInformations}
        options={{
          headerLeft: () => (<Button title="Update count" />) 
        }}
      />
    </SearchNavigation.Navigator>
  );
}

function FavedStack() {
  return (
    <FavedBusinessesNavigation.Navigator screenOptions={{
      headerShown: false,
    }} initialRouteName="FavedBusinessesList">
      <FavedBusinessesNavigation.Screen 
        name="FavedBusinessesList"
        component={FavedBusinesses}
        options={{title: "Favoris"}}
      />
      <FavedBusinessesNavigation.Screen
        name="FavedBusinessInfoView"
        component={BusinessInformations}
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