import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenNames from "./screenNames";
import { ArticleType } from "../components/types/articleType";
import StackNames from "./stackNames";
import AuthStack from "./stacks/auth.stack";
import MainTabs from "./stacks/tabs/MainTabs";
import ArticleDetails from "../screens/articleDetails/articleDetails";


const Stack = createStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
         <Stack.Screen name={StackNames.AuthStack} component={AuthStack} />
         <Stack.Screen name={StackNames.MainTabs} component={MainTabs} />
         <Stack.Screen 
  name={ScreenNames.ArticleDetails} 
  component={ArticleDetails} 
/>

      </Stack.Navigator>
 
  );
}
export type MainStackParamList ={
  [StackNames.AuthStack]:undefined,
  [StackNames.MainTabs]: {
    article: ArticleType
  },
  [ScreenNames.ArticleDetails]: { article: ArticleType };
} 