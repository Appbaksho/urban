import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Text } from 'react-native';
import { CircleUserRound, House, Map } from "lucide-react-native";
import { theme } from "@/theme/theme";
import CustomDrawerContent from '@/components/drawer/custom-drawer-content';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomDrawerContent}>
      <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            drawerActiveTintColor: theme.colors.primary,
            drawerLabelStyle: {
              fontFamily: 'poppins',
            },
          }
        }
        />
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerActiveTintColor: theme.colors.primary,
            drawerLabelStyle: {
              fontFamily: 'poppins',
            },
          }}
        />
        <Drawer.Screen
          name="cart"
          options={{
            drawerLabel: 'Cart',
            title: 'Cart',
            drawerActiveTintColor: theme.colors.primary,
            drawerLabelStyle: {
              fontFamily: 'poppins',
            },
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            drawerLabel: 'Explore',
            title: 'Explore',
            drawerActiveTintColor: theme.colors.primary,
            drawerLabelStyle: {
              fontFamily: 'poppins',
            },
          }}
        />
        <Drawer.Screen
          name="favourites"
          options={{
            drawerLabel: 'Favourites',
            title: 'Favourites',
            drawerActiveTintColor: theme.colors.primary,
            drawerLabelStyle: {
              fontFamily: 'poppins',
            },
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerActiveTintColor: theme.colors.primary,
            drawerLabelStyle: {
              fontFamily: 'poppins',
            },
          }}
          />  
      </Drawer>
    </GestureHandlerRootView>
  );
}