import TopBarV2 from "@/components/drawer/top-bar-v2";
import OrderItem from "@/components/orders/order-item";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderLayout = () => {

    const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

    return (
        <SafeAreaView className="flex-1 flex-col bg-white">
            <TopBarV2 name="Orders" />
            <ScrollView showsVerticalScrollIndicator={false} className={'flex-1 w-full'}>
              <View className={'flex-col items-center'}>
                {
                  Array.from({ length: 15 }).map((_, index) => (
                    <OrderItem key={index} />
                  ))
                }
              </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default OrderLayout;