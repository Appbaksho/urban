
import TopBar from "@/components/drawer/top-bar";
import CustomizeOption from "@/components/home/customize-opt";
import FeaturedCard from "@/components/home/featured-card";
import ProductSectionHorizontal from "@/components/home/product-section";
import ProductSectionHorizontalReal from "@/components/home/product-section-horizontal-real";
import { useGetMetadataQuery } from "@/modules/category/category.api";
import { useGetProductsQuery } from "@/modules/products/products.api";
import { useFocusEffect, useNavigation } from "expo-router";
import React from "react";
import { useEffect, useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data: products, isLoading: productsLoading, refetch: reFetchProd, error: productError } = useGetProductsQuery();
  const { data: metadata } = useGetMetadataQuery();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);


  useEffect(() => {
    console.log('products: ', products);
  }, [products]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Favourites Screen Focused");
      reFetchProd();
    }, [])
  );

  if (productsLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <TopBar name="Home" />
        <View className="flex-1 items-center justify-center">
          {/* Loading bar black  */}
          <ActivityIndicator size={20} className={"mr-3"} color={"#000000"} />
        </View>
      </SafeAreaView>
    );
  }

  if (productError) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <TopBar name="Home" />
        <View className="flex-1 items-center justify-center">
          {/* Loading bar black  */}

          <Text variant="labelLarge">Something went wrong</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className={'bg-white w-full h-full'}>
      <TopBar name='Home' />
      <ScrollView className={'h-full w-full'} showsVerticalScrollIndicator={false}>
        <Text className={'my-2 ml-4'} variant={'titleLarge'}>Good Morning, Kaif!</Text>
        {/* <ProductSectionHorizontal 
      title={'Top picks for You'} 
      subtitle={'Recommended products'} 
      products={['as','as','asas','asas']} 
      preview={true}
      /> */}

        <ProductSectionHorizontalReal
          products={products || []}
          title={'Top picks for You'}
        />
        {metadata && <FeaturedCard title={metadata.title} subtitle={metadata.description} image={metadata.bannerUrl} />}
        <ProductSectionHorizontalReal
          products={products || []}
          title={'Top picks for You'}
        />
        {/* <CustomizeOption/> */}
      </ScrollView>
    </SafeAreaView>
  );
}