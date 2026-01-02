import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../services/firebase/firebaseConfig";
import { setUser } from "../store/auth/authSlice";
import AuthNavigation from "./AuthNavigator";
import { View, ActivityIndicator } from "react-native";
import { RootState } from "../store";

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <MainApp /> : <AuthNavigation />;
};

export default AppNavigator;
