import React, { useEffect, useLayoutEffect } from "react";
import { router, useNavigation} from "expo-router";
import {  SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import TopBarV2 from "@/components/drawer/top-bar-v2";
import { theme } from "@/theme/theme";
import { Package, Settings, ShoppingCart, Calendar, ChevronRight } from "lucide-react-native";
import { useGetSelfMutation } from "@/modules/customer/customer.api";


export default function ProfileTab() {
  const navigation = useNavigation();
  const [getSelf,{data:self}] = useGetSelfMutation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

     const [profileImageUri, setProfileImageUri] = React.useState<string>('');
      const [name, setName] = React.useState<string>('');
      useEffect(() => {
          getSelf().then((res) => {
              console.log(res);  
              if (res.data) {
                  setProfileImageUri(res.data.photoUrl || '');
                  setName(res.data.name || '');
              }
          });
      }, []);
  return (
    <SafeAreaView>
     <TopBarV2 name="Profile" />
     <ScrollView className={'h-full w-full bg-white'}>
            <View className={'flex-col items-center w-full'}>
              <View className={"mt-6"}/>
              <Image className={'w-[30vw] h-[30vw]'} source={{ uri: profileImageUri }} style={{ borderRadius: 1000 }} />
              <View className={"mt-3.5"}/>
              <Text className={'text-lg'} style={{fontFamily:'poppins',fontWeight:"semibold", color:theme.colors.primary}}>{name}</Text>
              <View className={"mt-4"}/>
                <TouchableOpacity style={{ borderColor: theme.colors.primary, borderWidth: 1, borderRadius: 50, padding: 10 }}>
                  <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold", color:theme.colors.primary}}>Edit Profile</Text>
                </TouchableOpacity> 
            </View> 
            <View className={'mt-8'}/>
            <View className={'flex-row justify-center'}>
                <TouchableOpacity onPress={()=>{router.push("/cart")}} className={'flex-col items-center'}>
                   <ShoppingCart size={30} strokeWidth={1} className={'opacity-95'} color={theme.colors.primary}/>
                   <Text className={'mt-1 text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold"}}>Cart</Text>
                </TouchableOpacity>
                <View className={'bg-gray-300'} style={{width: 1, height: 32, marginHorizontal: 20}}/>
                <TouchableOpacity onPress={()=>{router.push("/orders")}} className={'flex-col items-center'}>
                   <Package size={30} className={'opacity-95'} strokeWidth={1} color={theme.colors.primary}/>
                   <Text className={'mt-1 text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold"}}>Orders</Text>
                </TouchableOpacity>
                <View className={'bg-gray-300'} style={{width: 1, height: 32, marginHorizontal: 20}}/>
                <TouchableOpacity onPress={()=>{router.push("/batch-view?title=Event%20Specials")}} className={'flex-col items-center'}>
                   <Calendar strokeWidth={1} size={30} className={'opacity-95'} color={theme.colors.primary}/>
                   <Text className={'mt-1 text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold"}}>Events</Text>
                </TouchableOpacity>
                <View className={'bg-gray-300'} style={{width: 1, height: 32, marginHorizontal: 20}}/>
                <TouchableOpacity onPress={()=>{router.push("/(tabs)/settings")}} className={'flex-col items-center'}>
                   <Settings strokeWidth={1} size={30} className={'opacity-95'} color={theme.colors.primary}/>
                   <Text className={'mt-1 text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold"}}>Settings</Text>
                </TouchableOpacity>
            </View>
            <View className={'mt-8'}/>
            <View className={"bg-gray-300 mx-4 h-full"} style={{ height: 1}}/>
            <View className={'mt-8'}/>
            <View className={'flex-row items-center mx-4'}>
              <View className={'flex-col'}>
                <Text className={'text-base'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Your Urban member rewards</Text>
                <View className={'mt-2'}/>
                <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>No unlocks yet</Text>
              </View>
              <View className={'flex-1'}/>
              <ChevronRight size={24} color={theme.colors.primary}/>
            </View>
            <View className={'mt-8'}/>
            <View className={"bg-gray-300 mx-4 h-full"} style={{ height: 1}}/>
            <View className={'mt-8'}/>
            <TouchableOpacity onPress={()=>{router.push("/(tabs)/favourites")}} className={'flex-row items-center mx-4'}>
              <View className={'flex-col'}>
              <Text className={'text-base'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Your Favourites</Text>
              <View className={'mt-2'}/>
              <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>No favourites added yet</Text>
              </View>
              <View className={'flex-1'}/>
              <TouchableOpacity>
              <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Edit</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <View className={'mt-8'}/>
            <View className={"bg-gray-300 mx-4 h-full"} style={{ height: 1}}/>
            <View className={'mt-8'}/>
            {/* <View className={'flex-col mx-4'}>
              <Text className={'text-base'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Recent Orders</Text>
              <View className={'mt-4'}/>
              <View className={'flex-row justify-between items-center'}>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Order #12345</Text>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>$29.99</Text>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Delivered</Text>
              </View>
              <View className={'mt-2'}/>
              <View className={"bg-gray-300 h-full"} style={{ height: 1}}/>
              <View className={'mt-4'}/>
              <View className={'flex-row justify-between items-center'}>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Order #12346</Text>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>$49.99</Text>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Shipped</Text>
              </View>
              <View className={'mt-2'}/>
              <View className={"bg-gray-300 h-full"} style={{ height: 1}}/>
              <View className={'mt-4'}/>
              <View className={'flex-row justify-between items-center'}>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Order #12347</Text>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>$19.99</Text>
                <Text className={'text-sm'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.primary}}>Processing</Text>
              </View>
            </View> */}
            <View className={'mt-20'}/>
     </ScrollView>
    </SafeAreaView>
  );
}


