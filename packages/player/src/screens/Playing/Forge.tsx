import React, {useRef, useState} from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export type ForgeProps = {
  onPause?: () => void;
  onPlay?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  isPlaying?: boolean;
};

const styles = StyleSheet.create({
  wrapper: {},
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: 64,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Forge({
  onPause,
  onPlay,
  onPrev,
  onNext,
  isPlaying,
}: ForgeProps) {
  const [isInnerPlaying, setIsInnerPlaying] = useState(false);

  const playingRef = useRef(isPlaying);

  const playing = playingRef.current === isPlaying ? isInnerPlaying : isPlaying;

  const handlePlayOrPause = () => {
    if (playing) {
      if (onPause) {
        onPause();
      } else {
        setIsInnerPlaying(false);
      }
    } else {
      if (onPlay) {
        onPlay();
      } else {
        setIsInnerPlaying(true);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.controls}>
        <Pressable onPress={onPrev} style={styles.button}>
          <Icon name="backward-step" size={24} color={'#333'} />
        </Pressable>
        <Pressable onPress={handlePlayOrPause} style={styles.button}>
          {playing ? (
            <Icon name="pause" size={32} color={'#111'} />
          ) : (
            <Icon name="play" size={28} color={'#111'} />
          )}
        </Pressable>
        <Pressable onPress={onNext} style={styles.button}>
          <Icon name="forward-step" size={24} color={'#111'} />
        </Pressable>
      </View>
    </View>
  );
}
