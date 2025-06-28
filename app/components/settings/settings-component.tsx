import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";


interface SettingComponentProps {
    label: string;
    value: string;
    isRed?: boolean;
    isDeviderInvissible?: boolean;
}

const SettingComponent = (props: SettingComponentProps) => {
    return (
        <TouchableOpacity className="flex-col">

        
        {/* label text */}
    <View className='flex-row w-full my-4'>
    <Text className='ml-4' variant='labelMedium' style={{
        color: props.isRed ? 'red' : 'black'
    }}>{props.label}</Text>
    <View className='flex-1'/>
    <Text className='mr-4' variant='bodyMedium'>{props.value}</Text>
    </View>

    {/* Devider  */}
    {!props.isDeviderInvissible&&<View className='w-full h-0.5 bg-gray-200'/>}
    </TouchableOpacity>
    )
};

export default SettingComponent;