import { getAuth, signOut } from "@react-native-firebase/auth";
import { router } from 'expo-router';

const useLogout = () => {
  const auth = getAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      // @ts-ignore
      router.push("login")// Navigate to the login screen
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return logout;
};

export default useLogout;