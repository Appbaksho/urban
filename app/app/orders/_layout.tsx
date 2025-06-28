import TopBarV2 from "@/components/drawer/top-bar-v2";
import OrderItem from "@/components/orders/order-item";
import { useGetOrdersQuery } from "@/modules/cart/cart.api";
import { useFocusEffect, useNavigation } from "expo-router";
import React from "react";
import { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderLayout = () => {
  
    const {data: orders, isLoading: ordersLoading, error: ordersError, refetch:reFetchOrders} =  useGetOrdersQuery();
    const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

      useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

      useFocusEffect(
        React.useCallback(() => {
          console.log("Cart Screen Focused");
          reFetchOrders();
        }, [])
      );
    
      if (ordersLoading) {
        return (
          <SafeAreaView className="flex-1 bg-white">
            <TopBarV2 name="Orders" />
            <View className="flex-1 items-center justify-center">
              {/* Loading bar black  */}
              <ActivityIndicator size={20} className={"mr-3"} color={"#000000"} />
            </View>
          </SafeAreaView>
        );
      }
    
      if (ordersError) {
        return (
          <SafeAreaView className="flex-1 bg-white">
            <TopBarV2 name="Orders" />
            <View className="flex-1 items-center justify-center">
              {/* Loading bar black  */}
    
              <Text variant="labelLarge">Something went wrong</Text>
            </View>
          </SafeAreaView>
        );
      }

      if(orders?.items.length === 0){
        return (
          <SafeAreaView className="flex-1 bg-white">
            <TopBarV2 name="Orders" />
            <View className="flex-1 items-center justify-center">
              {/* Loading bar black  */}
    
              <Text variant="labelLarge">No item in cart</Text>
            </View>
          </SafeAreaView>
          )
      }
        

    return (
        <SafeAreaView className="flex-1 flex-col bg-white">
            <TopBarV2 name="Orders" />
            <ScrollView showsVerticalScrollIndicator={false} className={'flex-1 w-full'}>
              <View className={'flex-col items-center'}>
                {
                  orders?.items.map((_, index) => (
                    <OrderItem orderItem={_}  key={index} />
                  ))
                }
              </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default OrderLayout;