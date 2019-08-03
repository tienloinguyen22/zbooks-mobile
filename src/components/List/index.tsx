import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { colors } from '@app/core';
import { ListItem } from '../ListItem';
import { Text } from '../Text';
import { Left } from '../Left';
import { Right } from '../Right';
import { styles } from './styles';
import { Icon } from '../Icon';

interface Props {
  data: ListItemData[];
}

export interface ListItemData {
  title: string;
  value?: string;
  isHeader?: boolean;
  showIcon?: boolean;
  icon?: string;
  isPicker?: boolean;
  onPress?: () => void;
}

const HeaderItem = ({ item }: { item: ListItemData }): JSX.Element => (
  <ListItem itemDivider onPress={item.onPress}>
    <Left>
      <Text style={styles.header}>{item.title}</Text>
    </Left>
    <Right />
  </ListItem>
);

const Item = ({ item }: { item: ListItemData }): JSX.Element => (
  <ListItem onPress={item.onPress}>
    <Left>
      <Text>{item.title}</Text>
    </Left>
    <Right style={styles.right}>
      {item.showIcon && <Icon name={item.icon || 'chevron-right'} color={colors.lightGrey} size={18} />}
      <Text style={styles.value}>{item.value}</Text>
    </Right>
  </ListItem>
);

const renderItem: ListRenderItem<ListItemData> = ({ item }: { item: ListItemData }): JSX.Element => {
  if (item.isHeader) {
    return <HeaderItem item={item} />;
  }
  return <Item item={item} />;
};

const getStickyHeaderIndices = (data: ListItemData[]): number[] => {
  const stickyHeaderIndices = [];
  data.forEach((obj) => {
    if (obj.isHeader) {
      stickyHeaderIndices.push(data.indexOf(obj));
    }
  });
  stickyHeaderIndices.push(0);
  return stickyHeaderIndices;
};

export const List = ({ data }: Props): JSX.Element => {
  const stickyHeaderIndices = getStickyHeaderIndices(data);
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      stickyHeaderIndices={stickyHeaderIndices}
    />
  );
};
