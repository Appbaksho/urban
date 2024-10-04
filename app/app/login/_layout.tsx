import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { useState } from "react";
import { User } from "@/modules/auth/models/auth.model";
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

const LoginScreen = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      //get firebase user auth token
      console.log(auth.currentUser);
      router.push("/(tabs)");
      // Handle successful login
    } catch (err) {
      // @ts-ignore
        setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <TextInput
        className="border p-2 mb-4 w-full"
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        className="border p-2 mb-4 w-full"
        placeholder="Password"
        secureTextEntry
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />
      {loading && <ActivityIndicator className="mt-4" />}
      {error && <Text className="text-red-500 mt-4">{error}</Text>}
    </View>
  );
};

export default LoginScreen;