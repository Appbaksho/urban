import { theme } from "@/theme/theme";
import { DrawerActions } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { Menu, ShoppingBag, ShoppingCart } from "lucide-react-native";
import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    name: string;
}

const TopBar = (props: Props) => {
    const navigation = useNavigation();
    const cartItemCount = 5
    return (
        <View className={'flex-row w-full p-4 bg-white items-center'}>
            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
            }}>
                <Menu color={theme.colors.primary} />
            </TouchableOpacity>
            <Text className={'ml-5 text-base font-semibold'} style={{ fontFamily: 'poppins' }}>{props.name}</Text>
            <View className={'flex-1'} />
            {props.name!=='Settings' &&<View>
                <TouchableOpacity onPress={() => {
                    router.push('/cart');
                }}>
                    <ShoppingBag color={theme.colors.primary} />
                </TouchableOpacity>
                {cartItemCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cartItemCount}</Text>
                    </View>
                )}
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'semibold',
        fontFamily: 'poppins'
    },
});

export default TopBar;