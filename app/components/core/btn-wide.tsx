import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { theme } from '@/theme/theme';
import { View } from 'react-native';
import { ChevronDown, Heart } from 'lucide-react-native';

interface ButtonWideProps {
    text: string;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
    onPress?: () => void;
}

export const ButtonWide: React.FC<ButtonWideProps> = (props: ButtonWideProps) => {
    console.log('ButtonWideProps', props);
    const backgroundColor = props.variant === 'primary' ? theme.colors.primary : theme.colors.textInvert;
    const textColor = props.variant === 'primary' ? theme.colors.textInvert : theme.colors.primary;

    return (
        <TouchableOpacity onPress={props.onPress} className={'p-4 items-center rounded-full justify-center'} style={[styles.button, { backgroundColor, borderWidth: props.variant === 'primary' ? 0 : 1 }]}>
            <View className='flex-row'>
                {props.loading && (
                    <ActivityIndicator size={20} className={"mr-3"} color={textColor} />
                )}
                <Text className={'text-md'} style={{ fontFamily: 'poppins', fontWeight: 'semibold', color: textColor }}>{props.text}</Text>
                {props.text === 'Select Size' && <ChevronDown color={textColor} className='ml-2' size={24} />}
                {props.text === 'Favourite' && <Heart color={textColor} className='ml-2 mt-0.5' size={18} />}
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