// import { createSlice } from "@reduxjs/toolkit";

// const CartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const item = state.cart.find((i) => i.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.cart.push({ ...action.payload, quantity: 1 });
//       }
//     },

//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter((i) => i.id !== action.payload.id);
//     },

//     incrementQuantity: (state, action) => {
//       const item = state.cart.find((i) => i.id === action.payload.id);
//       if (item) item.quantity += 1;
//     },

//     decrementQuantity: (state, action) => {
//       const item = state.cart.find((i) => i.id === action.payload.id);
//       if (!item) return;
//       if (item.quantity === 1) {
//         state.cart = state.cart.filter((i) => i.id !== action.payload.id);
//       } else {
//         item.quantity -= 1;
//       }
//     },

//     cleanCart: (state) => {
//       state.cart = [];
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   incrementQuantity, // ✅ renamed (was incementQuantity)
//   decrementQuantity,
//   cleanCart,
// } = CartSlice.actions;

// export default CartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    hydrated: false, // ← new: tracks whether we've loaded from storage yet
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload.id);
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (!item) return;
      if (item.quantity === 1) {
        state.cart = state.cart.filter((i) => i.id !== action.payload.id);
      } else {
        item.quantity -= 1;
      }
    },

    cleanCart: (state) => {
      state.cart = [];
    },

    // ✅ NEW — replaces the entire cart with stored data on app boot
    hydrateCart: (state, action) => {
      state.cart = Array.isArray(action.payload) ? action.payload : [];
      state.hydrated = true;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
  hydrateCart, // ✅ new export
} = CartSlice.actions;

export default CartSlice.reducer;
