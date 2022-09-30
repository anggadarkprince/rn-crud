import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, Text, View, FlatList, Alert, Pressable} from 'react-native';
import {CardSimpleItem} from '../../components/Card';
import {Button, TransparentButton} from '../../components/Button';
import Axios from '../../libraries/Axios';
import {SCREEN_USER_CREATE, SCREEN_USER_EDIT, SCREEN_USER_VIEW} from './index';
import {Spinner} from '../../components/Spinner';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Divider} from "../../components/Utility";

const UserIndexScreen = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const fetchUsers = useCallback(async () => {
    //const response = await fetch('https://reqres.in/api/users');
    //const data = await response.json();
    setIsFetching(true);
    const data = await Axios.get('users');

    setUsers(data.data.data);
    setIsFetching(false);
  }, []);

  const updateUser = useCallback(
    (type, user) => {
      const index = users.findIndex(item => item.id === user.id);
      if (type === 'user-created') {
        if (index >= 0) {
          setUsers(lastUsers => [
            ...lastUsers.slice(0, index),
            {...lastUsers[index], ...user},
            ...lastUsers.slice(index + 1),
          ]);
        } else {
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
    bottomSheetRef.current.close();
    setTimeout(() => {
      Alert.alert(
        'Delete User',
        `Are you sure want to delete user ${user.first_name} ${user.last_name}?`,
        [
          {text: 'Cancel', style: 'cancel'},
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
    }, 200);
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['25%', '50%']}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 5,
        }}
        handleStyle={{paddingTop: 20, paddingBottom: 10}}
        handleIndicatorStyle={{backgroundColor: '#ccc'}}
        handleHeight={24}
        backdropComponent={renderBackdrop}>
        <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>USER ACTION</Text>
          <TransparentButton
            title="View Detail"
            onPress={() => onView(selectedUser)}
          />
          <Divider />
          <TransparentButton
            title="Edit User"
            onPress={() => onEdit(selectedUser)}
          />
          <Divider />
          <TransparentButton
            title="Delete User"
            onPress={() => onDelete(selectedUser)}
          />
          <Divider />
          <TransparentButton
            title="Cancel"
            onPress={() => bottomSheetRef.current.close()}
          />
        </View>
      </BottomSheet>
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
  actionContainer: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 3,
    color: '#cbcbcb',
  },
});

export default UserIndexScreen;
