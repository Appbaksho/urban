import { theme } from "@/theme/theme";
import { Heart } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Image, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

interface ProductGrid2Props {
    products?: any[];
    title: string;
}
const ProductGrid2 = (props:ProductGrid2Props) => {
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
                { id: '6', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '7', name: 'Cool hoodie', category:"Men's Hoodie",price: 5000, image:"https://ae01.alicdn.com/kf/S5d0c36e590de46718085c47bca9521d2Y/Anime-Hoodie-Mens-Fashion-Warm-Sweatshirt-Graphical-Printed-Hip-Hop-Hoodies-Casual-Streetwear-Spring-Autumn-New.jpg" },
                { id: '8', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '9', name: 'Tokyo Ghoul Hoodie', category:"Men's Hoodie", price: 5000, image:"https://m.media-amazon.com/images/I/B1i3u9-Q-KS._CLa%7C2140%2C2000%7CB1OmqTjzswL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SL1500_.png" },
                { id: '10', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '11', name: 'Cool hoodie', category:"Men's Hoodie",price: 5000, image:"https://ae01.alicdn.com/kf/S5d0c36e590de46718085c47bca9521d2Y/Anime-Hoodie-Mens-Fashion-Warm-Sweatshirt-Graphical-Printed-Hip-Hop-Hoodies-Casual-Streetwear-Spring-Autumn-New.jpg" },
                { id: '12', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"},
                { id: '13', name: 'Casual Demin', category:"Men's Demin", price: 5000, image:"https://img.drz.lazcdn.com/static/bd/p/53e72a92469dc5f08a5fec41a743e89c.jpg_720x720q80.jpg"}
            ]
            setProducts(products)
        }
    }, []);
    return (
        <ScrollView >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                {products.map((product) => (
                    <View key={product.id} style={{ width: '49%',  marginBottom: 16 }}>
                        <ImageBackground  source={{ uri: product.image }} className="w-full h-[48vw]" style={{ borderRadius: 2 }}>
                            <TouchableOpacity className="absolute top-2 right-2  bg-white rounded-full p-1" >
                            <Heart size={20} color="white" fill={theme.colors.primary} />
                            </TouchableOpacity>
                         </ImageBackground>
                        <View className="ml-2">
                        <Text variant="labelSmall" style={{ marginTop: 8 }}>{product.name}</Text>
                        <Text variant="bodySmall" style={{ color: 'gray' }}>{product.category}</Text>
                        <Text variant="labelSmall" style={{ marginTop: 4, color: theme.colors.primary }}>${product.price}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default ProductGrid2;