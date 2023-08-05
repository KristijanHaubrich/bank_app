import { Alert } from "react-native";

export default  createTwoButtonAlert = (title,message) =>
Alert.alert(title, message, [
  {text: 'OK', onPress: () => {}},
]);