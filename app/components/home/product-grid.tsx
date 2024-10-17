import { theme } from "@/theme/theme";
import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import ButtonBordered from "../core/btn-border";

interface ProductGridProps {
    products?: any[];
    title: string;
}
const ProductGrid = (props:ProductGridProps) => {
    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        if(props.products){
            setProducts(props.products)
        }else{
            const products = [
                { id: '1', name: 'Cool hoodie', category:"Men's Hoodie",price: 5000, image:"https://ae01.alicdn.com/kf/S5d0c36e590de46718085c47bca9521d2Y/Anime-Hoodie-Mens-Fashion-Warm-Sweatshirt-Graphical-Printed-Hip-Hop-Hoodies-Casual-Streetwear-Spring-Autumn-New.jpg" },
                { id: '2', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '3', name: 'Tokyo Ghoul Hoodie', category:"Men's Hoodie", price: 5000, image:"https://m.media-amazon.com/images/I/B1i3u9-Q-KS._CLa%7C2140%2C2000%7CB1OmqTjzswL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SL1500_.png" },
                { id: '4', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '5', name: 'Cool hoodie', category:"Men's Hoodie",price: 5000, image:"https://ae01.alicdn.com/kf/S5d0c36e590de46718085c47bca9521d2Y/Anime-Hoodie-Mens-Fashion-Warm-Sweatshirt-Graphical-Printed-Hip-Hop-Hoodies-Casual-Streetwear-Spring-Autumn-New.jpg" },
                { id: '6', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"}
            ]
            setProducts(products)
        }
    }, []);

    return (
        <View className={'mx-4  mt-8 items-center'}>
             <Text variant={'titleMedium'} style={{color:theme.colors.primary}}>{props.title}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 28, marginBottom:20, width: '100%' }}>
                {products.map((product) => (
                    <View key={product.id} style={{ width: '31%', marginBottom: 16 }}>
                        <Image source={{ uri: product.image }} style={{ width: '100%', height: 120, borderRadius: 2 }} />
                        <Text variant="labelSmall" style={{ marginTop: 8 }}>{product.name}</Text>
                        <Text variant="bodySmall" style={{ color: 'gray' }}>{product.category}</Text>
                        <Text variant="labelSmall" style={{ marginTop: 4, color: theme.colors.primary }}>${product.price}</Text>
                    </View>
                ))}
            </View>
            <ButtonBordered text="View All" onPress={function (): void {
                console.log('View All Pressed');
            } } />
        </View>
    )
};

export default ProductGrid;