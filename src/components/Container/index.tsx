import React, { ReactNode } from 'react';
import { navigationService } from '@app/services';
import { colors } from '@app/core';
import { StatusBar, SafeAreaView } from 'react-native';
import { Left } from '../Left';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import { Body } from '../Body';
import { Title } from '../Title';
import { Right } from '../Right';
import { ErrorBoundary } from '../ErrorBoundary';
import { View } from '../View';
import { styles } from './styles';

interface Props {
  componentId?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  children?: ReactNode;
}
export const Container = ({ children, showHeader, showBackButton, headerTitle, componentId }: Props): JSX.Element => {
  const goBack = (): void => {
    componentId && navigationService.goBack({ componentId });
  };

  return (
    <>
      <SafeAreaView style={styles.rootContainerBackground} />
      <SafeAreaView style={styles.rootContainer}>
        <ErrorBoundary>
          <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
          <View column style={styles.container}>
            {showHeader && (
              <View style={styles.header}>
                <Left>
                  {showBackButton && (
                    <Button transparent onPress={goBack}>
                      <MaterialIcon name='chevron-left' color={colors.white} style={styles.icon} />
                    </Button>
                  )}
                </Left>
                <Body>
                  <Title style={styles.title}>{headerTitle}</Title>
                </Body>
                <Right />
              </View>
            )}
            <View style={styles.body}>{children}</View>
          </View>
        </ErrorBoundary>
      </SafeAreaView>
    </>
  );
};
