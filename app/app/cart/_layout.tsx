import React, { useLayoutEffect } from 'react';
import { View,  Button, FlatList, ScrollView, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { styled } from 'nativewind';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBarV2 from '@/components/drawer/top-bar-v2';
import { theme } from '@/theme/theme';
import { ChevronDown } from 'lucide-react-native';
import { useCheckoutProductMutation, useGetCartQuery } from '@/modules/cart/cart.api';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper'


const cartItems = [
    { id: '1', name: 'Premium Panjabi - 230045', category:"Men's pabjabi",color:"Dark Charcoal",size:"XL",price: 3450 },
    { id: '2', name: 'Premium Panjabi - 230045', category:"Men's pabjabi",color:"Dark Charcoal",size:"XL",price: 3450 },
    { id: '3', name: 'Premium Panjabi - 230045', category:"Men's pabjabi",color:"Dark Charcoal",size:"XL",price: 3450 },
    { id: '4', name: 'Premium Panjabi - 230045', category:"Men's pabjabi",color:"Dark Charcoal",size:"XL",price: 3450 }
];
export const productImage = "https://i0.wp.com/pristineshop.com.bd/wp-content/uploads/2024/03/Square-21.jpg?fit=2037%2C2037&ssl=1";

const CartScreen = () => {
    const {data: cart, isLoading: cartLoading, error: cartError, refetch:reFetchCart} =  useGetCartQuery();
    const [checkout, { isLoading: checkoutLoading, error: checkoutError }] = useCheckoutProductMutation();

    const [total, setTotal] = React.useState(0);
    const navigation = useNavigation();

    React.useEffect(() => {
        let total = 0;
        cart?.items.map((item) => {
            total += item.orderDetail.price;
        });
        setTotal(total);
    }, [cart]);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

      useFocusEffect(
        React.useCallback(() => {
          console.log("Cart Screen Focused");
          reFetchCart();
        }, [])
      );
    
      if (cartLoading) {
        return (
          <SafeAreaView className="flex-1 bg-white">
            <TopBarV2 name="Bag" />
            <View className="flex-1 items-center justify-center">
              {/* Loading bar black  */}
              <ActivityIndicator size={20} className={"mr-3"} color={"#000000"} />
            </View>
          </SafeAreaView>
        );
      }
    
      if (cartError) {
        return (
          <SafeAreaView className="flex-1 bg-white">
            <TopBarV2 name="Bag" />
            <View className="flex-1 items-center justify-center">
              {/* Loading bar black  */}
    
              <Text variant="labelLarge">Something went wrong</Text>
            </View>
          </SafeAreaView>
        );
      }

      if(cart?.items.length === 0){
        return (
          <SafeAreaView className="flex-1 bg-white">
            <TopBarV2 name="Bag" />
            <View className="flex-1 items-center justify-center">
              {/* Loading bar black  */}
    
              <Text variant="labelLarge">No item in cart</Text>
            </View>
          </SafeAreaView>
          )
      }
      
      const handleCheckout = () => {
        // const body = {
        //     paymentMethod: "CASH_ON_DELIVERY"
        // };
        if(cart?.items.length === 0){
            ToastAndroid.show("No item in cart", ToastAndroid.SHORT);
            return;
        }
        checkout().then((res) => {
            console.log(res);
            if(res.data){
                ToastAndroid.show("Checkout successful", ToastAndroid.SHORT);
            }else {
                ToastAndroid.show("Checkout failed", ToastAndroid.SHORT);
            }
            reFetchCart();
            router.push('/orders');
        });
      };
      
    return (
        <SafeAreaView className={'bg-white flex-col h-full'}>
            <TopBarV2 name="Bag" />
            <ScrollView className={'flex-1'}>
                <View className={'flex-col items-center'}>
                    {cart?.items.map((item) => (
                        <View id={item.id} className={'flex-row justify-between  mt-6 '}>
                            <View className={'flex-col'}>
                                <View className={'flex-row'}>
                                <Image className={'w-[25vw] h-[25vw]'} source={{ uri: item.orderDetail.imageUrl }} />
                                <View className={'flex-col ml-4'}>
                                    <Text className={'text-base'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>{item.orderDetail.productName}</Text>
                                   <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>Size: {item.orderDetail.size}</Text>
                                </View>
                                </View>
                                <View className={'flex-row mt-2 w-[90vw]'}>
                                    <TouchableOpacity className={'flex-row items-center'}>
                                    <ChevronDown size={20} className={'mt-[1]'} color={theme.colors.primary} />
                                    <Text className={'text-sm opacity-70 ml-1'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>Qnt {item.quantity}</Text>
                                    </TouchableOpacity>
                                    <View className={'flex-1'}/>
                                    <Text className={'text-sm opacity-100'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>BDT {item.orderDetail.price}</Text>
                                </View>
                                <View className={'mt-4'}/>
                                {item.id===cartItems[cartItems.length-1].id ? null :
                                    //if last item then no need to show the divider
                                    <View className={'flex-col'}>
                                    <View className={'bg-gray-300'} style={{width: "100%", height: 1}}/>
                                    <View className={'mt-4'}/>
                                    </View>
                                }
                            </View>
                        </View>
                    ))}
                    <View className={'bg-gray-300 mt-8'} style={{width: "90%", height: 1}}/>
                    <View className={'flex-col  w-[90%] mt-4'}>
                        <View className={'flex-row justify-between'}>
                            <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>Subtotal</Text>
                            <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>BDT {total.toFixed(2)}</Text>
                        </View>
                        <View className={'flex-row justify-between mt-2'}>
                            <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>Shipping</Text>
                            <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>BDT {cart?.deliveryCharge}</Text>
                        </View>
                        <View className={'flex-row justify-between mt-2'}>
                            <Text className={'text-sm opacity-100'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>Estimated Total</Text>
                            <Text className={'text-sm opacity-100'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>BDT {(total+60).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View className={'mt-4'}/>
                </View>
            </ScrollView>

            <View className={'bg-gray-300'} style={{width: "100%", height: 1}}/>
            <View className={'w-full h-fit'}>
                <TouchableOpacity onPress={handleCheckout} className={'bg-primary p-4 items-center rounded-full flex-row mx-3 my-3'} style={{backgroundColor:theme.colors.primary}}>
                    <View className={'flex-1'} />
                    {checkoutLoading ? <ActivityIndicator size={20} className={"mr-3"} color={"#FFFFFF"} /> : null}
                    <Text className={'text-lg'} style={{fontFamily:'poppins',fontWeight:'semibold',color:theme.colors.secondary}}>Checkout</Text>
                    <View className={'flex-1'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;