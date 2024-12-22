import React, { useState, useEffect } from 'react';
import { useCreateProfileMutation } from "@/modules/profile/api/profile.api";
import { View, Text, TextInput, Button, ActivityIndicator, ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import { getAuth } from '@react-native-firebase/auth';

const CreateProfileLayout = () => {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        photoUrl: '',
        homeAddress: '',
        permanentAddress: '',
        shippingAddress: '',
        gender: 'MALE',
        contactNumbers: ['']
    });

    const [createProfile, { isLoading, data, error }] = useCreateProfileMutation();

    const handleInputChange = (name: string, value: string | string[]) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'contactNumbers' ? (value as string).split(', ') : value
        }));
    };

    useEffect(()=>{
        console.log(data,error)
    },[data,error])

    const handleSubmit = async () => {
        try {
            await createProfile(formData);
            // push name in auth
            if(!error)
            getAuth().currentUser?.updateProfile({
                displayName: formData.name,
                photoURL: formData.photoUrl,
            }).then(r => {
                router.push('/(tabs)');
            });
           
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (data) {
            ToastAndroid.show('Profile created successfully!', ToastAndroid.SHORT);
        }
    }, [data]);

    return (
        <View className={`p-4`}>
            <Text className={`text-lg font-bold mb-4`}>Create Profile</Text>
            <TextInput
                className={`border p-2 mb-2`}
                placeholder="Name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
                className={`border p-2 mb-2`}
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChangeText={(text) => handleInputChange('dateOfBirth', text)}
            />
            <TextInput
                className={`border p-2 mb-2`}
                placeholder="Photo URL"
                value={formData.photoUrl}
                onChangeText={(text) => handleInputChange('photoUrl', text)}
            />
            <TextInput
                className={`border p-2 mb-2`}
                placeholder="Home Address"
                value={formData.homeAddress}
                onChangeText={(text) => handleInputChange('homeAddress', text)}
            />
            <TextInput
                className={`border p-2 mb-2`}
                placeholder="Permanent Address"
                value={formData.permanentAddress}
                onChangeText={(text) => handleInputChange('permanentAddress', text)}
            />
            <TextInput
                className={`border p-2 mb-2`}
                placeholder="Shipping Address"
                value={formData.shippingAddress}
                onChangeText={(text) => handleInputChange('shippingAddress', text)}
            />
            <TextInput
                className={`border p-2 mb-2`}
                placeholder="Gender"
                value={formData.gender}
                onChangeText={(text) => handleInputChange('gender', text)}
            />
            <TextInput
                className={`border p-2 mb-2`}
                placeholder="Contact Numbers"
                value={formData.contactNumbers.join(', ')}
                onChangeText={(text) => handleInputChange('contactNumbers', text)}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Create Profile" onPress={handleSubmit} />
            )}
            {error && <Text className={`text-red-500 mt-2`}>Error: {(error as Error).message}</Text>}
        </View>
    );
};

export default CreateProfileLayout;