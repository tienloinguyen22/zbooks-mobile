/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Platform } from 'react-native';
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import { config } from '@app/config';
import { Icon, Button } from '@app/components';

const styles = StyleSheet.create({
  scrollView: { backgroundColor: Colors.lighter },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: { backgroundColor: Colors.white },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: { fontWeight: '700' },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const App = (): JSX.Element => {
  const [effectLoaded, setEffectLoaded] = useState(false);
  const [showHello, setShowHello] = useState(false);

  useEffect((): void => {
    setEffectLoaded(true);
    SplashScreen.hide();
  }, []);

  const onPressHello = (): void => setShowHello(true);

  return (
    <Fragment>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
          <Header />
          {(global as any).HermesInternal == null ? null : ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Effect loaded: {effectLoaded ? 'true' : 'false'}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle} testID=''>
                Icon
                <Icon name='home' />
                <Icon ios='ios-menu' android='md-menu' name='home' style={{ fontSize: 20, color: 'red' }} />
                <Icon type='FontAwesome' name='home' />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle} testID=''>
                Version: {Platform.OS === 'android' ? config.android.version : config.ios.version}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Platform: {Platform.OS}</Text>
            </View>
            <Button success onPress={onPressHello}>
              <Text> Hello </Text>
            </Button>
            {showHello && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Hello world</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
