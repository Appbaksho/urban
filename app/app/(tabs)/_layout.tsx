import { Tabs } from 'expo-router';
import React from 'react';
import TabBarIcon from '@expo/vector-icons/AntDesign'
import {CircleUserRound, House, Map} from "lucide-react-native";
import {theme} from "@/theme/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
            height: 55,
        },
        tabBarActiveTintColor: theme.colors.primary,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
              <House size={28} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Map size={28} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused }) => (
                    <CircleUserRound size={28} color={color}/>
                ),
            }}
      />
    </Tabs>
  );
}

