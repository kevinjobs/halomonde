import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export type CoverProps = {
  src: string;
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#999',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cover: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
});

export default function Cover({src}: CoverProps) {
  return (
    <View style={styles.wrapper}>
      <Image source={{uri: src}} style={styles.cover} />
    </View>
  );
}
