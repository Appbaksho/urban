import * as Notifications from "expo-notifications";

export const triggerNotification = async (title:string,body:string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: true,
      vibrate: [0, 250, 250, 250],
      priority: Notifications.AndroidNotificationPriority.MAX,
    },
    trigger: {channelId: 'default', seconds: 1},
  });
};

export const handleRemoteMessage = async (remoteMessage:any) => {
  console.log("handling notification",remoteMessage);
  console.log(remoteMessage.data);
  console.log(remoteMessage.from);

  // topic: test
  if (remoteMessage.from==="/topics/test") {
    if (remoteMessage.data.test)
    await triggerNotification(remoteMessage.data.test,remoteMessage.data.test);
    else if (remoteMessage.notification.title) await triggerNotification(remoteMessage.notification.title,remoteMessage.notification.body);
  }
};
