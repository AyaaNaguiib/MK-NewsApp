import React, { ReactNode } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { fonts } from "../../utils/constants";

interface customBtnProps {
  title?: string;
  onPress: (Event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode; 
}

export default function customBtn({ title, onPress, loading, disabled, children }: customBtnProps) {
  return (
    <Button
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, disabled ? styles.buttonDisabled : styles.buttonEnabled]}
      labelStyle={styles.text}
      contentStyle={{ flexDirection: "row" }} 
    >
      {children ? children : title}
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

