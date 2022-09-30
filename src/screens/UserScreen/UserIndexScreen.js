import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {CardSimpleItem} from '../../components/Card';
import Axios from '../../libraries/Axios';
import {SCREEN_USER_CREATE, SCREEN_USER_VIEW} from './index';
import {Spinner} from '../../components/Spinner';

const UserIndexScreen = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchUsers = async () => {
    //const response = await fetch('https://reqres.in/api/users');
    //const data = await response.json();
    setIsFetching(true);
    const data = await Axios.get('users');

    setUsers(data.data.data);
    setIsFetching(false);
  };

  useEffect(() => {
    const newUser = route.params?.newUser;
    if (newUser) {
      console.log(newUser);
      setUsers(lastUsers => [newUser, ...lastUsers]);
    } else {
      fetchUsers();
    }
  }, [route.params?.newUser]);

  const renderUserList = () => {
    return (
      <FlatList
        data={users}
        renderItem={({item}) => (
          <CardSimpleItem
            key={`user-${item.id}`}
            title={`${item.first_name} ${item.last_name}`}
            description={item.email}
            image={item.avatar}
            onPress={() =>
              navigation.navigate(SCREEN_USER_VIEW, {
                id: item.id,
                name: `${item.first_name} ${item.last_name}`,
              })
            }
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={fetchUsers}
        refreshing={isFetching}
      />
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionTitleWrapper}>
        <Text style={styles.sectionTitle}>Users</Text>
        <View>
          <Button
            onPress={() => navigation.navigate(SCREEN_USER_CREATE)}
            title="Create User"
            color="#841584"
          />
        </View>
      </View>
      {isFetching ? <Spinner position="inline-center" /> : renderUserList()}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
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
});

export default UserIndexScreen;
