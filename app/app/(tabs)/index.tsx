
import TopBar from "@/components/drawer/top-bar";
import CustomizeOption from "@/components/home/customize-opt";
import FeaturedCard from "@/components/home/featured-card";
import ProductSectionHorizontal from "@/components/home/product-section";
import ProductSectionHorizontalReal from "@/components/home/product-section-horizontal-real";
import { useGetMetadataQuery } from "@/modules/category/category.api";
import { useGetProductsQuery } from "@/modules/products/products.api";
import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {data: products, isLoading} =  useGetProductsQuery();
  const {data: metadata} =  useGetMetadataQuery();
  const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);


  useEffect(() => {
    console.log('products: ', products);
  }, [products]);    
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
      {metadata&&<FeaturedCard title={metadata.title} subtitle={metadata.description} image={metadata.bannerUrl}/>}
      <ProductSectionHorizontalReal
        products={products || []}
        title={'Top picks for You'}
      />
      {/* <CustomizeOption/> */}
    </ScrollView>
</SafeAreaView>
  );
}