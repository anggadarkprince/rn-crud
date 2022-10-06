import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import Axios from '../../libraries/Axios';
import {Spinner} from '../../components/Spinner';
import {Button} from '../../components/Button';
import {SCREEN_USER_INDEX} from '../UserScreen';
import {SCREEN_REGISTER} from './index';
import {AuthContext} from '../../../App';

export const LoginScreen = ({navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');

  const {signIn} = React.useContext(AuthContext);

  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await signIn({
        email: email,
        password: password,
      });
      /*
      const response = await Axios.post('login', {
        email: email,
        password: password,
      });
      navigation.reset({
        index: 0,
        routes: [{name: SCREEN_USER_INDEX}],
      });
      */
    } catch (e) {
      if ([400, 404].includes(e.response.status)) {
        setError(capitalizeFirst(e.response.data.error || 'User not found'));
      } else {
        setError('Something went wrong, try again later!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
          placeholder="Your email address"
          editable={!isSubmitting}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.input}
          placeholder="Your password"
          autoComplete="password"
          textContentType="password"
          secureTextEntry={true}
          editable={!isSubmitting}
        />
      </View>
      <Button onPress={onSubmit} title="Login" disabled={isSubmitting} />
      <Pressable
        disabled={isSubmitting}
        onPress={() => navigation.navigate(SCREEN_REGISTER)}>
        <Text style={styles.textRegister}>Don't have an account? Register</Text>
      </Pressable>
      {isSubmitting && (
        <Spinner
          position="inline-center"
          loadingText="Logging in user..."
          size="small"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    color: 'grey',
    marginBottom: 20,
  },
  error: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffe6bb',
    borderRadius: 5,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textRegister: {
    textAlign: 'center',
    padding: 25,
    color: '#32328f',
  },
});
