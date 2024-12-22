import { theme } from "@/theme/theme"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, View, Image } from "react-native"
import { Text } from "react-native-paper"
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors"

interface ProductSectionProps {
    title: string
    subtitle?: string
    products?: any[]
    preview?: boolean
    isCategoryList?: boolean
}

const ProductSectionHorizontal = (props:ProductSectionProps) => {
    console.log(props);
    const [products, setProducts] = useState<any[]>([])
    // set example products if preview is true
    useEffect(() => {
        if(props.preview){
            const products = [
                { id: '1', name: 'Cool hoodie', category:"Men's Hoodie",price: 5000, image:"https://ae01.alicdn.com/kf/S5d0c36e590de46718085c47bca9521d2Y/Anime-Hoodie-Mens-Fashion-Warm-Sweatshirt-Graphical-Printed-Hip-Hop-Hoodies-Casual-Streetwear-Spring-Autumn-New.jpg" },
                { id: '2', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '3', name: 'Tokyo Ghoul Hoodie', category:"Men's Hoodie", price: 5000, image:"https://m.media-amazon.com/images/I/B1i3u9-Q-KS._CLa%7C2140%2C2000%7CB1OmqTjzswL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SL1500_.png" },
                { id: '4', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '5', name: 'Cool hoodie', category:"Men's Hoodie",price: 5000, image:"https://ae01.alicdn.com/kf/S5d0c36e590de46718085c47bca9521d2Y/Anime-Hoodie-Mens-Fashion-Warm-Sweatshirt-Graphical-Printed-Hip-Hop-Hoodies-Casual-Streetwear-Spring-Autumn-New.jpg" },
                { id: '6', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '7', name: 'Tokyo Ghoul Hoodie', category:"Men's Hoodie", price: 5000, image:"https://m.media-amazon.com/images/I/B1i3u9-Q-KS._CLa%7C2140%2C2000%7CB1OmqTjzswL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SL1500_.png" },
                { id: '8', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
            ]
            setProducts(products)
        }
    }, [])

    return (
        <View className={'mx-4 mt-4'}>
            <Text variant={'titleMedium'} style={{color:theme.colors.primary,marginVertical:props.isCategoryList?8:0}}>{props.title}</Text> 
            {!props.subtitle&&<Text variant={'bodyLarge'} className={'opacity-75'} style={{color:theme.colors.primary}}>{props.subtitle}</Text>}  
            <View className="mt-3"/>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className={'flex-row gap-3'}>
                {products&&products.map((product, index) => (
                    <View key={index} onTouchEndCapture={
                        ()=>{
                            console.log('product clicked');
                            if(!props.isCategoryList)router.push(`/product?productId=${product.id}`);
                            else router.push(`/batch-view?title=${product.name}&category=${product.category}`);
                        }
                    }>
                        {!props.isCategoryList&&<Image className={'w-36 h-48 rounded-lg mb-1'} source={{uri:product.image}}/>}
                        {props.isCategoryList&&<Image className={'w-36 h-36 rounded-lg mb-2'} source={{uri:product.image}}/>}
                        <Text variant={'labelSmall'}  style={{color:theme.colors.primary}}>{product.name}</Text>
                        {!props.isCategoryList && (
                            <>
                                <Text variant={'bodySmall'} className={'opacity-75'} style={{color:theme.colors.primary}}>{product.category}</Text>
                                <Text variant={'labelSmall'} style={{color:theme.colors.primary}}>BDT {
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

export default ProductSectionHorizontal