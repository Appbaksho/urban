import { View, Button } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import TopBar from '@/components/drawer/top-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <View className={'w-full flex-col'}>
        <TopBar name='Explore'/>
      </View>
    </SafeAreaView>
  );
}