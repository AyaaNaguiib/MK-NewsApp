import React , {useState , useEffect} from "react";
import { Alert, Text, TouchableOpacity, View,ScrollView, SafeAreaView } from 'react-native';
import Header from "../../components/header/Header";
import MainNews from "../../components/MainNews/MainNews";
import styles from "./styles";
import TopNews from "../../components/topNews/topNews";
import { useNavigation } from '@react-navigation/native';

 const HomeScreen = ()=> {
  
   
    return(
      <SafeAreaView>
         <ScrollView>
           <Header/>
           <MainNews/>
           <TopNews/>
        </ScrollView>
      </SafeAreaView>
        
    );
 };
 export default HomeScreen;