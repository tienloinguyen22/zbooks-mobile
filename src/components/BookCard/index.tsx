import React from 'react';
import { commonStyles } from '@app/core';
import { View, Image, Text } from '@app/components';
import { styles } from './styles';
import { Touchable } from '../Touchable';

interface LargeProps {
  coverUrl: string;
  onPress?: () => void;
}

interface SmallProps {
  coverUrl: string;
  title: string;
  author: string;
  onPress?: () => void;
}

const Large = (props: LargeProps): JSX.Element => {
  return (
    <Touchable onPress={props.onPress}>
      <View style={[styles.coverContainer, commonStyles.boxShadow]}>
        <Image
          source={{
            uri: props.coverUrl,
          }}
          style={styles.largeImage}
        />
      </View>
    </Touchable>
  );
};

const Small = (props: SmallProps): JSX.Element => {
  return (
    <Touchable onPress={props.onPress}>
      <View style={styles.smallContainer}>
        <View style={[styles.coverContainer, commonStyles.boxShadow]}>
          <Image
            source={{
              uri: props.coverUrl,
            }}
            style={styles.smallImage}
          />
        </View>

        <View style={styles.nameContainer}>
          <Text bold numberOfLines={2}>
            {props.title}
          </Text>
          <Text s2 style={styles.author} numberOfLines={1}>
            {props.author}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

export const BookCard = {
  Large,
  Small,
};
