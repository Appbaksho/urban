import React from "react";
import {useLocalSearchParams} from "expo-router";
import {View} from "react-native";

export default function ProfileTab() {
  const params = useLocalSearchParams();
  const profile = params?.profile || "donor";

  return (
    <View>
      
    </View>
  );
}


