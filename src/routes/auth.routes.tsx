import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <>
    <Navigator initialRouteName="Splash" screenOptions={
      { headerShown: false }
    }>
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="SignUp"
        component={SignUp}
      />
    </Navigator>
  </>
);

export default AuthRoutes;