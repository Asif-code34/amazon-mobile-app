// import { registerRootComponent } from "expo";
// import { useEffect, useState } from "react";
// import { Provider } from "react-redux";
// import StackNavigator from "./navigation/StackNavigator";
// import SplashScreen from "./screens/SplashScreen";
// import store, { hydrateCartFromStorage } from "./store";
// import { AppContextProvider } from "./UserContext";

// SplashScreen.preventAutoHideAsync().catch(() => {});

// function App() {
//   const [cartReady, setCartReady] = useState(false);

//   useEffect(() => {
//     (async () => {
//       await hydrateCartFromStorage();
//       setCartReady(true);
//     })();
//   }, []);

//   if (!cartReady) {
//     // Show splash while loading cart from AsyncStorage
//     return <SplashScreen />;
//   }

//   return (
//     <Provider store={store}>
//       <AppContextProvider>
//         <StackNavigator />
//       </AppContextProvider>
//     </Provider>
//   );
// }

// export default App;
// registerRootComponent(App);

import { registerRootComponent } from "expo";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import StackNavigator from "./navigation/StackNavigator";
import SplashScreen from "./screens/SplashScreen";
import store, { hydrateCartFromStorage } from "./store";
import { AppContextProvider } from "./UserContext";

function App() {
  const [cartReady, setCartReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await hydrateCartFromStorage();
      } catch (e) {
        console.log("Cart hydrate error:", e);
      }
      setCartReady(true);
    })();
  }, []);

  if (!cartReady) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <AppContextProvider>
        <StackNavigator />
      </AppContextProvider>
    </Provider>
  );
}

export default App;
registerRootComponent(App);
