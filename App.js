import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{safeAreaInsets: {top: 0}}}>
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
