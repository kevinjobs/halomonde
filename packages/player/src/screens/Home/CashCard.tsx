import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {DataItem} from './Home';

export type CashCardProps = {
  data: DataItem;
  onPress: (data: DataItem) => void;
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: 5,
    zIndex: -1,
  },
  year: {
    fontSize: 88,
    color: '#e0dbdb',
    opacity: 0.35,
    width: '100%',
    position: 'relative',
    bottom: -16,
    marginLeft: 12,
  },
  mask: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  desc: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  other: {
    flexGrow: 1,
  },
  date: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  month: {
    fontSize: 56,
    color: '#cfcfcf',
    height: 72,
  },
});

export default function CashCard({data, onPress}: CashCardProps) {
  const MONTH: Record<string, string> = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十',
    11: '十一',
    12: '十二',
  };
  const month = data.date.getMonth() + 1;
  const year = data.date.getFullYear();
  const url = 'https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF';

  const handlePress = () => {
    onPress(data);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Image source={{uri: url}} style={styles.background} />
        <Text style={styles.year}>{year}</Text>
        <View style={styles.mask} />
        <View style={styles.desc}>
          <View style={styles.other}>
            <Text> </Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.month}>{MONTH[month] + '月'}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
