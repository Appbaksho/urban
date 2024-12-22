import { theme } from "@/theme/theme";
import { router } from "expo-router";
import { View } from "react-native";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

interface FeaturedCardProps {
    title: string;
    subtitle: string;
    image: string;    
}

const FeaturedCard = (props: FeaturedCardProps) => {
    return (
        <View>
            <ImageBackground className={'w-full h-fit my-4'} source={{uri:props.image}}>
                <View className={'flex-col w-full h-[100vw]'} style={{backgroundColor:'#00000070'}}>
                    <View className={'flex-1'}/>
                    <Text className={'text-white ml-7 pr-10'} variant={'bodyMedium'}>{props.subtitle}</Text>
                    <Text className={'text-white mt-2 ml-7 pr-10'} variant={'displayLarge'}>{props.title}</Text>
                    <TouchableOpacity className={'ml-7 mt-2 border border-white bg-white rounded-full w-24 items-center'}
                        onPress={() => {
                            router.push(`/batch-view?title=${props.title}&category=${props.subtitle}`);
                        }}
                    >
                        <Text  variant="labelSmall" className={'p-2'} style={{color:theme.colors.primary}}>Shop Now</Text>
                    </TouchableOpacity>
                    <View className={'flex-[0.2]'}/>
                </View>
            </ImageBackground>
        </View>
    ); 
}

export default FeaturedCard;