import React from 'react';
import {Icon} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from '../pages/Welcome';
import Home from '../pages/Home';
import {colors} from '../common';
import Main from '../pages/Main';

const Stack = createStackNavigator();

function route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.blue,
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerBackTitle: '返回',
          headerBackTitleStyle: {
            color: '#fff',
          },
          headerBackImage: () => (
            <Icon name="left" type="antdesign" color="#fff" size={20} />
          ),
        }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} options={{title: '首页'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default route;
