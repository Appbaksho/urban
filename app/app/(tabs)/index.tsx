import { Text } from 'react-native';
import { Image, StyleSheet, Platform, View } from 'react-native';
import { Button } from 'react-native-paper';
import NotificationComponent from "@/components/notification/notification-component";

export default function HomeScreen() {
  return (
    <View>
      <NotificationComponent />
    </View>
  );
}
