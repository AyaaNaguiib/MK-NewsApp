import { ActivityIndicator, GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-gesture-handler";
import React from "react";
import { fonts } from "../../utils/constants";

interface LoginBtnProps {
    title: string;
    onPress: (Event:GestureResponderEvent) => void;
    loading?:boolean;
    disabled?: boolean;
}
export default  function LoginBtn({title, onPress, loading, disabled}:LoginBtnProps){
    return(
        <TouchableOpacity
        style={[styles.button, disabled? styles.buttonDisabled: null]}
        onPress={onPress}
        disabled={disabled || loading}
        >
            {loading? (
                <ActivityIndicator color="#fff"/>
            )  : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "gold",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonEnabled: {
    backgroundColor: "gold", 
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 215, 0, 0.5)",
  },
  text: {
    fontFamily:fonts.CairoBold,
    fontSize: 16,
    fontWeight: "bold",
  },
});