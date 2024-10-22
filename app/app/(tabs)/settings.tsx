import TopBar from '@/components/drawer/top-bar';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { View, Switch } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen: React.FC = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const navigation = useNavigation()


    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

    return (
        <SafeAreaView className="flex-1 flex-col bg-white">
            <TopBar name='Settings'/>

            {/* Email text */}
            <View className='flex-row w-full'>
                <Text className='ml-4' variant='labelMedium'>Email</Text>
                <View className='flex-1'/>
                <Text className='mr-4' variant='bodyMedium'>mibnzaman02@gmail.com</Text>
            </View>

            {/* Devider  */}
            
        </SafeAreaView>
    );
};

export default SettingsScreen;