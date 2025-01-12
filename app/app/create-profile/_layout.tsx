import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import { getAuth } from '@react-native-firebase/auth';
import { useCreateUserMutation } from '@/modules/auth/auth.api'; 

const CreateProfileLayout = () => {
    const [formData, setFormData] = useState({
        name: '',
        photoUrl: '',
        shippingAddress: '',
        contactNumbers: [''],
        zipCode: '',
        city: ''
    });

    const [createProfile, { isLoading, data, error }] = useCreateUserMutation();

    const handleInputChange = (name: string, value: string | string[]) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'contactNumbers' ? (value as string).split(', ') : value
        }));
    };

    const handleSubmit = async () => {
        try {
            await createProfile(formData);
            ToastAndroid.show('Profile created successfully!', ToastAndroid.SHORT);
            router.push('/(tabs)');
        } catch (err) {
            ToastAndroid.show('Failed to create profile.', ToastAndroid.SHORT);
        }
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <Text className="text-lg font-bold mb-4">Create Profile</Text>
            <TextInput
                className="border p-2 mb-4"
                placeholder="Name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
                className="border p-2 mb-4"
                placeholder="Photo URL"
                value={formData.photoUrl}
                onChangeText={(text) => handleInputChange('photoUrl', text)}
            />
            <TextInput
                className="border p-2 mb-4"
                placeholder="Shipping Address"
                value={formData.shippingAddress}
                onChangeText={(text) => handleInputChange('shippingAddress', text)}
            />
            <TextInput
                className="border p-2 mb-4"
                placeholder="Contact Numbers (comma separated)"
                value={formData.contactNumbers.join(', ')}
                onChangeText={(text) => handleInputChange('contactNumbers', text)}
            />
            <TextInput
                className="border p-2 mb-4"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChangeText={(text) => handleInputChange('zipCode', text)}
            />
            <TextInput
                className="border p-2 mb-4"
                placeholder="City"
                value={formData.city}
                onChangeText={(text) => handleInputChange('city', text)}
            />
            <Button title={isLoading ? "Creating..." : "Create Profile"} onPress={handleSubmit} disabled={isLoading} />
            {isLoading && <ActivityIndicator className="mt-4" />}
            {error && <Text className="text-red-500 mt-4">{error.message}</Text>}
        </View>
    );
};

export default CreateProfileLayout;