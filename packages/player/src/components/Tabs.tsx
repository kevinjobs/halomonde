import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  tab: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopColor: '#111',
    borderTopWidth: 1,
    height: 56,
  },
  tabItem: {
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemText: {
    fontSize: 12,
  },
});

export default function Tabs() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <View style={styles.tab}>
      <View style={styles.tabItem}>
        <Tab
          idx={0}
          icon="home"
          label="home"
          selected={selectedIdx === 0}
          onPress={idx => setSelectedIdx(idx)}
        />
      </View>
      <View style={styles.tabItem}>
        <Tab
          idx={1}
          icon="home"
          label="home"
          selected={selectedIdx === 1}
          onPress={idx => setSelectedIdx(idx)}
        />
      </View>
    </View>
  );
}

function Tab({
  idx,
  icon,
  label,
  selected = false,
  onPress,
}: {
  idx: number;
  icon: string;
  label: string;
  selected?: boolean;
  onPress(idx: number): void;
}) {
  return (
    <Pressable onPress={() => onPress(idx)}>
      <View>
        <Icon name={icon} size={24} color={selected ? 'red' : '#111'} />
      </View>
      <View>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.tabItemText,
            color: selected ? 'red' : '#111',
          }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
