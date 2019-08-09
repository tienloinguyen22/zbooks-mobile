import React, { ReactNode } from 'react';
import { navigationService } from '@app/services';
import { colors } from '@app/core';
import { StatusBar, SafeAreaView } from 'react-native';
import { Left } from '../Left';
import { Button } from '../Button';
import { Body } from '../Body';
import { Title } from '../Title';
import { Right } from '../Right';
import { ErrorBoundary } from '../ErrorBoundary';
import { View } from '../View';
import { styles } from './styles';
import { Icon } from '../Icon';

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
  const goBack = (): void => {
    props.componentId &&
      navigationService.goBack({
        componentId: props.componentId,
      });
  };

  return (
    <>
      <SafeAreaView style={styles.rootContainerBackground} />
      <SafeAreaView style={styles.rootContainer}>
        <ErrorBoundary>
          <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
          {props.showHeader && (
            <View style={styles.header}>
              <Left>
                {props.showBackButton && (
                  <Button transparent onPress={goBack}>
                    <Icon name='chevron-left' color={colors.white} style={styles.icon} />
                  </Button>
                )}
              </Left>
              <Body style={styles.headerText}>
                <Title style={styles.title}>{props.headerTitle}</Title>
              </Body>
              <Right />
            </View>
          )}
          <View
            flex={props.flex}
            column={props.column}
            row={props.row}
            columnReverse={props.columnReverse}
            rowReverse={props.rowReverse}
            center={props.center}
            centerVertical={props.centerVertical}
          >
            {props.children}
          </View>
        </ErrorBoundary>
      </SafeAreaView>
    </>
  );
};
