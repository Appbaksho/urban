import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';// Adjust the import path as necessary
import TopBar from '@/components/drawer/top-bar';
import ProductGrid2 from '@/components/favourute/product-grid-2';
import { useGetWishlistQuery } from '@/modules/products/products.api';
import { ActivityIndicator } from 'react-native-paper';
import FavouriteProductsGrid from '@/components/favourute/product-grid-2';
import { useFocusEffect } from 'expo-router';

const FavouritesScreen = () => {
    const navigation = useNavigation();
    const {data: favourites, isLoading: productsLoading, refetch: reFetchFavs} = useGetWishlistQuery();


    useFocusEffect(
        React.useCallback(() => {
          console.log("Favourites Screen Focused");  
          reFetchFavs();
        }, [])
      );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const data = [
        { id: '1', title: 'Favourite Item 1' },
        { id: '2', title: 'Favourite Item 2' },
        { id: '3', title: 'Favourite Item 3' },
    ];

    const renderItem = ({ item }: { item: { id: string; title: string } }) => (
        <View className="p-4 mb-2 bg-gray-200 rounded">
            <Text className="text-lg">{item.title}</Text>
        </View>
    );

    if (productsLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <TopBar name="Favourites" />
                <View className="flex-1 items-center justify-center">
                    {/* Loading bar black  */}
                    <ActivityIndicator size={20} className={"mr-3"} color={"#000000"} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="w-full flex-col">
                <TopBar name="Favourites" />
            </View>
            {/* <ProductGrid2 title="Favourites" /> */}
            <FavouriteProductsGrid title="Favourites" wishlist={favourites} />
            
        </SafeAreaView>
    );
};

export default FavouritesScreen;