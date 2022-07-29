import 'react-native-gesture-handler';
import React from 'react';
import Tabs from './navigation/tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { Home, Restaurant, OrderDelivery } from './screens'


export default function App() {
  const Stack = createStackNavigator();
  return (
    < NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />

      </Stack.Navigator>
    </ NavigationContainer>

  );
}
