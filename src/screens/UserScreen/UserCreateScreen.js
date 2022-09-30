import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import Axios from '../../libraries/Axios';
import {Spinner} from '../../components/Spinner';
import {SCREEN_USER_INDEX} from './index';
import {launchImageLibrary} from 'react-native-image-picker';

const UserCreateScreen = ({navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [avatar, setAvatar] = useState('');

  const onSubmit = async () => {
    setIsSubmitting(true);
    /*fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: 'Angga',
        job: 'Programmer',
      },
    })
      .then(response => response.json())
      .then(json => setUsers(json.data));*/
    const response = await Axios.post('users', {
      name: name,
      job: job,
    });
    setIsSubmitting(false);
    navigation.navigate({
      name: SCREEN_USER_INDEX,
      params: {
        type: 'user-created',
        response: response.data,
        newUser: {
          id: response.data.id,
          first_name: name,
          last_name: '',
          email: email,
          avatar: avatar,
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
        console.log(result.assets);
        setAvatar(result.assets[0].uri);
      }
    }
  };

  return (
    <ScrollView style={styles.sectionContainer}>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          onChangeText={text => setName(text)}
          value={name}
          style={styles.input}
          placeholder="Input the name"
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
          editable={!isSubmitting}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Avatar</Text>
        {avatar && (
          <Image style={styles.avatarPreview} source={{uri: avatar}} />
        )}
        <TouchableOpacity
          onPress={onPickImage}
          disabled={isSubmitting}
          style={[styles.button, styles.buttonPickImage]}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onSubmit}
        title="Save User"
        disabled={isSubmitting}
        style={styles.button}>
        <Text style={styles.buttonText}>Save User</Text>
      </TouchableOpacity>
      {isSubmitting && (
        <Spinner
          position="inline-center"
          loadingText="Creating user..."
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
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonPickImage: {
    width: 100,
    backgroundColor: '#333333',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#731173',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  avatarPreview: {
    width: '70%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default UserCreateScreen;
