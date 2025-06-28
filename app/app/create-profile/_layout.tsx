import React, { useLayoutEffect, useState } from 'react';
import { View, Image, ToastAndroid, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Divider, useTheme } from 'react-native-paper';
import { router, useNavigation, useRouter } from 'expo-router';
import { Text, TextInput } from 'react-native-paper';
import { useCreateUserMutation } from '@/modules/auth/auth.api'; 
import CustomButton from '@/components/core/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUploadImageMutation } from '@/modules/file/file.api';
import { getAuth } from '@react-native-firebase/auth';
const CreateProfileLayout = () => {
    const theme = useTheme();
    const router = useRouter();
    const [uploadImage, { isLoading: isUploading, data: uploadData, error: uploadError }] = useUploadImageMutation();
    
        const navigation = useNavigation()
        useLayoutEffect(() => {
                navigation.setOptions({
                  headerShown: false,
                });
        }, [navigation]);

    const [formData, setFormData] = useState({
        name: '',
        photoUrl: '',
        shippingAddress: '',
        contactNumbers: [''],
        zipCode: '',
        city: ''
    });

    const handleImageUpload = async () => {
        await pickImage();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });
    
        if (Array.isArray(result.assets) && result.assets.length > 0) {
          const url = getFormData(result.assets[0]);
          uploadImage(url)
            .then((res: any) => {
              console.log(res);  
              const img = res.data.imageUrl;
              setFormData((prevState) => ({ ...prevState, photoUrl: img }));
              console.log(formData);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };


    const [createProfile, { isLoading, data, error }] = useCreateUserMutation();

    const handleInputChange = (name: string, value: string | string[]) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await createProfile(formData);
            await getAuth().currentUser?.updateProfile({
                displayName: formData.name,
                photoURL: formData.photoUrl
            });
            ToastAndroid.show('Profile created successfully!', ToastAndroid.SHORT);
            router.push('/(tabs)');
        } catch (err) {
            ToastAndroid.show('Failed to create profile.', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView className={'h-full w-full bg-white items-center justify-center'}>   
        <ScrollView showsVerticalScrollIndicator={false} className={'flex-1 bg-white w-full px-4 py-8'}>
            <View className='flex flex-col mt-6 mb-4'>
                {!isUploading&&formData.photoUrl===''&&<Image source={require('@/assets/images/avatar-person.png')} className={'w-[30vw] h-[30vw] mx-auto'} resizeMode={'contain'}/>}
                {isUploading&&<ActivityIndicator className={'w-[30vw] h-[30vw] mx-auto'} color={theme.colors.primary} size={24}/>}
                {!isUploading&&formData.photoUrl!==''&&<Image source={{uri:formData.photoUrl}} className={'w-[30vw] h-[30vw] mx-auto rounded-full'} resizeMode={'contain'}/>}
                <View className='flex flex-row mt-[-24] '>
                <View className='w-16'></View>
                <CameraIcon onPress={
                    () => pickImage()
                } fill={theme.colors.primary} fillRule='nonzero' color={theme.colors.backdrop} size={36} className='mx-auto'/>
                </View>
            </View>
            <Text variant="titleMedium" className="text-center">
                Create Profile
            </Text>
            <View className="mt-5">
                <TextInput
                    value={formData.name}
                    placeholder="Name"
                    mode="outlined"
                    outlineColor={theme.colors.primary}
                    onChangeText={(text) => handleInputChange('name', text)}
                    className="mb-3"
                />
                <TextInput
                    value={formData.shippingAddress}
                    placeholder="Shipping Address"
                    mode="outlined"
                    outlineColor={theme.colors.primary}
                    onChangeText={(text) => handleInputChange('shippingAddress', text)}
                    className="mb-3"
                />
                <View className='flex flex-row w-full'>
                    <View className="border px-4 flex items-center justify-center mb-3 bg-gray-200 rounded-lg">
                        <Text className="text-lg">+88</Text>
                    </View>
                <View className='w-2'></View>
                <TextInput
                    value={formData.contactNumbers[0]}
                    placeholder="Contact Number"
                    mode="outlined"
                    outlineColor={theme.colors.primary}
                    onChangeText={(text) => handleInputChange('contactNumbers', [text])}
                    className="mb-3 flex-1"
                />
                </View>
                <View className='flex flex-row w-full'>
                <TextInput
                    value={formData.zipCode}
                    placeholder="Zip Code"
                    mode="outlined"
                    outlineColor={theme.colors.primary}
                    onChangeText={(text) => handleInputChange('zipCode', text)}
                    className="mb-3 flex-1"
                />
                <View className='w-3'></View>
                <TextInput
                    value={formData.city}
                    placeholder="City"
                    mode="outlined"
                    outlineColor={theme.colors.primary}
                    onChangeText={(text) => handleInputChange('city', text)}
                    className="mb-3 flex-1"
                />
                </View>
            </View>
            <CustomButton className="mt-5" onPress={handleSubmit} loading={isLoading}>
                {isLoading ? "Creating..." : "Create Profile"}
            </CustomButton>
            {error && <Text className="text-red-500 mt-4">{error.message}</Text>}
            <View className="flex items-center">
                <Divider bold className="my-5 w-[200px]" />
                <View className="flex flex-row items-center gap-2">
                    <Text variant="bodySmall">Already have an Account?</Text>
                    <Text
                        onPress={() => router.push("/login")}
                        variant="bodySmall"
                        style={{ color: theme.colors.primary }}
                    >
                        Login
                    </Text>
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};

const getFormData = (asset: ImagePicker.ImagePickerAsset) => {
    const data = new FormData();
    // @ts-ignore
    data.append("image", {
      uri: asset.uri,
      name: asset.uri.split("/").pop(),
      type: asset.mimeType
    });
    return data;
  };

export default CreateProfileLayout;