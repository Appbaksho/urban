import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { styled } from 'nativewind';

const CartContainer = styled(View, 'flex-1 p-4 bg-white');
const CartItem = styled(View, 'flex-row justify-between items-center p-2 border-b border-gray-200');
const ItemText = styled(Text, 'text-lg');
const TotalText = styled(Text, 'text-xl font-bold mt-4');

const cartItems = [
    { id: '1', name: 'Item 1', price: 10 },
    { id: '2', name: 'Item 2', price: 20 },
    { id: '3', name: 'Item 3', price: 30 },
];

const CartScreen = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContainer>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CartItem>
                        <ItemText>{item.name}</ItemText>
                        <ItemText>${item.price}</ItemText>
                    </CartItem>
                )}
            />
            <TotalText>Total: ${total}</TotalText>
            <Button title="Checkout" onPress={() => alert('Proceed to Checkout')} />
        </CartContainer>
    );
};

export default CartScreen;