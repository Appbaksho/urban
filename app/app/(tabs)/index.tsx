import { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import NotificationComponent from "@/components/notification/notification-component";
import useLogout from '@/hooks/useLogout';
import { User } from '@firebase/auth';
import { useTestAuthMutation } from '@/modules/notification/api/notification.api';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/drawer/top-bar';

export default function HomeScreen() {
  const [user, setUser] = useState<any>();
  const navigation =  useNavigation()
  const logout = useLogout();
  const auth = getAuth();
  const [testAuth,{data,error}] = useTestAuthMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    console.log(data,error);
  }, [data,error]);

  return (
    <SafeAreaView>
      <TopBar name='Home'/>
      <NotificationComponent />
      <View className={"mt-10"} />
      <Button onPress={() => testAuth("")}>Test Auth</Button>
      <View className={"mt-10"} />
      {user && (
        <View>
          <Text>User ID: {user.uid}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
      <Button onPress={logout}>Logout</Button>
    </SafeAreaView>
  );
}