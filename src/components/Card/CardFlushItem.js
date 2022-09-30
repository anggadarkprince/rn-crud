import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function CardSimpleList(props) {
  return (
    <View style={styles.container} onPress={props.onPress}>
      <Text style={styles.name}>{props.name}</Text>
      <View style={styles.value}>
        {typeof props.value === 'string' ? (
          <Text style={styles.valueText}>{props.value}</Text>
        ) : (
          props.value
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  name: {fontWeight: 'bold', color: 'black', paddingEnd: 10, flex: 1},
  value: {flex: 2, alignItems: 'flex-end'},
  valueText: {color: 'black', textAlign: 'right'},
});

export default CardSimpleList;
