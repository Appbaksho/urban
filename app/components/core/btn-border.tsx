import { theme } from "@/theme/theme";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

interface ButtonBorderedProps {
    text: string;
    onPress: () => void;
}

const ButtonBordered = (props: ButtonBorderedProps) => {
    return (
        <TouchableOpacity style={{ borderColor: theme.colors.primary, borderWidth: 1, borderRadius: 50, paddingHorizontal:20, paddingVertical:10}}>
            <Text variant={"labelSmall"} style={{color:theme.colors.primary}}>{props.text}</Text>
        </TouchableOpacity> 
    )
};

export default ButtonBordered;