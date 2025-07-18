import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import CustomButton from "../core/button";
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';

interface RegisterFormProps {
  setKeyboardOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = (props: RegisterFormProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const theme = useTheme();
  const router = useRouter();


  const registerUser = async () => {
    setLoading(true);
    setErrorMessage("");
    const auth = getAuth();
    if (email === "" || password === "" || passwordConfirm === "") {
      setErrorMessage("Please fill all fields");
    } else if (!email.includes("@")) {
      setErrorMessage("Invalid email");
    } else if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
      try {
        const credentials = { email, password };
        console.log(credentials);
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/create-profile');
      } catch (err) {
        // @ts-ignore
        setErrorMessage(err.message);
      }finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  return (
    <View className="px-5 mt-10">
      <Text variant="titleMedium" className="text-center">
        Register
      </Text>
      <View className="mt-5">
        <TextInput
          value={email}
          placeholder="E-mail"
          mode="outlined"
          outlineColor={theme.colors.primary}
          onPress={() => props.setKeyboardOpen && props.setKeyboardOpen(true)}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          value={password}
          mode="outlined"
          className="mt-3"
          placeholder="password"
          outlineColor={theme.colors.primary}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={!showPass}
          onPress={() => props.setKeyboardOpen && props.setKeyboardOpen(true)}
          right={
            showPass ? (
              <TextInput.Icon
                icon="eye-off"
                onPress={() => setShowPass(!showPass)}
              />
            ) : (
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowPass(!showPass)}
              />
            )
          }
        />
        <TextInput
          value={passwordConfirm}
          mode="outlined"
          className="mt-3"
          placeholder="Confirm password"
          outlineColor={theme.colors.primary}
          onChangeText={(password) => setPasswordConfirm(password)}
          secureTextEntry={!showPass}
          onPress={() => props.setKeyboardOpen && props.setKeyboardOpen(true)}
        />
      </View>
      <CustomButton className="mt-5" onPress={registerUser} loading={loading}>
        Sign Up
      </CustomButton>
      {errorMessage && (
        <View className="rounded-md p-3 bg-red-200 mt-3">
          <Text className="text-red-500 font-medium">{errorMessage}</Text>
        </View>
      )}
      <View className="flex items-center">
        <Divider bold className="my-5 w-[200px]" />
        <View className="flex flex-row items-center gap-2">
          <Text variant="bodySmall">Already have an Account?</Text>
          <Text
            onPress={() => router.push("/login")}
            variant="bodySmall"
            style={{ color: theme.colors.primary }}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;
