import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase/firebaseConfig";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function AuthGate() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading Auth...</Text>
      </View>
    );
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}



// import { View, Text, ActivityIndicator } from "react-native";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "../services/firebase/firebaseConfig";
// import AuthScreen from "../screens/auth/AuthScreen";

// export default function AuthGate() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return unsub;
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator />
//         <Text>Loading Auth...</Text>
//       </View>
//     );
//   }

//   return user ? (
//     <Text>✅ Logged In</Text>
//   ) : (
//     <AuthScreen />
//   );
// }
