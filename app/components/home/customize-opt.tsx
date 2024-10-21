import { theme } from "@/theme/theme";
import { ChevronRight } from "lucide-react-native";
import { ImageBackground, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

const CustomizeOption= () => {
    return (
        <View className={'w-full items-center mt-6'}>
            <ImageBackground className={'w-full h-fit'} source={{uri:'https://images.stockcake.com/public/9/7/d/97dc0e8f-7bfb-4c10-9d02-17b9e64da136_large/joyful-painted-kids-stockcake.jpg'}}>
                <TouchableOpacity className={'flex-row w-full items-center'} style={{backgroundColor:'#00000060'}}>
                <View className={'ml-4 flex-col my-4'}>
                <Text className={'text-base'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.textInvert}}>Customize with your own design!</Text>
                <View className={'mt-2'}/>
                <Text className={'text-sm opacity-70'} style={{fontFamily:'poppins',fontWeight:"semibold",color:theme.colors.textInvert}}>
                    Upload your artwork or choose from our templates to create a unique product that reflects your style.
                </Text>
                </View>
                <ChevronRight size={32} strokeWidth={1} color={theme.colors.textInvert}/>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default CustomizeOption;