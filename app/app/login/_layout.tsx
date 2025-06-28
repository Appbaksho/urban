import React, { useLayoutEffect, useState } from 'react';
import { View, Text,Image, TextInput, Button, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { getAuth } from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/drawer/top-bar';
import LoginForm from '@/components/login/login-form';

const LoginScreen = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const navigation = useNavigation()
    useLayoutEffect(() => {
            navigation.setOptions({
              headerShown: false,
            });
    }, [navigation]);

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            await getAuth().signInWithEmailAndPassword(user.email, user.password);
            router.push('/(tabs)');
            // Handle successful login
        } catch (err) {
            // @ts-ignore
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className={'h-full w-full bg-white items-center justify-center'}>   
        <ScrollView showsVerticalScrollIndicator={false} className={'flex-1 bg-white w-full py-8'}>
            <Image source={require('@/assets/images/urban_logo.png')} className={'w-[50vw] h-[50vw] mx-auto'} resizeMode={'contain'}/>
            <LoginForm/>
        </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;