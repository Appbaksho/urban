import TopBar from "@/components/drawer/top-bar";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ShopLayout = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);
      
    return (
        <SafeAreaView>
            <TopBar name='Shop' />
            <Text variant={'titleMedium'}>Shop Layout</Text>
        </SafeAreaView>
    );
}

export default ShopLayout;