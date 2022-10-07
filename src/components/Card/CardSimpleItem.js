import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

function CardSimpleItem(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, props.style]}
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
      {props.image && (
        <Image style={styles.image} source={{uri: props.image}} />
      )}
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </View>
      {props.buttonAction && (
        <Pressable style={styles.actionButton} onPress={props.actionOnPress}>
          <Text style={styles.actionText}>⋮</Text>
        </Pressable>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: 'cover',
    marginEnd: 10,
  },
  title: {fontWeight: 'bold', fontSize: 16, color: 'black'},
  description: {color: '#666'},
  actionButton: {
    marginStart: 'auto',
  },
  actionText: {
    fontSize: 20,
    paddingVertical: 5,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CardSimpleItem;
