import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet,} from 'react-native';
import {
  UserIndexScreen,
  UserCreateScreen,
  UserViewScreen,
  UserEditScreen,
  SCREEN_USER_INDEX,
  SCREEN_USER_CREATE,
  SCREEN_USER_VIEW,
  SCREEN_USER_EDIT,
} from './src/screens/UserScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  LoginScreen,
  RegisterScreen,
  SCREEN_LOGIN,
  SCREEN_REGISTER,
} from './src/screens/AuthScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{safeAreaInsets: {top: 0}}}>
            <Stack.Screen
              name={SCREEN_LOGIN}
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREEN_REGISTER}
              component={RegisterScreen}
              options={{headerShown: false}}
            />
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
            <Stack.Screen
              name={SCREEN_USER_EDIT}
              component={UserEditScreen}
              options={{title: 'Edit User'}}
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
