import React, { useState } from 'react';
import { Text, Touchable, Image, View } from '@app/components';
import { TouchableWithoutFeedback, ImageBackground, ActivityIndicator } from 'react-native';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { showNotification, NotificationTypes, colors } from '@app/core';
import { config } from '@app/config';
import gql from 'graphql-tag';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import { ReactNativeFile } from 'apollo-upload-client';
import _ from 'lodash';
import { styles } from './styles';

interface Props {
  avatarUrl: string;
}

const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploads {
      image(file: $file) {
        filename
        url
      }
    }
  }
`;

const UPDATE_AVATAR_URL = gql`
  mutation UpdateAvatarUrl($payload: UpdateUserInfoPayload!) {
    users {
      me(payload: $payload) {
        id
        avatarUrl
      }
    }
  }
`;

export const ProfilePicture = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>('');

  const imagePickerOptions = {
    title: t('userProfileScreen.selectPhoto'),
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const uploadImage = async (response: ImagePickerResponse): Promise<void> => {
    try {
      const file = new ReactNativeFile({
        uri: response.uri,
        name: _.get(response, 'fileName') || 'profile-image.jpg',
        type: _.get(response, 'type', ''),
      });

      const uploadImageResult = await apolloClient.mutate({
        mutation: UPLOAD_IMAGE,
        variables: {
          file,
        },
      });

      const updateUserResult = await apolloClient.mutate({
        mutation: UPDATE_AVATAR_URL,
        variables: {
          payload: {
            avatarUrl: _.get(uploadImageResult, 'data.uploads.image.url'),
          },
        },
      });
      updateCurrentUser(_.get(updateUserResult, 'data.users.me'));
    } catch (error) {
      showNotification({
        type: NotificationTypes.ERROR,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const openImagePicker = (): void => {
    setLoading(true);

    ImagePicker.launchImageLibrary(imagePickerOptions, (response) => {
      if (response.didCancel) {
        setLoading(false);
      }

      if (response.error) {
        setLoading(false);
        showNotification({
          type: NotificationTypes.ERROR,
          message: response.error,
        });
      }

      if (response.uri) {
        setImageUri(response.uri);
        uploadImage(response);
      }
    });
  };

  let imageSource = 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png';
  if (props.avatarUrl) {
    imageSource = `${config.apollo.main}${props.avatarUrl}`;
  }
  if (imageUri) {
    imageSource = imageUri;
  }

  return (
    <View column center style={styles.container}>
      {loading ? (
        <ImageBackground
          source={{
            uri: imageSource,
          }}
          imageStyle={styles.profileImage}
          style={styles.backgroundImage}
        >
          <ActivityIndicator size='small' color={colors.primaryColor} />
        </ImageBackground>
      ) : (
        <TouchableWithoutFeedback onPress={openImagePicker} disabled={loading}>
          <Image
            resizeMode='cover'
            source={{
              uri: imageSource,
            }}
            style={styles.profileImage}
          />
        </TouchableWithoutFeedback>
      )}

      <Touchable style={styles.button} onPress={openImagePicker} disabled={loading}>
        <Text textCenter style={styles.buttonText}>
          {t('userProfileScreen.changeProfilePhoto')}
        </Text>
      </Touchable>
    </View>
  );
};
