import React, { ReactNode } from 'react';
import { navigationService } from '@app/services';
import { colors, commonStyles } from '@app/core';
import { useTheme } from '@app/hooks';
import { StatusBar, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
}

export const Container = (props: Props): JSX.Element => {
  const { screenBackgroundColor } = useTheme();
  const goBack = (): void => {
    props.componentId &&
      navigationService.goBack({
        componentId: props.componentId,
      });
  };

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
              style={[
                styles.header,
                commonStyles.boxShadow,
                {
                  backgroundColor: screenBackgroundColor,
                },
              ]}
            >
              {props.showBackButton && (
                <Button transparent style={styles.backButton} onPress={goBack}>
                  <Icon name='arrow-left' color={colors.primaryColor} style={styles.icon} />
                </Button>
              )}
              <Text h6 bold>
                {props.headerTitle}
              </Text>
              <Right />
            </View>
          )}

          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              flex={props.flex}
              column={props.column}
              row={props.row}
              columnReverse={props.columnReverse}
              rowReverse={props.rowReverse}
              center={props.center}
              centerVertical={props.centerVertical}
              style={{
                backgroundColor: screenBackgroundColor,
              }}
            >
              {props.children}
            </View>
          </TouchableWithoutFeedback>
        </ErrorBoundary>
      </SafeAreaView>
    </>
  );
};
