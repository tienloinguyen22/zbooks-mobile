import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { ListItem } from '../ListItem';
import { Text } from '../Text';
import { Left } from '../Left';
import { Right } from '../Right';
import { styles } from './styles';
import { MaterialIcon } from '../MaterialIcon';

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

const HeaderItem = ({ item }: { item: ListItemData }) => {
  return (
    <ListItem itemDivider onPress={item.onPress}>
      <Left>
        <Text style={styles.header}>{item.title}</Text>
      </Left>
      <Right />
    </ListItem>
  );
};

const Item = ({ item }: { item: ListItemData }) => {
  return (
    <ListItem onPress={item.onPress}>
      <Left>
        <Text>{item.title}</Text>
      </Left>
      <Right style={styles.right}>
        {item.showIcon && <MaterialIcon name={item.icon || 'chevron-right'} style={styles.icon} />}
        <Text style={styles.value}>{item.value}</Text>
      </Right>
    </ListItem>
  );
};

const renderItem: ListRenderItem<ListItemData> = ({ item }) => {
  if (item.isHeader) {
    return <HeaderItem item={item} />;
  }
  return <Item item={item} />;
};

const getStickyHeaderIndices = (data: ListItemData[]) => {
  let stickyHeaderIndices = [];
  data.map((obj) => {
    if (obj.isHeader) {
      stickyHeaderIndices.push(data.indexOf(obj));
    }
  });
  stickyHeaderIndices.push(0);
  return stickyHeaderIndices;
};

export const List = ({ data }: Props) => {
  let stickyHeaderIndices = getStickyHeaderIndices(data);
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      stickyHeaderIndices={stickyHeaderIndices}
    />
  );
};
