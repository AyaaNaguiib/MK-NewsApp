import React, { useState } from "react";
import { View, Text, TextInput, TextInputProps, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  isPassword?: boolean;
}

export default function FormInput({ label, error, touched, isPassword, ...props }: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputCont}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, touched && error ? styles.inputError : null]}
          secureTextEntry={isPassword && !showPassword} 
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconWrapper}
          >
            <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#555" />
          </TouchableOpacity>
        )}
      </View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputCont: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    paddingRight: 40, 
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  iconWrapper: {
    position: "absolute",
    right: 10,
  },
});
