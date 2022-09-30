import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Alert, Image} from 'react-native';
import {CardFlushItem} from '../../components/Card';
import Axios from '../../libraries/Axios';
import {Spinner} from '../../components/Spinner';

const UserViewScreen = ({route, navigation}) => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const {id} = route.params;

  useEffect(() => {
    setIsFetching(true);
    const fetchUser = async () => {
      const data = await Axios.get(`users/${id}`);
      const response = data.data.data;
      setUser(response);
      setIsFetching(false);
      navigation.setOptions({
        title: `${response.first_name} ${response.last_name}`,
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

  const renderUser = () => (
    <>
      <CardFlushItem name="First Name" value={user.first_name} />
      <CardFlushItem name="Last Name" value={user.last_name} />
      <CardFlushItem name="Email Address" value={user.email} />
      <CardFlushItem
        name="Avatar"
        value={<Image style={styles.avatar} source={{uri: user.avatar}} />}
      />
    </>
  );

  return isFetching ? (
    <Spinner position="middle-block" />
  ) : (
    <ScrollView style={styles.sectionContainer}>
      {user && renderUser()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 32,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default UserViewScreen;
