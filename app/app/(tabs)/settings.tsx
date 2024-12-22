import TopBar from '@/components/drawer/top-bar';
import SettingComponent from '@/components/settings/settings-component';
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

            <SettingComponent label='👤   Name' value='Md. Kaif Ibn Zaman' />
            <SettingComponent label='📧   Email' value='mibnzaman02@gmail.com' />
            <SettingComponent label='📞   Phone' value='+880 1234567890' />
            <SettingComponent label='🏠   Address' value='Dhaka, Bangladesh' />
            <SettingComponent label='🏢   Billing Address' value='Dhaka, Bangladesh' />
            <SettingComponent label='🔔   Notification' value='Enabled' />
            {/* Rate us about us review us etc */}
            <SettingComponent label='⭐   Rate us' value='>' />
            <SettingComponent label='ℹ️   About us' value='>' />
            <SettingComponent label='📝   Review us' value='>' />
            <SettingComponent label='📤   Share' value='>' isDeviderInvissible />
            <View className='flex-1'/>
            <SettingComponent label=' Logout' value='' isRed/>
            


            
        </SafeAreaView>
    );
};

export default SettingsScreen;