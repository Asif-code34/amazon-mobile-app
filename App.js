import { registerRootComponent } from "expo";
import { Platform, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import StackNavigator from "./navigation/StackNavigator";
import store from "./store";
import { AppContextProvider } from "./UserContext";

// 🎯 Remove browser's default focus ring on web
if (Platform.OS === "web" && typeof document !== "undefined") {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    input, textarea, select {
      outline: none !important;
      outline-width: 0 !important;
      box-shadow: none !important;
      border-color: transparent !important;
    }
    input:focus, textarea:focus, select:focus {
      outline: none !important;
      outline-width: 0 !important;
      box-shadow: none !important;
      border-color: transparent !important;
    }
  `;
  document.head.appendChild(style);
}
function App() {
  return (
    <View style={styles.root}>
      <View style={styles.appContainer}>
        <Provider store={store}>
          <AppContextProvider>
            <StackNavigator />
          </AppContextProvider>
        </Provider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#E5E7EB", // light grey outside the "phone"
    alignItems: "center",
    justifyContent: "center",
  },
  appContainer: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 480 : "100%",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    ...(Platform.OS === "web" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    }),
  },
});

export default App;
registerRootComponent(App);
