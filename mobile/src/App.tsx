import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthGate from "./navigation/AuthGate";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthGate />
      </NavigationContainer>
    </Provider>
  );
}
