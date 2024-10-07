import { theme } from "@/theme/theme";
import { router} from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Text, View } from 'react-native';
import { TouchableOpacity } from "react-native";

interface Props {
    name: string;
}

const TopBarV2 = (props: Props) => {
    return (
        <View className={'flex-row w-full p-4 bg-white items-center'}>
            <TouchableOpacity onPress={() => {
                router.back();
            }}>
                <ChevronLeft color={theme.colors.primary} />
            </TouchableOpacity>
            <Text className={'ml-5 text-base font-semibold'} style={{ fontFamily: 'poppins' }}>{props.name}</Text>
            <View className={'flex-1'} />
        </View>
    );
}

export default TopBarV2;