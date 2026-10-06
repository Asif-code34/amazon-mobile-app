import { registerRootComponent } from "expo";

import { Provider } from "react-redux";
import StackNavigator from "./navigation/StackNavigator";
import store from "./store";
import { AppContextProvider } from "./UserContext";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppContextProvider>
          <StackNavigator />;
        </AppContextProvider>
      </Provider>
    </>
  );
}
registerRootComponent(App);
