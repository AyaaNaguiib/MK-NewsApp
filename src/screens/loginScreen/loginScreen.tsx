import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackNames from '../../navigation/stackNames';
import { MainStackParamList } from '../../navigation/mainStack';
import styles from './styles';
import { useLogin } from '../../utils/helpers/useLogin';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});

  const { mutate: login, isPending, error } = useLogin(
    (data) => {
      console.log("Login success:", data);
      navigation.navigate(StackNames.MainTabs);
    },
    (err) => {
      setErrors({ general: err.message });
    }
  );

  function handleLogin() {
    let newErrors: typeof errors = {};
    if (!username.trim()) {
      newErrors.username = "Please enter your mobile number";
    }
    if (!password.trim()) {
      newErrors.password = "Please enter your password";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    login({ mobile: username, password, device_type: "ios" });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      

      <View style={styles.formCont}>
        <View style={styles.inputCont}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setErrors((prev) => ({ ...prev, username: undefined }));
            }}
          />
          {errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}
        </View>

        <View style={styles.inputCont}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
        </View>
      </View>

      {errors.general && (
        <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
          {errors.general}
        </Text>
      )}
      {error && (
        <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
          {error.message}
        </Text>
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={handleLogin} disabled={isPending}>
        {isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Login</Text>}
      </TouchableOpacity>
    </View>
  );
}

