import React from 'react';
import { Text, Touchable, Image, View } from '@app/components';
import { TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';

export const ProfilePicture = (): JSX.Element => {
  return (
    <View column center style={styles.container}>
      <TouchableWithoutFeedback>
        <Image
          resizeMode='cover'
          source={{
            uri: 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
          }}
          style={styles.profileImage}
        />
      </TouchableWithoutFeedback>
      <Touchable style={styles.button}>
        <Text textCenter style={styles.buttonText}>
          Change Profile Photo
        </Text>
      </Touchable>
    </View>
  );
};
