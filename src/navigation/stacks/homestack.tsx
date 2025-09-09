import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/loginScreen/loginScreen";
import { Screen } from "react-native-screens";
import ScreenNames from "../screenNames";
import HomeScreen from "../../screens/homescreen/HomeScreen";
import FavArticlescreen from "../../screens/favArticleScreen/favArticle.screen";
const Stack = createStackNavigator();

export default function AuthStack(){
    return(
    <Stack.Navigator  screenOptions={{headerShown:false}}>
        <Stack.Screen name={ScreenNames.HomeScreen} component={HomeScreen}/>
        <Stack.Screen name={ScreenNames.FavArticleScreen} component={FavArticlescreen}/>
    </Stack.Navigator>
    );
}