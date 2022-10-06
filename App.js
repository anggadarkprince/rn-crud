import React, {useEffect, useReducer, useMemo} from 'react';
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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  SCREEN_LOGIN,
  SCREEN_REGISTER,
} from './src/screens/AuthScreen';
import {SplashScreen} from './src/screens/SplashScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import Axios from './src/libraries/Axios';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLogout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLogout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isLogout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await EncryptedStorage.getItem('userToken');
        console.log('userToken', userToken);
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        const response = await Axios.post('login', {
          email: data.email,
          password: data.password,
        });
        const token = response.data.token;

        dispatch({type: 'SIGN_IN', token: token});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        const response = await Axios.post('register', {
          name: data.name,
          email: data.email,
          password: data.password,
        });
        const token = response.data.token;

        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
          />
          <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{safeAreaInsets: {top: 0}}}>
              {state.userToken == null ? (
                <>
                  <Stack.Screen
                    name={SCREEN_LOGIN}
                    component={LoginScreen}
                    options={{
                      headerShown: false,
                      animationTypeForReplace: state.isLogout ? 'pop' : 'push',
                    }}
                  />
                  <Stack.Screen
                    name={SCREEN_REGISTER}
                    component={RegisterScreen}
                    options={{headerShown: false}}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
