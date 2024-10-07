import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { theme } from "@/theme/theme";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { handleRemoteMessage } from "@/utils/notification/notification-manager";
import { Platform, StatusBar } from "react-native";
import Constants from "expo-constants";
import { getAuth } from '@react-native-firebase/auth';
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync().then(r => console.log(r));

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('You need to enable notifications in the app settings.');
    return;
  }
  if (Platform.OS === 'android')
  await Notifications.setNotificationChannelAsync('default', {
    name: 'default notifications',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    sound: 'default',
  });
}

export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
    poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
    poppinsBold: require('@/assets/fonts/Poppins-Bold.ttf'),
    poppinsMedium: require('@/assets/fonts/Poppins-Medium.ttf'),
    poppinsSemiBold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    poppinsLight: require('@/assets/fonts/Poppins-Light.ttf'),
    poppinsExtraLight: require('@/assets/fonts/Poppins-ExtraLight.ttf'),
    poppinsThin: require('@/assets/fonts/Poppins-Thin.ttf'),
    poppinsItalic: require('@/assets/fonts/Poppins-Italic.ttf'),
    poppinsBoldItalic: require('@/assets/fonts/Poppins-BoldItalic.ttf'),
    poppinsMediumItalic: require('@/assets/fonts/Poppins-MediumItalic.ttf'),
    poppinsSemiBoldItalic: require('@/assets/fonts/Poppins-SemiBoldItalic.ttf'),
    poppinsLightItalic: require('@/assets/fonts/Poppins-LightItalic.ttf'),
    poppinsExtraLightItalic: require('@/assets/fonts/Poppins-ExtraLightItalic.ttf'),
    poppinsThinItalic: require('@/assets/fonts/Poppins-ThinItalic.ttf'),
    poppinsBlack: require('@/assets/fonts/Poppins-Black.ttf'),
    poppinsBlackItalic: require('@/assets/fonts/Poppins-BlackItalic.ttf'),
    poppinsExtraBold: require('@/assets/fonts/Poppins-ExtraBold.ttf'),
    poppinsExtraBoldItalic: require('@/assets/fonts/Poppins-ExtraBoldItalic.ttf')
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(r => console.log(r));
      const isRunningInExpoGo = Constants.appOwnership === 'expo'
      if (!isRunningInExpoGo) {
        // Register this things only when using a physical device or emulator, but not Expo Go
        messaging().getToken().then(token => {console.log(token);});
       // messaging().onTokenRefresh(token => {console.log(token);});
        messaging().subscribeToTopic('test').then(() => console.log('Subscribed to topic!'));
        messaging().subscribeToTopic('discount').then(() => console.log('Subscribed to discounts topic!'));
        messaging().subscribeToTopic('delivery').then(() => console.log('Subscribed to delivery topic!'));
        messaging().subscribeToTopic('order').then(() => console.log('Subscribed to order topic!'));

        return messaging().onMessage(async remoteMessage => {
          await handleRemoteMessage(remoteMessage);
          console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
      }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then(r => console.log(r));
      if (getAuth().currentUser) {
        if (getAuth().currentUser?.displayName) {
          router.push("/(tabs)");
        }else router.push("/create-profile");
      }
      else router.push("/login");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return(
      <PaperProvider theme={theme} settings={{rippleEffectEnabled:false}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="create-profile" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
  );
}