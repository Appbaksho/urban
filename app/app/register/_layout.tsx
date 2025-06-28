import RegisterForm from '@/components/login/register-form';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { View, TextInput,Image, Button, Text, ActivityIndicator, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {

    const navigation = useNavigation()
        useLayoutEffect(() => {
                navigation.setOptions({
                  headerShown: false,
                });
        }, [navigation]);
   
    return (
        <SafeAreaView className={'h-full w-full bg-white items-center justify-center'}>   
        <ScrollView showsVerticalScrollIndicator={false} className={'flex-1 bg-white w-full py-8'}>
            <Image source={require('@/assets/images/urban_logo.png')} className={'w-[50vw] h-[50vw] mx-auto'} resizeMode={'contain'}/>
            <RegisterForm/>
        </ScrollView>
        </SafeAreaView>
    );
};

export default Register;