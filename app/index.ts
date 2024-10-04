import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import * as Notifications from "expo-notifications";
import { handleRemoteMessage } from "@/utils/notification/notification-manager";
import { App } from "expo-router/build/qualified-entry";
import 'expo-router/entry';
import Constants from 'expo-constants'

// Polyfill global URL and URLSearchParams
global.URL = URL;
global.URLSearchParams = URLSearchParams;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const isRunningInExpoGo = Constants.appOwnership === 'expo'
// Register background handler
if (!isRunningInExpoGo) {
  console.log("Device is not Expo Go");
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    handleRemoteMessage(remoteMessage);
  });
}else {
  console.log("Device is Expo Go");
}
// Register the main application component
AppRegistry.registerComponent('main', () => App);