import { theme } from "@/theme/theme";
import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import ButtonBordered from "../core/btn-border";
import { router } from "expo-router";
import { useGetProductsQuery } from "@/modules/products/products.api";

interface ProductGridProps {
    products?: any[];
    title: string;
}
const ProductGrid = (props:ProductGridProps) => {
    const {data: products} =  useGetProductsQuery();

    if(!products){
        return null;
    }

    const displayedProducts = products.length >= 6 ? products.slice(0, 6) : products;
    return (
        <View className={'mx-4  mt-8 items-center'}>
            <Text className={'w-full'} variant={'titleMedium'} style={{color:theme.colors.primary}}>{props.title}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 28, marginBottom:20, width: '100%' }}>
                {displayedProducts.map((product) => (
                    <View
                     onTouchEnd={() => {
                        router.push(`/product?productId=${product.id}`);
                     }}
                     key={product.id} style={{ width: '31%', marginBottom: 16 }}>
                        <Image source={{ uri: product.imageUrl[0] }} style={{ width: '100%', height: 120, borderRadius: 2 }} />
                        <Text variant="labelSmall" style={{ marginTop: 8 }}>{product.name}</Text>
                        <Text variant="bodySmall" style={{ color: 'gray' }}>{product.Category?.name}</Text>
                        {product.discountPrice ? (
                            <View style={{ flexDirection: 'column' }}>
                                <Text variant="labelSmall" style={{ color: theme.colors.primary }}>
                                    BDT {product.discountPrice}
                                </Text>
                                <Text variant="labelSmall" style={{ textDecorationLine: 'line-through', color: 'gray', marginRight: 4 }}>
                                    BDT {product.price}
                                </Text>
                            </View>
                        ) : (
                            <Text variant="labelSmall" style={{ marginTop: 4, color: theme.colors.primary }}>
                                BDT {product.price}
                            </Text>
                        )}
                       </View>
                ))}
            </View>
            <ButtonBordered text="View All" onPress={
                () => {
                    router.push(`/batch-view?title=${props.title}`);
            }} />
        </View>
    )
};

export default ProductGrid;