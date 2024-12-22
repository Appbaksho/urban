import React, { useLayoutEffect } from 'react';
import { View, Text, Button, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBarV2 from '@/components/drawer/top-bar-v2';
import { theme } from '@/theme/theme';
import { ChevronDown } from 'lucide-react-native';


const cartItems = [
    { id: '1', name: 'Premium Panjabi - 230045', category:"Men's pabjabi",color:"Dark Charcoal",size:"XL",price: 3450 },
    { id: '2', name: 'Premium Panjabi - 230045', category:"Men's pabjabi",color:"Dark Charcoal",size:"XL",price: 3450 },
    { id: '3', name: 'Premium Panjabi - 230045', category:"Men's pabjabi",color:"Dark Charcoal",size:"XL",price: 3450 },
    { id: '4', name: 'Premium Panjabi - 230045', category:"Men's pabjabi",color:"Dark Charcoal",size:"XL",price: 3450 }
];
export const productImage = "https://i0.wp.com/pristineshop.com.bd/wp-content/uploads/2024/03/Square-21.jpg?fit=2037%2C2037&ssl=1";

const CartScreen = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);
    return (
        <SafeAreaView className={'bg-white flex-col h-full'}>
            <TopBarV2 name="Bag" />
            <ScrollView className={'flex-1'}>
                <View className={'flex-col items-center'}>
                    {cartItems.map((item) => (
                        <View id={item.id} className={'flex-row justify-between  mt-6 '}>
                            <View className={'flex-col'}>
                                <View className={'flex-row'}>
                                <Image className={'w-[25vw] h-[25vw]'} source={{ uri: productImage }} />
                                <View className={'flex-col ml-4'}>
                                    <Text className={'text-base'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>{item.name}</Text>
                                    <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}} >{item.category}</Text>
                                    <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}} >{item.color}</Text>
                                    <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>{item.size}</Text>
                                </View>
                                </View>
                                <View className={'flex-row mt-2 w-[90vw]'}>
                                    <TouchableOpacity className={'flex-row items-center'}>
                                    <ChevronDown size={20} className={'mt-[1]'} color={theme.colors.primary} />
                                    <Text className={'text-sm opacity-70 ml-1'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>Qnt 3</Text>
                                    </TouchableOpacity>
                                    <View className={'flex-1'}/>
                                    <Text className={'text-sm opacity-100'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>BDT {item.price}</Text>
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
                            <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>BDT {total}</Text>
                        </View>
                        <View className={'flex-row justify-between mt-2'}>
                            <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>Shipping</Text>
                            <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>BDT 60</Text>
                        </View>
                        <View className={'flex-row justify-between mt-2'}>
                            <Text className={'text-sm opacity-100'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>Estimated Total</Text>
                            <Text className={'text-sm opacity-100'} style={{fontFamily:'poppins',fontWeight:'semibold'}}>BDT {total+60}</Text>
                        </View>
                    </View>
                    <View className={'mt-4'}/>
                </View>
            </ScrollView>

            <View className={'bg-gray-300'} style={{width: "100%", height: 1}}/>
            <View className={'w-full h-fit'}>
                <TouchableOpacity className={'bg-primary p-4 items-center rounded-full mx-3 my-3'} style={{backgroundColor:theme.colors.primary}}>
                    <Text className={'text-lg'} style={{fontFamily:'poppins',fontWeight:'semibold',color:theme.colors.secondary}}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;