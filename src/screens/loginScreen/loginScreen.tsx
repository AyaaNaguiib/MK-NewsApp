import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import StackNames from '../../navigation/stackNames';
import { MainStackParamList } from '../../navigation/mainStack';
import styles from './styles';

export default function LoginScreen() {

    const{navigate} =useNavigation();
    useNavigation<NavigationProp<MainStackParamList,StackNames.AuthStack>>();
    function handleLogin(){
      navigate(StackNames.MainTabs);
    }
    return (
   <View style={styles.container}>
    <Text style={styles.title}>login screen</Text>
    <Text style={styles.note}> if you have an account please login</Text>
    <View style ={styles.formCont}>
      <View style={styles.inputCont}>
        <Text style={styles.label}>username</Text>
      <TextInput style={styles.input} placeholder='enter your username'/>
      </View>
      <View>
        <Text style={styles.label}>password</Text>
      <TextInput style={styles.input} secureTextEntry={true}placeholder='enter your password'/>
      </View>
      
    </View>
    <TouchableOpacity style={styles.submitBtn}
    onPress={handleLogin}>
      <Text style={styles.submitText}>login </Text>

    </TouchableOpacity>
   </View>
  )
}