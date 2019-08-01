import React, { ReactNode } from 'react';
import { Left } from '../Left';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import { Body } from '../Body';
import { Title } from '../Title';
import { Right } from '../Right';
import { ErrorBoundary } from '../ErrorBoundary';
import { View } from '../View';
import { navigationService } from '@app/services';
import { colors } from '@app/core';
import { styles } from './styles';
import { StatusBar, SafeAreaView } from 'react-native';

interface Props {
  componentId?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  children?: ReactNode;
}
export const Container = ({ children, showHeader, showBackButton, headerTitle, componentId }: Props) => {
  const goBack = () => {
    componentId && navigationService.goBack({ componentId });
  };
  console.log(showHeader ? 'light-content' : 'dark-content');
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
