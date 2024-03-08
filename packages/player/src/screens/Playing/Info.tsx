import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Track} from '../../typings';

export type InfoProps = {
  track: Track;
  lyricText: string;
};

const styles = StyleSheet.create({
  wrapper: {},
  trackTitle: {
    color: '#111',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  trackArtist: {textAlign: 'center'},
  lyricText: {textAlign: 'center', paddingVertical: 8},
});

export default function Info({track, lyricText}: InfoProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.trackTitle}>{track.title}</Text>
      <Text style={styles.trackArtist}>{track.artist.name}</Text>
      <Text style={styles.lyricText}>{lyricText}</Text>
    </View>
  );
}
