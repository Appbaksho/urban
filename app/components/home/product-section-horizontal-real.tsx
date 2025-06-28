import { Product } from "@/modules/products/products.model"
import { theme } from "@/theme/theme"
import { router } from "expo-router"
import React from "react"
import { useEffect, useState } from "react"
import { ScrollView, View, Image } from "react-native"
import { Text } from "react-native-paper"
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors"

interface ProductSectionProps {
    title: string
    subtitle?: string
    products: Product[]
}

const ProductSectionHorizontalReal = (props:ProductSectionProps) => {
    console.log(props);
    const [products, setProducts] = useState<Product[]>([])
    // set example products if preview is true
    useEffect(() => {
        if(props.products){
            setProducts(props.products)
        }
    }, [])

    return (
        <View className={'mx-4 mt-4'}>
            <Text variant={'titleMedium'} style={{color:theme.colors.primary,marginVertical:0}}>{props.title}</Text> 
            {!props.subtitle&&<Text variant={'bodyLarge'} className={'opacity-75'} style={{color:theme.colors.primary}}>{props.subtitle}</Text>}  
            <View className="mt-3"/>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className={'flex-row gap-3'}>
                {props.products.map((product, index) => (
                    <View key={index} onTouchEndCapture={
                        ()=>{
                            console.log('product clicked');
                            router.push(`/product?productId=${product.id}`);
                        }
                    }>
                        <Image className={'w-36 h-48 rounded-lg mb-1'} source={{uri:product.imageUrl[0]}}/>
                        <Text variant={'labelSmall'}  style={{color:theme.colors.primary}}>{product.name}</Text>
                        {(
                            <>
                                <Text variant={'bodySmall'} className={'opacity-75'} style={{color:theme.colors.primary}}>{product.Category?.name}</Text>
                                {product.discountPrice && (
                                    <Text variant={'labelSmall'} style={{color:theme.colors.primary}}>BDT {
                                        product.discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }</Text>
                                )}
                                <Text variant={product.discountPrice?'bodySmall':'labelSmall'} style={{color:theme.colors.primary, textDecorationLine: product.discountPrice ? 'line-through' : 'none'}}>BDT {
                                    //commafy the price
                                    product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }</Text>
                                
                            </>
                        )}
                    </View>
                ))}
            </ScrollView> 
        </View>
    )
}

export default ProductSectionHorizontalReal