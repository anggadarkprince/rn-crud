import React from 'react';
import {View} from 'react-native';

const Divider = ({color, width}) => {
  return (
    <View
      style={{
        borderColor: color || '#e9e9e9',
        borderBottomWidth: width || 1,
      }}
    />
  );
};

export {Divider};
