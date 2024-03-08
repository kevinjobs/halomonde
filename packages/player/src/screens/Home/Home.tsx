import React, {useState} from 'react';
import {Modal, StyleSheet, View, FlatList} from 'react-native';

import CashCard from './CashCard';
import CashStat from './CashStat';

import {NoMore} from '../../components';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
  },
  list: {},
  modal: {
    backgroundColor: '#e6e6e6',
  },
});

export type DataItem = {
  uid: string;
  date: Date;
  onPress: (data: DataItem) => void;
};

export default function HomeScreen() {
  const [pick, setPick] = useState<DataItem | null>(null);

  const MOCKS: DataItem[] = [
    {
      uid: '1',
      date: new Date('2020-6'),
      onPress: (data: DataItem) => {
        setPick(data);
      },
    },
    {
      uid: '2',
      date: new Date('2020-11'),
      onPress: (data: DataItem) => {
        setPick(data);
      },
    },
    {
      uid: '3',
      date: new Date('2020-11'),
      onPress: (data: DataItem) => {
        setPick(data);
      },
    },
    {
      uid: '4',
      date: new Date('2020-12'),
      onPress: (data: DataItem) => {
        setPick(data);
      },
    },
    {
      uid: '5',
      date: new Date('2020-10'),
      onPress: (data: DataItem) => {
        setPick(data);
      },
    },
    {
      uid: '6',
      date: new Date('2020-9'),
      onPress: (data: DataItem) => {
        setPick(data);
      },
    },
    {
      uid: '7',
      date: new Date('2020-7'),
      onPress: (data: DataItem) => {
        setPick(data);
      },
    },
    {
      uid: '8',
      date: new Date('2020-8'),
      onPress: (data: DataItem) => {
        setPick(data);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={MOCKS}
        renderItem={({item}) => (
          <CashCard data={item} onPress={item.onPress} key={item.uid} />
        )}
        ListFooterComponent={<NoMore prompt="No More One..." />}
      />
      <Modal
        animationType="slide"
        visible={Boolean(pick)}
        onRequestClose={() => setPick(null)}>
        <View style={styles.modal}>{pick && <CashStat data={pick} />}</View>
      </Modal>
    </View>
  );
}
