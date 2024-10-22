import ButtonBordered from "@/components/core/btn-border";
import { ButtonWide } from "@/components/core/btn-wide";
import TopBarV2 from "@/components/drawer/top-bar-v2";
import ProductSectionHorizontal from "@/components/home/product-section";
import { theme } from "@/theme/theme";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ChevronDown, Share2Icon, Star } from "lucide-react-native";
import { Key, useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, ImageBackground, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
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
    const [activeVariant, setActiveVariant] = useState(0);

    useEffect(()=>{
        setProduct({
            name: 'Tokyo Ghoul Hoodie', 
            category:"Men's Hoodie",
            price: 5000, 
            images: Array(5).fill("https://ae01.alicdn.com/kf/S5d0c36e590de46718085c47bca9521d2Y/Anime-Hoodie-Mens-Fashion-Warm-Sweatshirt-Graphical-Printed-Hip-Hop-Hoodies-Casual-Streetwear-Spring-Autumn-New.jpg"),
            sizes: ['M','L','XL','XXL'],
            color: ['White','Black','Purple','Red'],
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
                <View className="ml-4 flex-1 mt-[30]">
                    <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-1 w-full h-[33vw]">
                        {product?.color.map((color: string,index:number) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setActiveVariant(index);
                                }}
                            >
                                <View
                                    style={{
                                        marginLeft: index === 0 ? 0 : 10,
                                        borderColor: theme.colors.primary,
                                        borderWidth: activeVariant === index ? 1 : 0,
                                        borderRadius: 5,
                                        padding: activeVariant === index ? 2 : 0, // Add padding to create a gap between border and image
                                    }}
                                >
                                    <Image
                                        style={{
                                            borderRadius: 5,
                                        }}
                                        className="h-[30vw] w-[30vw]"
                                        source={{ uri: product.images[0] }}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView> 
                    <Text variant={'titleMedium'} className="mt-4" style={{color:theme.colors.primary}}>{product?.name}</Text>
                    <Text variant={'labelMedium'} className="mt-1">{product?.category}</Text>
                    <Text variant={'labelMedium'} className="mt-2.5">BDT {
                        //comma separated price
                        product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }</Text>    
                    <Text className="mt-8" variant="bodySmall">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe placeat reprehenderit accusamus ut veniam necessitatibus similique cum earum magni minima possimus at assumenda harum dolor porro est distinctio sunt illum pariatur quas labore, expedita ipsum iusto. Consectetur doloribus voluptate magni aperiam praesentium quae, voluptas recusandae, quod neque dignissimos et molestiae, repellat velit dolores tenetur saepe.</Text>
                    <Text className="mt-4" variant="labelSmall">
                        Shown: {product?.color[activeVariant]}
                    </Text>

                    <TouchableOpacity className="mt-2">
                        <Text variant="labelSmall" style={{ textDecorationLine: 'underline' }}>
                            Open in Browser
                        </Text>
                    </TouchableOpacity>

                    <View className="mt-8 mr-4 flex-col">
                        <ButtonWide text={"Select Size"} variant="secondary"/>
                        <View className="h-4"/>
                        <ButtonWide text={"Add to Bag"}/>
                        <View className="h-4"/>
                        <ButtonWide text={"Favourite"} variant="secondary"/>
                    </View>
                    <View className="mt-8 h-[1] mr-4 bg-gray-200"/>
                    <TouchableOpacity className="mt-4 p-4 flex-row ">
                        <Text variant="labelMedium">Reviews {'(112)'}</Text>
                        <View className="flex-1"/>
                        <View className="flex-row mr-2">
                            <Star color={theme.colors.primary} size={16}/>
                            <Star color={theme.colors.primary} size={16}/>
                            <Star color={theme.colors.primary} size={16}/>
                            <Star color={theme.colors.primary} size={16}/>
                            <Star color={theme.colors.primary} size={16}/>
                        </View>
                        <ChevronDown color={theme.colors.primary} size={16}/>
                    </TouchableOpacity>
                    <View className="mt-4 h-[1] mr-4 bg-gray-200"/>
                    <TouchableOpacity className="mt-4 p-4 flex-row items-center">
                        <View className="flex-1"/>
                        <Text variant="labelMedium">Share</Text>
                        <View className="mx-1"/>
                        <Share2Icon color={theme.colors.primary} size={16}/>
                        <View className="flex-1"/>
                     </TouchableOpacity>   
                     <View className="mt-4 h-[1] mr-4 bg-gray-200"/>
                     <View className="mt-8"/>
                     <ProductSectionHorizontal title={'You Might Also Like'} isCategoryList={false} preview={true}/>
                    <View className="h-16"/>    
                </View>
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