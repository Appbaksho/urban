import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";
            import { styled } from "nativewind";
import { Linking } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { theme } from "@/theme/theme";
import { BadgeHelp, DollarSignIcon, LogOut, Phone, ShoppingBag, ShoppingCart } from "lucide-react-native";
import { useGetSelfMutation } from "@/modules/customer/customer.api";
const CustomDrawerContent = (props: any) => {
    const navigation = useNavigation();
    const [getSelf,{data:self}] = useGetSelfMutation();
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
        <DrawerContentScrollView {...props}>
            <TouchableOpacity className={"flex-col ml-6 mt-2.5"} onPress={()=>{
                navigation.dispatch(DrawerActions.closeDrawer());
                router.push('/profile');
            }}>
                <Image source={{ uri: profileImageUri }} style={{ width: 70, height: 70, borderRadius: 50 }} />
                <View className={"mt-3.5"}/>
                <Text className={"text-start"} style={{fontSize:14,fontFamily:'poppins',fontWeight:"semibold"}}>{name}</Text>
                <View className={"mt-3.5"}/>
                <View className={"bg-gray-300"} style={{width: '90%', height: 1}}/>
                <View className={"mt-3.5"}/>
            </TouchableOpacity>
            <DrawerItemList {...props} />
            <DrawerItem label="Bag" 
                activeTintColor={theme.colors.primary}
                icon={({color, size}) => <ShoppingBag color={color} className={'mr-[-16] mt-[-3]'} />}
                labelStyle={{fontFamily: 'poppins'}}
                onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    router.push('/cart')
                }} 
                />
            <DrawerItem label="Orders" 
                activeTintColor={theme.colors.primary}
                icon={({color, size}) => <DollarSignIcon color={color} className={'mr-[-16] mt-[-3]'} />}
                labelStyle={{fontFamily: 'poppins'}}
                onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    router.push('/orders')
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