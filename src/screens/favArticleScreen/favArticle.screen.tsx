import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useFavStore } from '../../store/useFavStore';
import { ArticleType } from '../../components/types/articleType';
import { MainStackParamList } from '../../navigation/mainStack';
import ScreenNames from '../../navigation/screenNames';
import styleee from './styleee';
import style from '../articleDetails/style';
import { getUserData } from '../../utils/helpers/storage';
import Toast from 'react-native-toast-message';

export default function FavArticlescreen() {
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();
  const { favList } = useFavStore();

  async function gotoArticles(item: ArticleType) {
    const user = await getUserData();


    navigate(ScreenNames.ArticleDetails, { article: item });
  }

  function renderItem({ item }: { item: ArticleType }) {
    return (
      <TouchableOpacity 
        style={styleee.cardCount} 
        onPress={() => gotoArticles(item)}
      >
        <Image 
          style={styleee.cardArticleImage} 
          source={{ uri: item.urlToImage }} 
        />
        <Text style={styleee.cardArticleName}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={style.container}>
      {favList.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No Favourite Articles Yet
        </Text>
      ) : (
        <FlatList 
          data={favList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
