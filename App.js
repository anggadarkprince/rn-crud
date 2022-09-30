import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {
  UserIndexScreen,
  UserCreateScreen,
  UserViewScreen,
  SCREEN_USER_INDEX,
  SCREEN_USER_CREATE,
  SCREEN_USER_VIEW,
} from './src/screens/UserScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={SCREEN_USER_INDEX}
            component={UserIndexScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={SCREEN_USER_CREATE}
            component={UserCreateScreen}
            options={{title: 'Create New User'}}
          />
          <Stack.Screen
            name={SCREEN_USER_VIEW}
            component={UserViewScreen}
            options={({route}) => ({title: route.params.name})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
