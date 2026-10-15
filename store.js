// import { configureStore } from "@reduxjs/toolkit";
// import CartReducer from "./redux/cartReducer";

// export default configureStore({
//   reducer: {
//     cart: CartReducer,
//   },
// });

import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import CartReducer, { hydrateCart } from "./redux/cartReducer";

const CART_STORAGE_KEY = "@amazon_cart_v1";

const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

// ─── Persist cart to AsyncStorage on every change ───
let isFirstRun = true;
store.subscribe(() => {
  // Skip the very first subscription call — happens before hydration
  if (isFirstRun) {
    isFirstRun = false;
    return;
  }

  const state = store.getState();

  // Only persist after hydration is complete — avoids wiping the saved cart
  // on the very first save before we've loaded it
  if (!state.cart.hydrated) return;

  AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.cart)).catch(
    (err) => console.log("Cart persist error:", err),
  );
});

// ─── Restore cart from AsyncStorage on app boot ───
export const hydrateCartFromStorage = async () => {
  try {
    const saved = await AsyncStorage.getItem(CART_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    store.dispatch(hydrateCart(parsed));
  } catch (err) {
    console.log("Cart restore error:", err);
    store.dispatch(hydrateCart([]));
  }
};

export default store;
