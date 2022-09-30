import React, {useEffect, useState, useCallback, useRef} from 'react';
import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import {CardSimpleItem} from '../../components/Card';
import {Button} from '../../components/Button';
import {ActionBottomSheet} from '../../components/BottomSheet';
import Axios from '../../libraries/Axios';
import {SCREEN_USER_CREATE, SCREEN_USER_EDIT, SCREEN_USER_VIEW} from './index';
import {Spinner} from '../../components/Spinner';

const UserIndexScreen = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const bottomSheetRef = useRef(null);

  const fetchUsers = useCallback(async () => {
    //const response = await fetch('https://reqres.in/api/users');
    //const data = await response.json();
    setIsFetching(true);
    const data = await Axios.get(`users?page=${page}&per_page=10`);

    setUsers(data.data.data);
    setIsFetching(false);
  }, []);

  const updateUser = useCallback(
    (type, user) => {
      const index = users.findIndex(item => item.id === user.id);
      if (['user-created', 'user-updated'].includes(type)) {
        if (index >= 0) {
          setUsers(lastUsers => [
            ...lastUsers.slice(0, index),
            {...lastUsers[index], ...user},
            ...lastUsers.slice(index + 1),
          ]);
        } else if ('user-created') {
          setUsers(lastUsers => [user, ...lastUsers]);
        }
      }
    },
    [users],
  );

  useEffect(() => {
    const payload = route.params?.payload;
    if (payload) {
      updateUser(payload.type, payload.user);
    } else {
      fetchUsers();
    }
  }, [route.params?.payload]);

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
            onPress={() => onView(item)}
            onLongPress={() => onOpenBottomSheet(item)}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={fetchUsers}
        refreshing={isFetching}
      />
    );
  };

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      console.log('handleSheetChanges', index);
    }
  }, []);

  const onOpenBottomSheet = user => {
    bottomSheetRef.current.expand();
    setSelectedUser(user);
  };

  const onView = user => {
    navigation.navigate(SCREEN_USER_VIEW, {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
    });
  };

  const onEdit = user => {
    navigation.navigate(SCREEN_USER_EDIT, {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
    });
  };

  const onDelete = user => {
    Alert.alert(
      'Delete User',
      `Are you sure want to delete user ${user.first_name} ${user.last_name}?`,
      [
        {text: 'Close', style: 'cancel'},
        {
          text: 'Cancel',
          onPress: () => {
            bottomSheetRef.current.expand();
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUsers(lastUsers =>
              lastUsers.filter(item => item.id !== user.id),
            );
          },
        },
      ],
      {cancelable: true},
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
          />
        </View>
      </View>
      {isFetching ? <Spinner position="inline-center" /> : renderUserList()}

      <ActionBottomSheet
        actionRef={bottomSheetRef}
        actionTitle="Select Action"
        actionClose="Cancel"
        actions={[
          {
            action: 'View Details',
            onPress: () => onView(selectedUser),
            closeOnPress: true,
          },
          {
            action: 'Edit User',
            onPress: () => onEdit(selectedUser),
            closeOnPress: true,
          },
          {
            action: 'Delete User',
            onPress: () => onDelete(selectedUser),
            closeOnPress: true,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingTop: 20,
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
