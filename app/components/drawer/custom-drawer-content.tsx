import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";
            import { styled } from "nativewind";
import { Linking } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { theme } from "@/theme/theme";
import { BadgeHelp, LogOut, Phone, ShoppingCart } from "lucide-react-native";
const CustomDrawerContent = (props: any) => {
    const navigation = useNavigation();
    const profileImageUri = "https://i.pinimg.com/736x/d3/68/50/d36850a37f999852c69a34b2cad4b35d.jpg"; // Replace with actual image URI
    return (
        <DrawerContentScrollView {...props}>
            <TouchableOpacity className={"flex-col ml-6 mt-2.5"} onPress={()=>{
                navigation.dispatch(DrawerActions.closeDrawer());
                router.push('/profile');
            }}>
                <Image source={{ uri: profileImageUri }} style={{ width: 70, height: 70, borderRadius: 50 }} />
                <View className={"mt-3.5"}/>
                <Text className={"text-start"} style={{fontSize:14,fontFamily:'poppins',fontWeight:"semibold"}}>Md. Kaif Ibn Zaman</Text>
                <View className={"mt-3.5"}/>
                <View className={"bg-gray-300"} style={{width: '90%', height: 1}}/>
                <View className={"mt-3.5"}/>
            </TouchableOpacity>
            <DrawerItemList {...props} />
            <DrawerItem label="Cart" 
                activeTintColor={theme.colors.primary}
                icon={({color, size}) => <ShoppingCart color={color} className={'mr-[-16] mt-[-3]'} />}
                labelStyle={{fontFamily: 'poppins'}}
                onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    router.push('/cart')
                }} 
                />
            <DrawerItem label="Help" 
                activeTintColor={theme.colors.primary}
                icon={({color, size}) => <BadgeHelp color={color} className={'mr-[-16] mt-[-3]'} />}
                labelStyle={{fontFamily: 'poppins'}}
                onPress={() => Linking.openURL('https://example.com/help')} 
                />
            <DrawerItem label="Contact Us"
                activeTintColor={theme.colors.primary}
                icon={({color, size}) => <Phone color={color} className={'mr-[-16] mt-[-3]'} />}
                labelStyle={{fontFamily: 'poppins'}}
                onPress={() => Linking.openURL('https://example.com/contact')} 
                />  
            <View className={'mt-2'}/>
            <View className={"bg-gray-300 ml-6"} style={{width: '80%', height: 1}}/>
            <View className={"mt-2"}/>
            <DrawerItem label="Logout" 
                activeTintColor={theme.colors.primary}
                inactiveTintColor={'red'}
                icon={({color, size}) => <LogOut color={color} className={'mr-[-16] mt-[-3]'} />}
                labelStyle={{fontFamily: 'poppins'}}
                onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    router.push('/login')
                }} 
                />         
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;