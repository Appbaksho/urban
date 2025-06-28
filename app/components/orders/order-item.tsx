import { productImage } from "@/app/cart/_layout";
import { theme } from "@/theme/theme";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Image, View, Animated } from "react-native";
import { Text } from "react-native-paper";
import { ButtonWide } from "../core/btn-wide";
import { Item } from "@/modules/cart/cart.model";

interface OrderItemProps {
    isLastItem?: boolean;
    orderItem: Item
}

const OrderItem = (props: OrderItemProps) => {
    const [deliveryStatus, setDeliveryStatus] = useState('Pending');
    const [statusColor, setStatusColor] = useState(theme.colors.primary);
    useEffect(() => {
        //set random delivery status
        //const statuses = ['Pending', 'Delivered', 'Cancelled', 'Processing', 'Shipped', 'Returned'];
        const randomStatus = props.orderItem.deliveryStatus;
        setDeliveryStatus(randomStatus);

        // Set color in hexadecimal values according to status
        if (randomStatus === 'PENDING') {
            setStatusColor("#FFA500"); // Orange
        } else if (randomStatus === 'DISPATCHED') {
            setStatusColor("#0000FF"); // Blue
        } else if (randomStatus === 'DELIVERED') {
            setStatusColor("#008000"); // Green
        } else if (randomStatus === 'CANCELLED') {
            setStatusColor("#FF0000"); // Red
        }

    }, []);


    //animation shits
    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        if (expanded) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setExpanded(false));
        } else {
            setExpanded(true);
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const animatedHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // Adjust the height as needed
    });


    return (
        <View className={'flex-row justify-between  mt-6 '}>
            <TouchableOpacity onPress={toggleExpand} className={'flex-col'}>
                <View className={'flex-row'}>
                    <Image className={'w-[25vw] h-[25vw]'} source={{ uri: props.orderItem.orderDetail.imageUrl }} />
                    <View className={'flex-col ml-4'}>
                        <Text className={'text-base'} style={{ fontFamily: 'poppins', fontWeight: 'semibold',color:statusColor }}>{deliveryStatus}</Text>
                        <Text className={'text-base'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }}>{props.orderItem.orderDetail.productName}</Text>
                        <Text className={'text-sm opacity-70'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }} >Size: {props.orderItem.orderDetail.size}</Text>
                        <Text className={'text-sm opacity-70'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }}>Ordered on: {new Date(props.orderItem.createdAt).toLocaleDateString()}</Text>
                    </View>
                </View>
                <View className={'flex-row mt-2 w-[90vw]'}>
                    <TouchableOpacity className={'flex-row items-center'}>
                        <Text className={'text-sm opacity-70 ml-1'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }}>Qnt {props.orderItem.quantity}</Text>
                    </TouchableOpacity>
                    <View className={'flex-1'} />
                    <Text className={'text-sm opacity-100'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }}>BDT {props.orderItem.orderDetail.price}</Text>
                </View>
                {expanded && (
                <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
                    <View className="mt-4">
                        <ButtonWide variant="primary" text="Track Order" />
                    </View>
                </Animated.View>
                )}
                <View className={'mt-4'} />
                {props.isLastItem ? null :
                    //if last item then no need to show the divider
                    <View className={'flex-col'}>
                        <View className={'bg-gray-300'} style={{ width: "100%", height: 1 }} />
                        <View className={'mt-4'} />
                    </View>
                }
                 
            </TouchableOpacity>
           
        </View>
    )
};
export default OrderItem;