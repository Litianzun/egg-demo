import React from 'react';
import Home from './Home';
import Explore from './Explore';
import My from './my/My';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {colors} from '../common';

const Tab = createBottomTabNavigator();
export default function Main() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      lazy
      tabBarOptions={{
        tabStyle: {
          height: 58,
          backgroundColor: '#fff',
        },
        activeTintColor: colors.blue,
        inactiveTintColor: '#666',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '首页',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={23}
              color={focused ? colors.blue : '#666'}
              type="antdesign"
            />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={Explore}
        options={{
          title: '发现',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="eye"
              size={23}
              color={focused ? colors.blue : '#666'}
              type="antdesign"
            />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          title: '我的',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user"
              size={23}
              color={focused ? colors.blue : '#666'}
              type="antdesign"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
