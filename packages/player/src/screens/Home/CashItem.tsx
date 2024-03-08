import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

type CashItemProps = {
  logo?: any;
  account: string;
  title: string;
  items?: {
    title: string;
    amount: number;
  }[];
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
    position: 'relative',
  },
  logo: {
    height: 88,
    width: 88,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  accountTitle: {
    fontSize: 56,
    color: '#cccccc2e',
    fontWeight: '600',
    position: 'absolute',
    top: 0,
  },
  info: {
    backgroundColor: '#fff',
    flex: 1,
    height: 88,
    paddingLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  items: {},
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  itemTitle: {
    color: '#333',
  },
  itemAmount: {
    color: '#636363',
    marginLeft: 8,
  },
  itemTotal: {
    color: '#df0c0c',
  },
});

export default function CashItem({logo, items, title}: CashItemProps) {
  const total = React.useMemo(() => {
    let t = 0;
    if (items) {
      for (const item of items) {
        t += item.amount;
      }
    }
    return t;
  }, [items]);

  return (
    <View style={styles.wrapper}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.info}>
        <Text style={styles.accountTitle}>{title}</Text>
        <View style={styles.items}>
          {
            <View style={styles.item}>
              <Text style={[styles.itemTitle, styles.itemTotal]}>总计</Text>
              <Text style={[styles.itemAmount, styles.itemTotal]}>
                ￥{total}
              </Text>
            </View>
          }
          {items?.map(item => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemAmount}>￥{item.amount}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
