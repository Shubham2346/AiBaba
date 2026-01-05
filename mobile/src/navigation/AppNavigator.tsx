import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator id="root">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
