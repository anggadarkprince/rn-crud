import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TextInput = props => {
  const {label, defaultValue} = props;
  const [inputValue, setInputValue] = useState(defaultValue || '');

  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        onChangeText={text => setInputValue(text)}
        value={inputValue}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 10,
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export {TextInput};
