import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import theme from '../global/styles/theme';

import { Home } from '../screens/Home';
import { AddMarker } from '../screens/AddMaker';
import { Profile } from '../screens/profile';

const AppRoutes: React.FC = () => (
  <>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.primaryDark,
          borderTopColor: 'transparent'
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.primary
      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon
              name="map"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Tab.Screen name="AddMarker" component={AddMarker}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon
              name="map-pin"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon
              name="user"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Tab.Navigator>
  </>
)

export default AppRoutes;