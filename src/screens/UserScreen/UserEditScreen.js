import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Image, Alert,
} from 'react-native';
import Axios from '../../libraries/Axios';
import {Spinner} from '../../components/Spinner';
import {Button} from '../../components/Button';
import {SCREEN_USER_INDEX} from './index';
import {launchImageLibrary} from 'react-native-image-picker';

const UserEditScreen = ({navigation, route}) => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [avatar, setAvatar] = useState('');
  const {id} = route.params;

  useEffect(() => {
    setIsFetching(true);
    const fetchUser = async () => {
      const data = await Axios.get(`users/${id}`);
      const response = data.data.data;
      setUser(response);
      setIsFetching(false);
      setName(`${response.first_name} ${response.last_name}`);
      setEmail(response.email);
      setAvatar(response.avatar);
      navigation.setOptions({
        title: `Edit ${response.first_name} ${response.last_name}`,
      });
    };
    fetchUser().catch(error => {
      if (error.response.status === 404) {
        Alert.alert(
          'Not Found',
          `User ${route.params.name} is not found, try again later!`,
          [{text: 'Go Back', onPress: () => navigation.goBack()}],
        );
      }
    });
  }, [id, navigation]);

  const onSubmit = async () => {
    setIsSubmitting(true);
    const response = await Axios.put(`users/${id}`, {
      name: name,
      job: job,
    });
    setIsSubmitting(false);
    navigation.navigate({
      name: SCREEN_USER_INDEX,
      params: {
        payload: {
          type: 'user-updated',
          response: response.data,
          user: {
            id: user.id,
            first_name: name,
            last_name: '',
            email: email,
            avatar: avatar,
          },
        },
      },
    });
  };

  const onPickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 800,
      quality: 0.8,
    });
    if (result.errorCode) {
      alert('Something went wrong, check permission');
    } else {
      if (!result.didCancel && result.assets) {
        setAvatar(result.assets[0].uri);
      }
    }
  };

  if (isFetching) {
    return <Spinner position="middle-block" />;
  }

  return (
    <ScrollView style={styles.sectionContainer}>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          onChangeText={text => setName(text)}
          value={name}
          style={styles.input}
          placeholder="Input the name"
          placeholderTextColor='#b3b3b3'
          editable={!isSubmitting}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
          placeholder="Input email address"
          placeholderTextColor='#b3b3b3'
          editable={!isSubmitting}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Job</Text>
        <TextInput
          onChangeText={text => setJob(text)}
          value={job}
          style={styles.input}
          placeholder="Input job title"
          placeholderTextColor='#b3b3b3'
          editable={!isSubmitting}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Avatar</Text>
        {avatar && (
          <Image style={styles.avatarPreview} source={{uri: avatar}} />
        )}
        <Button
          onPress={onPickImage}
          title="Change Image"
          buttonStyle={styles.buttonPickImage}
          disabled={isSubmitting}
        />
      </View>
      <Button onPress={onSubmit} title="Update User" disabled={isSubmitting} />
      {isSubmitting && (
        <Spinner
          position="inline-center"
          loadingText="Updating user..."
          size="small"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
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
  buttonPickImage: {
    width: 150,
    backgroundColor: '#333333',
  },
  avatarPreview: {
    width: '70%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default UserEditScreen;
