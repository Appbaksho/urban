import TopBarV2 from "@/components/drawer/top-bar-v2";
import Chip from "@/components/home/chip";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {  ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const BatchViewLayout = () => {

    const [selectedChip, setSelectedChip] = useState<string>('T-Shirts');

    const params = useLocalSearchParams();
        const title = params.title as string;
        const category = params.category as string;

        

        const [categoryList, setCategoryList] = useState<string[]>(['T-Shirts', 'Hoodies', 'Sweatshirts', 'Jackets', 'Pants', 'Shorts', 'Shoes', 'Accessories']); 

        useEffect(() => {
            if(category){
                setCategoryList([category, ...categoryList.filter((item) => item !== category)]);
                setSelectedChip(category);
            }
        }, [category]);

        const navigation = useNavigation();
        useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
        }, [navigation]);


    return (
        <SafeAreaView className={'flex-1 flex-col bg-white'}>
            <TopBarV2 name={title} />

            {/* Chips section  */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className={'flex-row pt-3 pb-5'}>
            {categoryList.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={selectedChip === label}
              onPress={() => setSelectedChip(label)}
            />
            ))}
            </View>
            </ScrollView>

            {/* Product section */}

            <ScrollView className={'h-full w-full'} showsVerticalScrollIndicator={false}>
           
            
            </ScrollView>
        </SafeAreaView>
    );
}

export default BatchViewLayout;