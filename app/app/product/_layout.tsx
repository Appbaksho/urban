import { ButtonWide } from "@/components/core/btn-wide";
import TopBarV2 from "@/components/drawer/top-bar-v2";
import ProductSectionHorizontal from "@/components/home/product-section";
import ProductSectionHorizontalReal from "@/components/home/product-section-horizontal-real";
import { useAddToCartMutation } from "@/modules/cart/cart.api";
import { useAddToWishlistMutation, useGetProductsQuery, useGetSingleProductQuery, useGetWishlistQuery} from "@/modules/products/products.api";
import { theme } from "@/theme/theme";
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ChevronDown, Share2Icon, Star } from "lucide-react-native";
import React, { Key, useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, ImageBackground, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, StyleSheet, Image, ToastAndroid } from "react-native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
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
    const [addToBag, {data: bagData, isLoading: isBagLoading}] = useAddToCartMutation();
    const [addToFavourite, {data: favouriteData, isLoading: isFavouriteLoading}] = useAddToWishlistMutation();
    const {data: favourites, refetch: reFetchWishList } = useGetWishlistQuery();
    const { data: products, isLoading: isProductsLoading, error } = useGetProductsQuery();
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        console.log('product: ', product);
        console.log('favourites: ', favourites);
        if (favourites) {
            const isFavourite = favourites.find((fav) => fav.id === product?.id);
            setIsFav(!!isFavourite);
        }
    }, [product, favourites]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / viewportWidth);
        setActiveSlide(slideIndex);
    };


    if (isLoading) {
        return (
          <SafeAreaView className="flex-1 bg-white">
            <TopBarV2 name="Product" />
            <View className="flex-1 items-center justify-center">
              {/* Loading bar black  */}
              <ActivityIndicator size={20} className={"mr-3"} color={"#000000"} />
            </View>
          </SafeAreaView>
        );
      }
    
      if (error) {
        return (
          <SafeAreaView className="flex-1 bg-white">
            <TopBarV2 name="Bag" />
            <View className="flex-1 items-center justify-center">
              {/* Loading bar black  */}
    
              <Text variant="labelLarge">Something went wrong</Text>
            </View>
          </SafeAreaView>
        );
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
                            <ButtonWide onPress={
                                () => {
                                    if (selectedSizeId && product && product.id) {
                                    addToBag({
                                        productId: product.id,
                                        sizeId: selectedSizeId,
                                        quantity: 1,
                                    }).then((res) => {
                                        console.log('res', res);
                                        ToastAndroid.show('Added to bag', ToastAndroid.SHORT);
                                    });
                                }else {
                                    ToastAndroid.show('Please select a size', ToastAndroid.SHORT);
                                }
                            }
                            } loading={isBagLoading} text={"Add to Bag"} variant="primary" />
                            <View className="h-4" />
                            <ButtonWide 
                            onPress={
                                () => {
                                    if (product && product.id) {
                                    addToFavourite(product.id).then((res) => {
                                        console.log('res', res);
                                        ToastAndroid.show('Added to favourites', ToastAndroid.SHORT);
                                    });
                                }else {
                                    ToastAndroid.show('Please select a size', ToastAndroid.SHORT);
                                }
                            }
                            } text={"Favourite"} variant="secondary" />
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