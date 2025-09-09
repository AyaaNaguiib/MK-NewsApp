import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ScreenNames from '../../screenNames'
import HomeScreen from '../../../screens/homescreen/HomeScreen'
import FavArticlescreen from '../../../screens/favArticleScreen/favArticle.screen'
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyTabs = createBottomTabNavigator();
export default function MainTabs() {
  return ( 
 <MyTabs.Navigator screenOptions={{headerShown:false}}>
    <MyTabs.Screen name={ScreenNames.HomeScreen} component={HomeScreen}
    options={{
        tabBarLabel:'Home',
        tabBarIcon: ()=> (<
            Ionicons name="home" size={20} color={'red'}/>
        ),
        tabBarActiveTintColor:'green',
        tabBarInactiveTintColor:'grey'
    }}/>
    <MyTabs.Screen name={ScreenNames.FavArticleScreen} component = {FavArticlescreen}/>
 </MyTabs.Navigator>
  )
}