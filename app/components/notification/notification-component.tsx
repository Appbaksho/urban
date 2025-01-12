// import { Button, View } from 'react-native';
// import { triggerNotification } from "@/utils/notification/notification-manager";
// import {useEffect} from "react";



// export default function NotificationComponent() {
//   const [sendTestNotification, {data,error}] = useSendTestNotificationMutation();
//   useEffect(()=>{
//       console.log(data,error)
//   },[data,error])
//   return (
//     <View className={"p-10 mt-64"}>
//       <Button title="Send Local Notification" onPress={
//         () => triggerNotification('Hey! 📬','This is a local notification!')
//       } />
//       <View className={"mt-10"} />
//       <Button title="Send Remote Notification" onPress={
//          () => sendTestNotification("")
//       } />
//     </View>
//   );
// }

