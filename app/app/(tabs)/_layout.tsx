import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { theme } from "@/theme/theme";
import {Earth, Heart, House, Settings, ShoppingBag, Store} from "lucide-react-native"
import CustomDrawerContent from '@/components/drawer/custom-drawer-content';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomDrawerContent}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerActiveTintColor: theme.colors.primary,
            drawerLabelStyle: {
              fontFamily: 'poppins',
            },
            drawerIcon: ({ color, size }) => (
              <House className={'mr-[-16] mt-[-3]'} color={color}/>
            ),
          }}
        />
        <Drawer.Screen
          name="shop"
          options={{
            drawerLabel: 'Shop',
            title: 'Shop',
            drawerActiveTintColor: theme.colors.primary,
            drawerLabelStyle: {
              fontFamily: 'poppins',
            },
            drawerIcon: ({ color, size }) => (
              <Store className={'mr-[-16] mt-[-3]'} color={color}/>
            ),
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
            drawerIcon: ({ color, size }) => (
              <Heart className={'mr-[-16] mt-[-3]'} color={color}/>
            ),
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
            drawerIcon: ({ color, size }) => (
              <Settings className={'mr-[-16] mt-[-3]'} color={color}/>
            ),
          }}
          />
      </Drawer>
    </GestureHandlerRootView>
  );
}