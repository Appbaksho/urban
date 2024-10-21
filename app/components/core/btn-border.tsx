import { theme } from "@/theme/theme";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

interface ButtonBorderedProps {
    text: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    wMax?: boolean
    className?: string;
    onPress: () => void;
}

const ButtonBordered = (props: ButtonBorderedProps) => {
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'tertiary'>('tertiary');
    return (
        <TouchableOpacity className={props.className} style={{ borderColor: theme.colors.primary, borderWidth: 1, borderRadius: 50, paddingHorizontal:20, paddingVertical:10}}>
            <Text variant={"labelSmall"} style={{color:theme.colors.primary}}>{props.text}</Text>
        </TouchableOpacity> 
    )
};

export default ButtonBordered;