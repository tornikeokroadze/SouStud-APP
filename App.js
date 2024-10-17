import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import MainStack from "./navigation/MainStack";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <MainStack />
    </Provider>
  );
}
