import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export type BackgroundProps = {
  src: string;
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  back: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    borderRadius: 8,
  },
  mask: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: -1,
    borderRadius: 8,
  },
});

export default function Background({src, children}: BackgroundProps) {
  return (
    <View>
      <View style={styles.container}>
        <Image source={{uri: src}} style={styles.back} />
        <View style={styles.mask} />
        <View>{children}</View>
      </View>
    </View>
  );
}
