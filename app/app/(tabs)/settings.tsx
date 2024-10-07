import TopBar from '@/components/drawer/top-bar';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { View, Text, Switch } from 'react-native';
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
        <SafeAreaView className="flex-1 items-center bg-gray-100">
            <TopBar name='Settings'/>
            <Text className="mt-20 text-2xl font-bold mb-4">Settings</Text>
            <View className="flex-row items-center">
                <Text className="text-lg">Enable Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;