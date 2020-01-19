import { Dimensions, Platform } from 'react-native';
import * as AndroidDimensions from 'react-native-extra-dimensions-android';

export interface Layouts {
  deviceWidth: number;
  deviceHeight: number;
  inPortraitMode: boolean;
}

export const getLayout = (): Layouts => {
  const { width } = Dimensions.get('window');
  const height = Platform.OS === 'ios' ? Dimensions.get('window').height : AndroidDimensions.get('REAL_WINDOW_HEIGHT');
  const inPortraitMode = width < height;

  return {
    deviceWidth: width,
    deviceHeight: height,
    inPortraitMode,
  };
};
