import { useGetMetadataQuery } from "@/modules/category/category.api"
import { theme } from "@/theme/theme"
import { router } from "expo-router"
import React from "react"
import { useEffect, useState } from "react"
import { ScrollView, View, Image } from "react-native"
import { Text } from "react-native-paper"
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors"

interface CategorySectionProps {
    parentCategoryId: string
    title: string
}

const CategorySectionHorizontal = (props: CategorySectionProps) => {
    console.log(props);
    
    const {data:metadata} =  useGetMetadataQuery();

    return (
        <View className={'mx-4 mt-4'}>
            <Text variant={'titleMedium'} style={{color:theme.colors.primary,marginVertical:8}}>{props.title}</Text>
            <View className="mt-3"/>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className={'flex-row gap-3'}>
                {metadata&&metadata.parentCategory
                .filter(parentCategory => parentCategory.name === props.parentCategoryId).length>0?
                metadata.parentCategory
                .filter(parentCategory => parentCategory.name === props.parentCategoryId)[0].categories
                .map((category, index) => (
                    <View key={index} onTouchEndCapture={
                        ()=>{
                            console.log('product clicked');
                            router.push(`/batch-view?title=${props.parentCategoryId}&category=${category.name}`);
                        }
                    }>
                        <Image className={'w-36 h-36 rounded-lg mb-2'} source={{uri:category.imageUrl}}/>
                        <Text variant={'labelSmall'}  style={{color:theme.colors.primary}}>{category.name}</Text>
                    </View>
                )) :
                <Text className="my-2" variant="labelMedium">Category not found</Text>
            }
            </ScrollView> 
        </View>
    )
}

export default CategorySectionHorizontal