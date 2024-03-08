import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    marginBottom: 16,
  },
  prompt: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default function NoMore({prompt}: {prompt: string}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.prompt}>{prompt}</Text>
    </View>
  );
}
