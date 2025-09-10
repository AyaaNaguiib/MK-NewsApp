 import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { MainStackParamList } from '../../navigation/mainStack';
import ScreenNames from '../../navigation/screenNames';
import style from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFavStore } from '../../store/useFavStore';
import { ArticleType } from '../../components/types/articleType';

export default function ArticleDetails() {
    const{goBack} = useNavigation();
    const{params} = useRoute<RouteProp<MainStackParamList,ScreenNames.ArticleDetails>>();
    const {article}=params??{}; 
    const {descriotion, source, title, urlToImage} = article??{}
    const{addToFavList} = useFavStore();
  function addFav(article: ArticleType) {
    throw new Error('Function not implemented.');
  }

  function navigate(FavArticleScreen: ScreenNames) {
    throw new Error('Function not implemented.');
  }

  return (
    <SafeAreaView style={style.container} >
        <ScrollView >
            <View style={style.header}>
                <TouchableOpacity onPress={goBack}>
                 <Text style={style.goBackText}>Go Back</Text> 
                <AntDesign name="arrowleft" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <Image source={{
                uri:urlToImage
            }}
            style={style.coverImg} />
            <View style={style.dataCont}>
            <Text style={style.title}>{title}</Text>
            <Text style={style.description}>{descriotion}</Text>
           </View>
        </ScrollView>
       {
       <TouchableOpacity style={style.addToFavBtn}
        onPress={()=>{
          addToFavList(article);
        }}>
          <Text style = {style.addToFavText}>add to fav</Text></TouchableOpacity> } 
    </SafeAreaView>
  )
} 

  