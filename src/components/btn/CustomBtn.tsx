import React, { ReactNode } from "react";
import { GestureResponderEvent, StyleSheet, ViewStyle,StyleProp, TextStyle } from "react-native";
import { Button } from "react-native-paper";
import { fonts } from "../../utils/constants";

interface CustomBtnProps {
  title?: string;
  onPress: (event?: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;       
   
}

export default function CustomBtn({
  title,
  onPress,
  loading = false,
  disabled = false,
  children,
  style,

}: CustomBtnProps) {
  return (
    <Button
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, disabled ? styles.buttonDisabled : styles.buttonEnabled, style]} 
      contentStyle={[styles.content, ]}
      labelStyle={[styles.text, ]}
    >
      {children ?? title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEnabled: {
    backgroundColor: "gold",
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 215, 0, 0.5)",
  },
  text: {
    fontFamily: fonts.CairoBold,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

