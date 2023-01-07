import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CityInformations from "../components/CityInformationsComponent";
import FavedCities from "../components/FavedCitiesComponent";
import Search from "../components/SearchComponent";

const DefaultNavigation = createStackNavigator();
const FavedCitiesNavigation = createStackNavigator();
const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function DefaultStack() {
  return (
    <DefaultNavigation.Navigator screenOptions={{
      headerShown: false,
    }} initialRouteName="CityInfoView">
      <DefaultNavigation.Screen
        name="CityInfoView"
        component={CityInformations}
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
    </SearchNavigation.Navigator>
  );
}

function FavedStack() {
  return (
    <FavedCitiesNavigation.Navigator screenOptions={{
      headerShown: false,
    }} initialRouteName="FavedCitiesList">
      <FavedCitiesNavigation.Screen 
        name="FavedCitiesList"
        component={FavedCities}
        options={{title: "Favoris"}}
      />
      <FavedCitiesNavigation.Screen
        name="FavedCityInfoView"
        component={CityInformations}
      />
    </FavedCitiesNavigation.Navigator>
  );
}

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TabNavigation.Screen
        name="Accueil"
        component={DefaultStack}
      />
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