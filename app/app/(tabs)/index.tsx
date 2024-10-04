import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import NotificationComponent from "@/components/notification/notification-component";
import useLogout from '@/hooks/useLogout';
import { User } from '@firebase/auth';

export default function HomeScreen() {
  const [user, setUser] = useState<any>();
  const logout = useLogout();
  const auth = getAuth();

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

  return (
    <View>
      <NotificationComponent />
      <View className={"mt-10"} />
      {user && (
        <View>
          <Text>User ID: {user.uid}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}