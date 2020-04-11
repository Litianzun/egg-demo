import React from 'react';
import {Icon} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from '../pages/Welcome';
import Home from '../pages/Home';
import {colors} from '../common';
import Main from '../pages/Main';
import Personal from '../pages/my/Personal';
import Following from '../pages/my/Following';
import Fans from '../pages/my/Fans';
import WriteNote from '../pages/WriteNote';
import NoteDetails from '../pages/NoteDetails'

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
        <Stack.Screen
          name="Personal"
          component={Personal}
          options={{title: '个人信息'}}
        />
        <Stack.Screen
          name="Following"
          component={Following}
          options={{title: '关注列表'}}
        />
        <Stack.Screen
          name="Fans"
          component={Fans}
          options={{title: '粉丝列表'}}
        />
        <Stack.Screen
          name="WriteNote"
          component={WriteNote}
          options={{title: '写日志'}}
        />
        <Stack.Screen
          name="NoteDetails"
          component={NoteDetails}
          options={{title: '日志详情'}}
        />
        <Stack.Screen name="Home" component={Home} options={{title: '首页'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default route;
