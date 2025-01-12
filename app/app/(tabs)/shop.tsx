import React, { useEffect, useLayoutEffect, useState } from 'react';
import {ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import useLogout from '@/hooks/useLogout';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/drawer/top-bar';
import Chip from '@/components/home/chip';
import ProductSectionHorizontal from '@/components/home/product-section';
import { theme } from '@/theme/theme';
import ProductSectionHolder from '@/components/home/product-section-holder';
import ProductGrid from '@/components/home/product-grid';
import { useGetMetadataQuery } from '@/modules/category/category.api';
import CategorySectionHorizontal from '@/components/home/category-card-horizontal';


const ShopLayout = () => {
      const [user, setUser] = useState<any>();
      const [selectedChip, setSelectedChip] = useState<string>('Men');
      const navigation = useNavigation();
      const {data: metadata} =  useGetMetadataQuery();
      const logout = useLogout();
      const auth = getAuth();
    
      useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
          if (currentUser) {
            setUser(currentUser);
          } else {
            setUser(undefined);
          }
        });
    
        return () => unsubscribe();
      }, [auth]);
    
        useEffect(() => {
            console.log('selectedChip: ', selectedChip);
        }, [selectedChip]);  
      
    return (
      <SafeAreaView className={'h-full bg-white items-center'}>
      <TopBar name='Shop' />
      <View className={'flex-1'}>
        <View className={'flex-row pt-3 pb-5 mx-4'}>
          {['Men', 'Women', 'Anime'].map((label) => (
            <Chip
              key={label}
              label={label}
              selected={selectedChip === label}
              onPress={() => setSelectedChip(label)}
            />
          ))}
        </View>
        <View className={'w-[100vw] bg-gray-300'} style={{height:1}}/>
        <ScrollView showsVerticalScrollIndicator={false} className={'flex-1 w-full'}>
            <CategorySectionHorizontal title={'Shop by category'} parentCategoryId={selectedChip}/>
            <ProductSectionHolder image={
              metadata&&metadata.parentCategory.filter(parentCategory => parentCategory.name === selectedChip).length>0?
              metadata.parentCategory.filter(parentCategory => parentCategory.name === selectedChip)[0].imageUrl:
              "https://i.ebayimg.com/images/g/pQUAAOSwV~VgwtUA/s-l1200.jpg"
            } />
            <ProductGrid  title={'Winter Collection'} />
            <ProductGrid  title={'New Arrivals'} />
            <View className={'w-full'} style={{height:30}}/>  
        </ScrollView>
      </View>
    </SafeAreaView>
    );
}

export default ShopLayout;