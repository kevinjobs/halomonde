import React from 'react';
import {DataItem} from './Home';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {toMonthString} from '../../utils';
import {Background} from '../../components';
import CashItem from './CashItem';

type CashStatProps = {
  data: DataItem;
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: '100%',
    width: '100%',
  },
  header: {
    width: '100%',
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 60,
    color: '#d9d9d96f',
    fontWeight: '600',
  },
});

const MOCKS = [
  {
    title: '南京银行',
    logo: require('../../resources/img/nanjing.jpg'),
    account: 'nanjing',
    items: [
      {
        title: '存款',
        amount: 100.33,
      },
      {
        title: '理财',
        amount: 100000.13,
      },
      {
        title: '活期',
        amount: 11234.78,
      },
    ],
  },
  {
    title: '南京银行',
    logo: require('../../resources/img/nanjing.jpg'),
    account: 'nanjing',
    items: [
      {
        title: '存款',
        amount: 100,
      },
    ],
  },
  {
    title: '南京银行',
    logo: require('../../resources/img/nanjing.jpg'),
    account: 'nanjing',
    items: [
      {
        title: '存款',
        amount: 100,
      },
    ],
  },
  {
    title: '南京银行',
    logo: require('../../resources/img/nanjing.jpg'),
    account: 'nanjing',
    items: [
      {
        title: '存款',
        amount: 100,
      },
    ],
  },
  {
    title: '南京银行',
    logo: require('../../resources/img/nanjing.jpg'),
    account: 'nanjing',
    items: [
      {
        title: '存款',
        amount: 100,
      },
    ],
  },
  {
    title: '南京银行',
    logo: require('../../resources/img/nanjing.jpg'),
    account: 'nanjing',
    items: [
      {
        title: '存款',
        amount: 100,
      },
    ],
  },
  {
    title: '南京银行',
    logo: require('../../resources/img/nanjing.jpg'),
    account: 'nanjing',
    items: [
      {
        title: '存款',
        amount: 100,
      },
    ],
  },
];

export default function CashStat({data}: CashStatProps) {
  return (
    <View style={styles.container}>
      <Background src="https://t7.baidu.com/it/u=1819644070,1305753509&fm=193&f=GIF">
        <View style={styles.header}>
          <Text style={styles.title}>{toMonthString(data.date, 'cn')}</Text>
        </View>
      </Background>
      <FlatList data={MOCKS} renderItem={({item}) => <CashItem {...item} />} />
    </View>
  );
}
