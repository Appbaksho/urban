
import TopBar from "@/components/drawer/top-bar";
import CustomizeOption from "@/components/home/customize-opt";
import FeaturedCard from "@/components/home/featured-card";
import ProductSectionHorizontal from "@/components/home/product-section";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);
  return (
    <SafeAreaView className={'bg-white w-full h-full'}>
    <TopBar name='Home' />
    <ScrollView className={'h-full w-full'} showsVerticalScrollIndicator={false}>
      <Text className={'my-2 ml-4'} variant={'titleLarge'}>Good Morning, Kaif!</Text>
      <ProductSectionHorizontal 
      title={'Top picks for You'} 
      subtitle={'Recommended products'} 
      products={['as','as','asas','asas']} 
      preview={true}
      />
      <FeaturedCard title={"FLAT DISCOUNT 30%"} subtitle={"Anime ft. Tshirts"} image={"https://down-sg.img.susercontent.com/file/sg-11134201-7rd5r-lw49z0rw16nma5"}/>
      <ProductSectionHorizontal 
      title={'You May Like'} 
      subtitle={'Lifestyle'} 
      products={['as','as','asas','asas']} 
      preview={true}
      />
      <CustomizeOption/>
    </ScrollView>
</SafeAreaView>
  );
}