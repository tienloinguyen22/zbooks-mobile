import React from 'react';
import { getLayout } from '@app/core';
import Modal from 'react-native-modal';
import { Loading } from '@app/components';
import { styles } from './styles';

const layouts = getLayout();

export const LoadingModal = (_props: {}): JSX.Element => {
  return (
    <Modal deviceWidth={layouts.deviceWidth} deviceHeight={layouts.deviceHeight} isVisible={true} style={styles.center}>
      <Loading />
    </Modal>
  );
};
