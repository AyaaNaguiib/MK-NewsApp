import React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { fonts } from "../../utils/constants";

interface LoginBtnProps {
  title: string;
  onPress: (Event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function LoginBtn({ title, onPress, loading, disabled }: LoginBtnProps) {
  return (
    <Button
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, disabled ? styles.buttonDisabled : styles.buttonEnabled]}
      labelStyle={styles.text}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 5,
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
