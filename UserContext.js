// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createContext, useContext, useEffect, useState } from "react";
// import api from "./services/axios";

// const AppContext = createContext(null);

// export const AppContextProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null);
//   const [token, setToken] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [addresses, setAddresses] = useState([]);

//   // Load saved auth on mount
//   useEffect(() => {
//     (async () => {
//       try {
//         const [savedToken, savedUserId] = await Promise.all([
//           AsyncStorage.getItem("token"),
//           AsyncStorage.getItem("userId"),
//         ]);
//         if (savedToken && savedUserId) {
//           setToken(savedToken);
//           setUserId(savedUserId);
//         }
//       } catch (e) {
//         console.log("Auth restore error:", e);
//       } finally {
//         setAuthLoading(false);
//       }
//     })();
//   }, []);

//   const signIn = async (newToken, newUserId) => {
//     await AsyncStorage.setItem("token", newToken);
//     await AsyncStorage.setItem("userId", newUserId);
//     setToken(newToken);
//     setUserId(newUserId);
//   };

//   const signOut = async () => {
//     await AsyncStorage.removeItem("token");
//     await AsyncStorage.removeItem("userId");
//     setToken(null);
//     setUserId(null);
//     setAddresses([]);
//   };

//   // Fetch addresses for the logged-in user
//   const fetchAddress = async () => {
//     if (!userId) return;
//     try {
//       const response = await api.get(`/addresses/${userId}`);
//       setAddresses(response.data.addresses || []);
//     } catch (error) {
//       console.log("fetchAddress error:", error.message);
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         userId,
//         setUserId,
//         token,
//         authLoading,
//         signIn,
//         signOut,
//         addresses,
//         setAddresses,
//         fetchAddress,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // ✅ Keep BOTH exports so old and new screens work
// export const useAuth = () => {
//   const ctx = useContext(AppContext);
//   if (!ctx) throw new Error("useAuth must be used inside AppContextProvider");
//   return ctx;
// };

// export { AppContext };

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import api from "./services/axios";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  // Load saved auth on mount
  useEffect(() => {
    (async () => {
      try {
        const [savedToken, savedUserId] = await Promise.all([
          AsyncStorage.getItem("token"),
          AsyncStorage.getItem("userId"),
        ]);
        if (savedToken && savedUserId) {
          setToken(savedToken);
          setUserId(savedUserId);
        }
      } catch (e) {
        console.log("Auth restore error:", e);
      } finally {
        setAuthLoading(false);
      }
    })();
  }, []);

  const signIn = async (newToken, newUserId) => {
    await AsyncStorage.setItem("token", newToken);
    await AsyncStorage.setItem("userId", newUserId);
    setToken(newToken);
    setUserId(newUserId);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
    setAddresses([]);
  };

  // Fetch addresses for the logged-in user
  const fetchAddress = async () => {
    if (!userId) return;
    try {
      const response = await api.get(`/addresses/${userId}`);
      setAddresses(response.data.addresses || []);
    } catch (error) {
      console.log("fetchAddress error:", error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        token,
        authLoading,
        signIn,
        signOut,
        addresses,
        setAddresses,
        fetchAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAuth must be used inside AppContextProvider");
  return ctx;
};

export { AppContext };
