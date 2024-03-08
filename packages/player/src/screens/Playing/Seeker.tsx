import React from 'react';
import {View} from 'react-native';

export type SeekerProps = {
  seek?: number;
  onSeek?: (seek: number) => void;
};

export default function Seeker({}: SeekerProps) {
  return (
    <View>
      <View></View>
    </View>
  );
}
