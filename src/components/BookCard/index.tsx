import React from 'react';
import { commonStyles } from '@app/core';
import { View, Image, Text } from '@app/components';
import { styles } from './styles';
import { Touchable } from '../Touchable';

interface LargeProps {
  coverUrl: string;
  title?: string;
  author?: string;
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
    <Touchable onPress={props.onPress} style={styles.touchable}>
      <View style={[styles.largeCoverContainer, commonStyles.boxShadow]}>
        <Image
          source={{
            uri: props.coverUrl,
          }}
          style={styles.largeImage}
        />
      </View>

      {props.author || props.title ? (
        <View style={styles.nameContainer}>
          {props.title ? (
            <Text textCenter bold numberOfLines={2}>
              {props.title}
            </Text>
          ) : (
            <></>
          )}
          {props.author ? (
            <Text textCenter s2 style={styles.author} numberOfLines={1}>
              {props.author}
            </Text>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )}
    </Touchable>
  );
};

const Small = (props: SmallProps): JSX.Element => {
  return (
    <Touchable onPress={props.onPress}>
      <View style={styles.smallContainer}>
        <View style={[styles.smallCoverContainer, commonStyles.boxShadow]}>
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
