import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styled } from 'nativewind';

const data = [
    { id: '1', title: 'Favourite Item 1' },
    { id: '2', title: 'Favourite Item 2' },
    { id: '3', title: 'Favourite Item 3' },
];

const FavouritesScreen = () => {
    const renderItem = ({ item }: { item: { id: string; title: string } }) => (
        <View className="p-4 mb-2 bg-gray-200 rounded">
            <Text className="text-lg">{item.title}</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold mb-4">Favourites</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default FavouritesScreen;
