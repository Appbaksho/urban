import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";
            import { styled } from "nativewind";
import { Linking } from "react-native";
import React from "react";
const CustomDrawerContent = (props: any) => {
    const ProfileContainer = styled(View, "flex flex-row items-center p-4 bg-gray-800");
    const ProfileImage = styled(Image, "w-16 h-16 rounded-full mr-4");
    const ProfileTextContainer = styled(View, "flex flex-col");
    const ProfileName = styled(Text, "text-white text-lg font-bold");
    const ProfileEmail = styled(Text, "text-gray-400 text-sm");
    const profileImageUri = "https://i.pinimg.com/736x/d3/68/50/d36850a37f999852c69a34b2cad4b35d.jpg"; // Replace with actual image URI
    return (
        <DrawerContentScrollView {...props}>
            <ProfileContainer>
                <ProfileImage source={{ uri: profileImageUri }} />
                <ProfileTextContainer>
                    <ProfileName>John Doe</ProfileName>
                    <ProfileEmail>john.doe@example.com</ProfileEmail>
                </ProfileTextContainer>
            </ProfileContainer>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;