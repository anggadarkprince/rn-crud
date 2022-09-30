import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

const Spinner = ({position, size, loadingText}) => {
  const wrapperClass = [];
  switch (position) {
    case 'inline-center':
      wrapperClass.push(styles.inlineCenter);
      wrapperClass.push(styles.containerInline);
      break;
    case 'middle-block':
      wrapperClass.push(styles.containerMiddleBlock);
      break;
    default:
      wrapperClass.push(styles.containerInline);
      break;
  }
  return (
    <View style={wrapperClass}>
      <ActivityIndicator size={size || 'large'} color="#841584" />
      {loadingText && <Text style={styles.loadingText}>{loadingText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  containerMiddleBlock: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  containerInline: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineCenter: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginStart: 10,
    color: 'black',
  },
});

export {Spinner};
