import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';// Adjust the import path as necessary
import TopBar from '@/components/drawer/top-bar';

const FavouritesScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const data = [
        { id: '1', title: 'Favourite Item 1' },
        { id: '2', title: 'Favourite Item 2' },
        { id: '3', title: 'Favourite Item 3' },
    ];

    const renderItem = ({ item }: { item: { id: string; title: string } }) => (
        <View className="p-4 mb-2 bg-gray-200 rounded">
            <Text className="text-lg">{item.title}</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="w-full flex-col">
                <TopBar name="Favourites" />
            </View>
            <View className="flex-1 p-4">
                <Text className="text-2xl font-bold mb-4">Favourites</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default FavouritesScreen;