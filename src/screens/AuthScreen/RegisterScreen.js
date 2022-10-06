import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Axios from '../../libraries/Axios';
import {Spinner} from '../../components/Spinner';
import {Button} from '../../components/Button';
import {SCREEN_USER_INDEX} from '../UserScreen';
import {AuthContext} from "../../../App";

export const RegisterScreen = ({navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('Angga Ari Wijaya');
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [confirmPassword, setConfirmPassword] = useState('cityslicka');

  const {signUp} = React.useContext(AuthContext);

  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await signUp({
        name: name,
        email: email,
        password: password,
      });
      /*
      const response = await Axios.post('register', {
        email: email,
        password: password,
      });
      console.log(response.data);
      navigation.reset({
        index: 0,
        routes: [{name: SCREEN_USER_INDEX}],
      });
       */
    } catch (e) {
      if ([400, 404].includes(e.response.status)) {
        setError(
          capitalizeFirst(e.response.data.error || 'User cannot be registered'),
        );
      } else {
        setError('Something went wrong, try again later!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create new account</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            onChangeText={text => setName(text)}
            value={name}
            style={styles.input}
            placeholder="Input your full name"
            editable={!isSubmitting}
          />
        </View>
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
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            style={styles.input}
            placeholder="Repeat the password"
            autoComplete="password"
            textContentType="password"
            secureTextEntry={true}
            editable={!isSubmitting}
          />
        </View>
        <Button onPress={onSubmit} title="Register" disabled={isSubmitting} />
        <Pressable disabled={isSubmitting} onPress={() => navigation.goBack()}>
          <Text style={styles.textLogin}>Already have an account? Login</Text>
        </Pressable>
        {isSubmitting && (
          <Spinner
            position="inline-center"
            loadingText="Creating new account..."
            size="small"
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
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
  textLogin: {
    textAlign: 'center',
    padding: 25,
    color: '#32328f',
  },
});
