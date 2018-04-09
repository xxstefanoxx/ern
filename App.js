/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Intro from "./src/components/Intro";
import Menu from "./src/components/Menu";
import Credits from "./src/components/Credits";
import Search from "./src/components/Search";
import Maps from "./src/components/Maps";
import Detail from "./src/components/Detail";
import Favourites from "./src/components/Favourites";



Navigation.registerComponent(
  "ern.Intro",
  () => Intro
)

Navigation.registerComponent(
  "ern.Menu",
  () => Menu
)

Navigation.registerComponent(
  "ern.Credits",
  () => Credits
)

Navigation.registerComponent(
  "ern.Favourites",
  () => Favourites
)

Navigation.registerComponent(
  "ern.Search",
  () => Search
)

Navigation.registerComponent(
  "ern.Maps",
  () => Maps
)

Navigation.registerComponent(
  "ern.Detail",
  () => Detail
)


// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "ern.Intro",
    title: ""
  }
});