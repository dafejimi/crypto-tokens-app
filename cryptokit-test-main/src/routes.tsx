import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SingleToken from './screens/single-tokens';
import Tokens from './screens/tokens';
import Settings from './screens/settings';

import { RootStackParamList } from '../types/types';
import { FavoritesProvider } from './hooks/FavoritesContext';

// the aim is to have 3 simple screens.
// drawer navigation
//    2 items within Settings and Main crypto view
//    A stack navigator within crypto view to hold two screens the main view and the single crypto assets view.
//


const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const StackView = () => {
  return (<Stack.Navigator screenOptions={
    {
      headerShown: false,
    }
  }>
    <Stack.Screen name="Tokens" component={Tokens} />
    <Stack.Screen name="SingleToken" component={SingleToken} />
  </Stack.Navigator>);
};

const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{
    headerTransparent: true,
    headerTitle: '',
  }}>
    <Drawer.Screen name="MainView" component={StackView} />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
);


const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
};


export default App;
