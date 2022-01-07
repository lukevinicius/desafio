import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

const { Navigator, Screen } = createStackNavigator();

function Example() {
  return (<Text>Autenticação</Text>)
}

const AuthRoutes: React.FC = () => (
  <>
    <Navigator initialRouteName="Splash" screenOptions={
      { headerShown: false }
    }>
      <Screen
        name="SignIn"
        component={Example}
      />
    </Navigator>
  </>
);

export default AuthRoutes;