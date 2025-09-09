import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/loginScreen/loginScreen";
import { Screen } from "react-native-screens";
import ScreenNames from "../screenNames";
const Stack = createStackNavigator();

export default function AuthStack(){
    return(
    <Stack.Navigator  screenOptions={{headerShown:false}}>
        <Stack.Screen name={ScreenNames.LoginScreen} component={LoginScreen}/>
    </Stack.Navigator>
    );
}