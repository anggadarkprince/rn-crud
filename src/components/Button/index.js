import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

const Button = ({onPress, disabled, buttonStyle, textStyle, title}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        pressed ? styles.buttonPressed : {},
        buttonStyle,
        disabled ? styles.buttonDisabled : {},
      ]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const TransparentButton = ({
  onPress,
  disabled,
  buttonStyle,
  textStyle,
  title,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.buttonTransparent,
        pressed ? styles.buttonTransparentPressed : {},
        buttonStyle,
      ]}>
      <Text style={[styles.buttonTextTransparent, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
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
  buttonTransparent: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: '#600b60',
  },
  buttonDisabled: {
    backgroundColor: '#b160b1',
  },
  buttonTransparentPressed: {
    backgroundColor: '#e2e2e2',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonTextTransparent: {
    color: 'black',
    textAlign: 'center',
  },
});

export {Button, TransparentButton};
