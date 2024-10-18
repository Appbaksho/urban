import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { theme } from '@/theme/theme';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, selected, onPress }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: selected ? 100 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text
        className={'text-base'}
        style={[
          styles.text,
          { opacity: selected ? 1 : 0.7, color: theme.colors.primary },
        ]}
      >
        {label}
      </Text>
      <Animated.View
        className={'mt-4 rounded-b-full rounded-t-3xl'}
        style={{
          backgroundColor: theme.colors.primary,
          height: 3,
          width: widthAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  text: {
    fontFamily: 'poppins',
    fontWeight: 'semibold',
  },
});

export default Chip;