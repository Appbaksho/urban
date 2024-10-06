import React from 'react';
import { View, Text, Switch } from 'react-native';

const SettingsScreen: React.FC = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View className="flex-1 justify-center items-center bg-gray-100">
            <Text className="text-2xl font-bold mb-4">Settings</Text>
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
        </View>
    );
};

export default SettingsScreen;