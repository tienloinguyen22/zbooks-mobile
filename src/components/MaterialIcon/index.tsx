import React from 'react';
import { Icon as NativeBaseIcon, NativeBase } from 'native-base';

export const MaterialIcon = (props: NativeBase.Icon): JSX.Element => (
  <NativeBaseIcon type={'MaterialCommunityIcons'} {...props} />
);
