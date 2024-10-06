import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
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
            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-blue-500 mt-4">Don't have an account? Register now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;