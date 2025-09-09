import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import styles from './styles'
import { Image } from 'react-native';
import axios from 'axios';
import { ArticleType } from '../types/articleType';
import{get} from '../../utils/helpers/apiService'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '../../navigation/mainStack';
import ScreenNames from '../../navigation/screenNames';
import React from 'react';
export default function topNews() {
    const [articles,setArticles] = useState <ArticleType[]>([]);
   const  {} = useNavigation<NavigationProp<MainStackParamList, ScreenNames.HomeScreen>>()
    useEffect (()=> {
        getTopNews();
    },[])
    function getTopNews(){
        const url = "https://newsapi.org/v2/top-headlines?country=us";
        axios.get(url).then(res => {
            console.log(res.data);
            const articles = res.data?.articles?.filter(
                (article: ArticleType) => article?.urlToImage !== null,
            );
            setArticles(articles);
           })
        .catch(err => {
            console.log('request Err:', err);
        });
    }
    function gotoArticles(article:ArticleType){
      navigate(ScreenNames.ArticleDetails,{
        article,
      });
    }

    function renderItem(item: ArticleType){
        return(
        <TouchableOpacity style = {styles.cardCount}onPress={()=>gotoArticles(item)}>
        <Image style = {styles.cardArticleImage} source={{uri: articles[0]. urlToImage}}/>
        <Text style = {styles.cardArticleName}>{articles[0].title}</Text>
      </TouchableOpacity>
        );
    }
  return (
    <View style ={styles.container}>
      <Text style={styles.sectionTitle}>topNews</Text>
      <FlatList 
      data={articles}
      renderItem={({item})=> renderItem(item)} contentContainerStyle={styles.listCount}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
        />
    </View>
  );
}

function navigate(ArticleDetails: ScreenNames, arg1: { article: ArticleType; }) {
  throw new Error('Function not implemented.');
}
