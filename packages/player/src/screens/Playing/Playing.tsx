import React from 'react';
import {View, StyleSheet} from 'react-native';
import Info from './Info';
import Forge from './Forge';
import Seeker from './Seeker';
import Cover from './Cover';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'pink',
    height: '100%',
  },
  container: {},
  cover: {
    width: '80%',
  },
  info: {
    paddingVertical: 20,
    flex: 1,
  },
  seeker: {
    height: 40,
  },
  controls: {
    paddingVertical: 40,
  },
});

const MOCK_TRACK = {
  title: 'Mock Track',
  artist: {
    name: 'Mock Artist',
  },
  album: {
    title: 'Mock Album',
    artist: {
      name: 'Mock Artist',
    },
  },
  duration: 1000,
  cover: 'hello',
};

export default function Playing() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.cover}>
          <Cover src="https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF" />
        </View>
        <View style={styles.info}>
          <Info
            track={MOCK_TRACK}
            lyricText="What you are singing is My favorite song"
          />
        </View>
        <View style={styles.seeker}>
          <Seeker />
        </View>
        <View style={styles.controls}>
          <Forge />
        </View>
      </View>
    </View>
  );
}
