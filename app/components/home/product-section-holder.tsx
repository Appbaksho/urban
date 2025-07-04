import { theme } from "@/theme/theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface ProductSectionHolderProps {
    image?: string;
    sections?: any[];
}
const ProductSectionHolder = (props:ProductSectionHolderProps) => {
    const [image, setImage] = useState<string>('https://i.ebayimg.com/images/g/pQUAAOSwV~VgwtUA/s-l1200.jpg');
    const [sections, setSections] = useState<any[]>([]);
    useEffect(() => {
        if(props.image){
            console.log('props.image: ', props.image);
            setImage(props.image)
        }
        if(props.sections){
            setSections(props.sections)
        }else{
            const sections = [
                'New arrivals',
                'Best Sellers',
                'Trending',
                'Discounts',
                'Offers',
                'Winter Collection',
            ]
            setSections(sections)
        }
    }, []);

    useEffect(() => {
        console.log('props.image: ', props.image);
        if(props.image)setImage(props.image)
    }, [props.image]);
    return (
        <View>
            <ImageBackground className={'w-full h-fit mt-6'} source={{uri:image}}>
            <View className={'flex-col w-full'} style={{backgroundColor:'#00000050'}}>
                {
                    sections.map((section, index) => (
                        <View key={index}>
                            {index ===0 && (
                                <View style={{ height: 6 , marginVertical: 0 }} />
                            )}
                            <TouchableOpacity className={'mx-4 my-6'}
                                onPress={() => {
                                    router.push(`/batch-view?title=${section}`);
                                }}
                            >
                                <Text  variant={'titleMedium'} style={{color:theme.colors.textInvert}}>{section}</Text>
                            </TouchableOpacity>
                            {index !== sections.length - 1 && (
                                <View style={{ height: 3, backgroundColor: 'white', marginVertical: 6 }} />
                            )}
                            {index ===sections.length-1 && (
                                <View style={{ height: 6 , marginVertical: 0 }} />
                            )}
                        </View>
                    ))
                }
            </View>
        </ImageBackground>
        </View>
    )
};

export default ProductSectionHolder;