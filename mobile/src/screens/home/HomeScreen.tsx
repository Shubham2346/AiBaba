import { View, Text, Button } from "react-native";
import { logout } from "../../services/firebase/auth";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        🏠 Welcome to AiBaba
      </Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}
