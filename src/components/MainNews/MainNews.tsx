import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles';
import axios from 'axios';
import { ArticleType } from '../types/articleType'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenNames from '../../navigation/screenNames';
import { MainStackParamList } from '../../navigation/mainStack';

export default function MainNews() {
  const [topNews, setTopNews] = useState<ArticleType[]>([]);
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();

  useEffect(() => {
    getTopNews();
  }, []);

  function getTopNews() {
    const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=44e407194254430b9151b1945e494407";
    axios.get(url).then(res => {
      console.log(res.data);
      const articles = res.data?.articles?.filter(
        (article: ArticleType) => article?.urlToImage !== null,
      );
      setTopNews(articles);
    })
      .catch(err => {
        console.log('request Err:', err);
      });
  }

  function gotoArticlesDetails(article: ArticleType) {
    navigate(ScreenNames.ArticleDetails, { article }); 
  }

  function renderNews(item: ArticleType) {
    return (
      <TouchableOpacity onPress={() => gotoArticlesDetails(item)}>
        <ImageBackground
          source={{
            uri: item.urlToImage,
          }}
          style={styles.container}
          resizeMode='cover'
        >
          <View style={styles.whiteContant}>
            <View style={styles.redContant}>
              <Text style={styles.deadlineText}>{item.source?.name}</Text>
            </View>
            <View>
              <Text style={styles.name}>{item.title}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  function addArticle() {
    const newArticle = {
      title: 'news 5 title',
      source: { name: 'source 5' },
      urlToImage: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8='
    };
    setTopNews(prevNews => [...prevNews, newArticle as ArticleType]);
  }

  return (
    <View>
      <FlatList
        data={topNews}
        renderItem={({ item }) => renderNews(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity onPress={addArticle}>
        <Text>Add Article</Text>
      </TouchableOpacity>
    </View>
  );
} 


