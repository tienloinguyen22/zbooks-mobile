import React, { ReactNode } from 'react';
import { navigationService } from '@app/services';
import { colors } from '@app/core';
import { useTheme } from '@app/hooks';
import { StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { Button } from '../Button';
import { Right } from '../Right';
import { ErrorBoundary } from '../ErrorBoundary';
import { View } from '../View';
import { styles } from './styles';
import { Icon } from '../Icon';
import { Text } from '../Text';

interface Props {
  componentId?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  children?: ReactNode;
  flex?: number;
  center?: boolean;
  centerVertical?: boolean;
  row?: boolean;
  column?: boolean;
  rowReverse?: boolean;
  columnReverse?: boolean;
  rightIcon?: string;
  rightIconColor?: string;
  loading?: boolean;
  onRightButtonPress?: () => void;
}

export const Container = (props: Props): JSX.Element => {
  const { screenBackgroundColor } = useTheme();
  const goBack = (): void => {
    props.componentId &&
      navigationService.goBack({
        componentId: props.componentId,
      });
  };

  let rightItem = <Right />;
  if (props.loading) {
    rightItem = (
      <Button transparent style={styles.backButton} onPress={props.onRightButtonPress}>
        <ActivityIndicator size='small' color={colors.link} />
      </Button>
    );
  } else if (props.rightIcon) {
    rightItem = (
      <Button transparent style={styles.backButton} onPress={props.onRightButtonPress}>
        <Icon name={props.rightIcon} color={props.rightIconColor || colors.primaryColor} style={styles.icon} />
      </Button>
    );
  }

  return (
    <>
      <SafeAreaView style={[styles.rootContainerBackground]} />
      <SafeAreaView
        style={[
          styles.rootContainer,
          {
            backgroundColor: screenBackgroundColor,
          },
        ]}
      >
        <ErrorBoundary>
          <StatusBar translucent={true} backgroundColor={colors.lightBackgroundColor} barStyle='dark-content' />
          {props.showHeader && (
            <View
              spread
              style={[
                styles.header,
                {
                  backgroundColor: screenBackgroundColor,
                },
              ]}
            >
              <View row centerVertical>
                {props.showBackButton && (
                  <Button transparent style={styles.backButton} onPress={goBack}>
                    <Icon name='arrow-left' color={colors.primaryColor} style={styles.icon} />
                  </Button>
                )}
                <Text h4 bold style={styles.headerText} numberOfLines={1}>
                  {props.headerTitle}
                </Text>
              </View>
              {rightItem}
            </View>
          )}
          <View style={styles.contentContainer}>
            <View
              flex={props.flex}
              column={props.column}
              row={props.row}
              columnReverse={props.columnReverse}
              rowReverse={props.rowReverse}
              center={props.center}
              centerVertical={props.centerVertical}
              style={[
                {
                  backgroundColor: screenBackgroundColor,
                },
                styles.rootContainer,
              ]}
            >
              {props.children}
            </View>
          </View>
        </ErrorBoundary>
      </SafeAreaView>
    </>
  );
};
