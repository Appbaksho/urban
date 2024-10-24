import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '@/theme/theme';
import { View } from 'react-native';
import { ChevronDown, Heart } from 'lucide-react-native';

interface ButtonWideProps {
    text: string;
    variant?: 'primary' | 'secondary';
}

export const ButtonWide: React.FC<ButtonWideProps> = ({ text, variant = 'primary' }) => {
    const backgroundColor = variant === 'primary' ? theme.colors.primary : theme.colors.textInvert;
    const textColor = variant === 'primary' ? theme.colors.textInvert : theme.colors.primary;

    return (
        <TouchableOpacity className={'p-4 items-center rounded-full justify-center'} style={[styles.button, { backgroundColor,borderWidth:variant==='primary'?0:1 }]}>
            <View className='flex-row'>
                <Text className={'text-md'} style={{ fontFamily: 'poppins', fontWeight: 'semibold', color: textColor }}>{text}</Text>
                {text==='Select Size'&&<ChevronDown color={textColor} className='ml-2' size={24}/>}
                {text==='Favourite'&&<Heart color={textColor} className='ml-2 mt-0.5' size={18} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderColor: theme.colors.primary,
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999, // Full rounded
    },
});