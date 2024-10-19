import TopBarV2 from "@/components/drawer/top-bar-v2";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Key, useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, ImageBackground, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const { width: viewportWidth } = Dimensions.get('window');
const ProductLayout = () => {
    const params = useLocalSearchParams();
    const productId = params.productId;
    const navigation = useNavigation();
    useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    }, [navigation]);
    const [product,setProduct] = useState<any>()
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(()=>{
        setProduct({
            name: 'Tokyo Ghoul Hoodie', 
            category:"Men's Hoodie",
            price: 5000, 
            images: Array(5).fill("https://ae01.alicdn.com/kf/S5d0c36e590de46718085c47bca9521d2Y/Anime-Hoodie-Mens-Fashion-Warm-Sweatshirt-Graphical-Printed-Hip-Hop-Hoodies-Casual-Streetwear-Spring-Autumn-New.jpg"),
            sizes: ['M','L','XL','XXL'],
            color: ['White','Black'],
        })
    },[])

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / viewportWidth);
        setActiveSlide(slideIndex);
    };

    return (
        <SafeAreaView className="bg-white w-full">
            <TopBarV2 name={product?.name}/>
            <ScrollView showsVerticalScrollIndicator={false} className="h-full">
            <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {product?.images.map((image: string, index: number) => (
                        <Image source={{uri:image}} className="w-[100vw] h-[85vw]"/>
                    ))}
                </ScrollView>
                <View className="mt-[-30]"/>
                <View style={styles.dotContainer}>
                    {product?.images.map((_: any, index: Key | null | undefined) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                { backgroundColor: index === activeSlide ? 'black' : 'gray' },
                            ]}
                        />
                    ))}
                </View>
                <View className="flex-1 mt-[30]"> 
                    <Text variant={'titleMedium'} style={{color:'black'}}>{product?.name}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});

export default ProductLayout;