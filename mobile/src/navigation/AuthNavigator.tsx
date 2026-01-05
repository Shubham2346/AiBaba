import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
// import OTPScreen from "../screens/auth/otpScreen";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  // OTP: { phoneNumber?: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      id = "AuthStack"
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ gestureEnabled: false }}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ gestureEnabled: true }}
      />

      {/* <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{ gestureEnabled: true }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
