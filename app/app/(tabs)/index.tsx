import React, { useEffect, useLayoutEffect, useState } from 'react';
import {ScrollView, View, Text} from 'react-native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import useLogout from '@/hooks/useLogout';
import { useTestAuthMutation } from '@/modules/notification/api/notification.api';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/drawer/top-bar';
import Chip from '@/components/home/chip';

export default function HomeScreen() {
  const [user, setUser] = useState<any>();
  const [selectedChip, setSelectedChip] = useState<string>('Men');
  const navigation = useNavigation();
  const logout = useLogout();
  const auth = getAuth();
  const [testAuth, { data, error }] = useTestAuthMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    console.log(data, error);
  }, [data, error]);

    useEffect(() => {
        console.log('selectedChip: ', selectedChip);
    }, [selectedChip]);

  return (
    <SafeAreaView className={'h-full bg-white items-center'}>
      <TopBar name='Home' />
      <View className={'flex-1 w-[90vw]'}>
        <View className={'flex-row pt-3 pb-5'}>
          {['Men', 'Women', 'Kids'].map((label) => (
            <Chip
              key={label}
              label={label}
              selected={selectedChip === label}
              onPress={() => setSelectedChip(label)}
            />
          ))}
        </View>
        <View className={'w-full bg-gray-300'} style={{height:1}}/>
        <ScrollView className={'flex-1 mt-4'}>
            <Text className={'text-lg'} style={{fontFamily:'poppins'}}> this is {selectedChip}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}