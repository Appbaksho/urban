import { productImage } from "@/app/cart/_layout";
import { theme } from "@/theme/theme";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Image, View, Animated } from "react-native";
import { Text } from "react-native-paper";
import { ButtonWide } from "../core/btn-wide";

interface OrderItemProps {
    isLastItem?: boolean;
}

const OrderItem = (props: OrderItemProps) => {
    const [deliveryStatus, setDeliveryStatus] = useState('Pending');
    const [statusColor, setStatusColor] = useState(theme.colors.primary);
    useEffect(() => {
        //set random delivery status
        const statuses = ['Pending', 'Delivered', 'Cancelled', 'Processing', 'Shipped', 'Returned'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setDeliveryStatus(randomStatus);

        // Set color in hexadecimal values according to status
        if (randomStatus === 'Pending') {
            setStatusColor("#FFA500"); // Orange
        } else if (randomStatus === 'Delivered') {
            setStatusColor("#008000"); // Green
        } else if (randomStatus === 'Cancelled') {
            setStatusColor("#FF0000"); // Red
        } else if (randomStatus === 'Processing') {
            setStatusColor("#FFFF00"); // Yellow
        } else if (randomStatus === 'Shipped') {
            setStatusColor("#0000FF"); // Blue
        } else if (randomStatus === 'Returned') {
            setStatusColor("#808080"); // Gray
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
                    <Image className={'w-[25vw] h-[25vw]'} source={{ uri: productImage }} />
                    <View className={'flex-col ml-4'}>
                        <Text className={'text-base'} style={{ fontFamily: 'poppins', fontWeight: 'semibold',color:statusColor }}>{deliveryStatus}</Text>
                        <Text className={'text-base'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }}>{"Premium Panjabi - 230045"}</Text>
                        <Text className={'text-sm opacity-70'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }} >{"Men's pabjabi"}</Text>
                        <Text className={'text-sm opacity-70'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }} >{"Dark Charcoal - XL"}</Text>
                        <Text className={'text-sm opacity-70'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }}>{"Order Date: 2023-10-05"}</Text>
                    </View>
                </View>
                <View className={'flex-row mt-2 w-[90vw]'}>
                    <TouchableOpacity className={'flex-row items-center'}>
                        <Text className={'text-sm opacity-70 ml-1'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }}>Qnt 3</Text>
                    </TouchableOpacity>
                    <View className={'flex-1'} />
                    <Text className={'text-sm opacity-100'} style={{ fontFamily: 'poppins', fontWeight: 'semibold' }}>BDT {3450}</Text>
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