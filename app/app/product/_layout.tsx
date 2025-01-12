import { ButtonWide } from "@/components/core/btn-wide";
import TopBarV2 from "@/components/drawer/top-bar-v2";
import ProductSectionHorizontal from "@/components/home/product-section";
import ProductSectionHorizontalReal from "@/components/home/product-section-horizontal-real";
import { useGetProductsQuery, useGetSingleProductQuery } from "@/modules/products/products.api";
import { theme } from "@/theme/theme";
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ChevronDown, Share2Icon, Star } from "lucide-react-native";
import React, { Key, useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, ImageBackground, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { SafeAreaView } from "react-native-safe-area-context";
const { width: viewportWidth } = Dimensions.get('window');
const ProductLayout = () => {
    const params = useLocalSearchParams();
    const productId = params.productId as string;
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [sizeId, setSizeId] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
    const { data: product, isLoading } = useGetSingleProductQuery(productId);
    const { data: products, isLoading: isProductsLoading } = useGetProductsQuery();
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    useEffect(() => {
        console.log('product: ', product);
    }, [product])

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / viewportWidth);
        setActiveSlide(slideIndex);
    };

    if (isLoading) {
        return <Text>Loading...</Text>
    }

    if (!product) {
        return <Text>Product not found</Text>
    }

    return (
        <SafeAreaView className="bg-white w-full">
            <TopBarV2 name={product?.name} />
            <ScrollView showsVerticalScrollIndicator={false} className="h-full">
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {product?.imageUrl.map((image: string, index: number) => (
                        <Image source={{ uri: image }} className="w-[100vw] h-[85vw]" />
                    ))}
                </ScrollView>
                <View className="mt-[-30]" />
                <View style={styles.dotContainer}>
                    {product?.imageUrl.map((_: any, index: Key | null | undefined) => (
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

                        <Text variant={'titleMedium'} className="mt-4" style={{ color: theme.colors.primary }}>{product?.name}</Text>
                        <Text variant={'labelMedium'} className="mt-1">{product.Category?.name}</Text>

                        {product.discountPrice && (
                            <Text variant={'labelMedium'} className="mt-2.5" style={{ color: theme.colors.primary }}>BDT {
                                product.discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }</Text>
                        )}
                        <Text variant={product.discountPrice ? 'bodyMedium' : 'labelMedium'} style={{ textDecorationLine: product.discountPrice ? 'line-through' : 'none' }} className={product.discountPrice ? "mt-1" : "mt-2.5"}>BDT {
                            //comma separated price
                            product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }</Text>
                        <Text className="mt-8" variant="bodySmall">
                            {product.description}
                        </Text>

                        <TouchableOpacity className="mt-2">
                            <Text variant="labelSmall" style={{ textDecorationLine: 'underline' }}>
                                Open in Browser
                            </Text>
                        </TouchableOpacity>

                        <View className="mt-8 mr-4 flex-col">

                            <View className="mt-4">
                                {/* <ButtonWide text={"Select Size"} variant="secondary" />*/}
                                <Text className="text-base font-semibold">Select Size</Text>
                                <View className="flex-row flex-wrap mt-2">
                                    {product.sizes.map((size) => (
                                        <TouchableOpacity
                                            key={size.id}
                                            onPress={() => setSelectedSizeId(size.id)}
                                            className={`border border-black rounded-md p-2 m-1 w-12 h-12 items-center justify-center ${selectedSizeId === size.id ? 'bg-black' : 'bg-white'
                                                }`}
                                        >
                                            <Text className={`${selectedSizeId === size.id ? 'text-white' : 'text-black'}`}>
                                                {size.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            <View className="h-8" />
                            <ButtonWide text={"Add to Bag"} />
                            <View className="h-4" />
                            <ButtonWide text={"Favourite"} variant="secondary" />
                        </View>
                        <View className="mt-8 h-[1] mr-4 bg-gray-200" />
                        <View className="mt-4 h-[1] mr-4 bg-gray-200" />
                        <TouchableOpacity className="mt-4 p-4 flex-row items-center">
                            <View className="flex-1" />
                            <Text variant="labelMedium">Share</Text>
                            <View className="mx-1" />
                            <Share2Icon color={theme.colors.primary} size={16} />
                            <View className="flex-1" />
                        </TouchableOpacity>
                        <View className="mt-4 h-[1] mr-4 bg-gray-200" />
                        <View className="mt-4" />
                        <ProductSectionHorizontalReal
                            products={products || []}
                            title={'Top picks for You'}
                        />
                        <View className="h-16" />
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