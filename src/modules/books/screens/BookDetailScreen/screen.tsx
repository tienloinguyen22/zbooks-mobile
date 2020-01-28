import React from 'react';
import { ScreenProps, commonStyles } from '@app/core';
import { useQuery, gql } from '@apollo/client';
import _ from 'lodash';
import { Container, View, Image, Text, Divider, ScrollView } from '@app/components';
import { useTranslation } from 'react-i18next';
import HTML from 'react-native-render-html';
import { styles } from './styles';

type Props = {
  id: string;
} & ScreenProps;

const BOOK_DETAIL = gql`
  query GetBookDetail($id: ID!) {
    books {
      findById(id: $id) {
        id
        title
        author
        coverUrl
        category
        year
        pages
        description
      }
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const bookDetailQuery = useQuery(BOOK_DETAIL, {
    variables: {
      id: props.id,
    },
  });

  if (bookDetailQuery.loading) {
    return <></>;
  }

  const bookInfo = _.get(bookDetailQuery, 'data.books.findById', {});
  const bookCategories = _.get(bookInfo, 'category', []).filter((item: string) => !!item);

  return (
    <Container componentId={props.componentId} showHeader showBackButton {...props}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View column center>
          <View style={[styles.coverContainer, commonStyles.boxShadow]}>
            <Image
              source={{
                uri: bookInfo.coverUrl,
              }}
              style={styles.cover}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text h6 bold textCenter>
              {bookInfo.title}
            </Text>
            <Text style={styles.author} textCenter>
              {bookInfo.author}
            </Text>
          </View>
        </View>

        <Divider />

        <View row>
          <View flex={2} style={styles.bookInfoContainer}>
            <Text s2 style={styles.greyTitle}>
              {t('bookDetailScreen.category')}
            </Text>
            {bookCategories.length === 0 ? (
              <Text bold>N/A</Text>
            ) : (
              bookCategories.map((item: string, index: number) => {
                return (
                  <Text bold key={index}>
                    {item}
                  </Text>
                );
              })
            )}
          </View>
          <View flex={1} style={styles.bookInfoContainer}>
            <Text s2 style={styles.greyTitle}>
              {t('bookDetailScreen.year')}
            </Text>
            <Text bold numberOfLines={1}>
              {bookInfo.year ? bookInfo.year : 'N/A'}
            </Text>
            <View />
          </View>
          <View flex={1}>
            <Text s2 style={styles.greyTitle}>
              {t('bookDetailScreen.pages')}
            </Text>
            <Text bold numberOfLines={1}>
              {Number(bookInfo.pages) ? bookInfo.pages : 'N/A'}
            </Text>
            <View />
          </View>
        </View>

        <View>
          <Text s2 style={styles.greyTitle}>
            {t('bookDetailScreen.description')}
          </Text>
          <HTML html={bookInfo.description ? bookInfo.description : 'N/A'} />
        </View>
      </ScrollView>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
