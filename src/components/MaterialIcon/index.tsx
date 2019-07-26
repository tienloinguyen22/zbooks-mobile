import React, { Component } from 'react';
import { Icon as NativeBaseIcon, NativeBase } from 'native-base';

interface Props extends NativeBase.Icon {}

export class MaterialIcon extends Component<NativeBase.Icon> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <NativeBaseIcon type={'MaterialCommunityIcons'} {...this.props} />;
  }
}
