import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import styles from '../styles';
export default function Header() {
  return (
    <View style ={styles.container}>
        <Image 
        style={styles.img}
        source={require('../../assets/images/download.jpg')}
         />
         <Text style={styles.title}>
            MK News
         </Text>
         <Image 
        style={styles.img}
        source={require('../../assets/images/download.jpg')}
         />
    </View>
  );
}
