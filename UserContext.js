import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token from storage:", token);

        if (!token) {
          console.warn("No token found in AsyncStorage");
          return;
        }

        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        setUserId(decoded.id);
      } catch (err) {
        console.error("Failed to decode token:", err.message);
      }
    };

    fetchUser();
  }, []);

  console.log(userId);
  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `http://172.20.10.3:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <AppContext.Provider
      value={{ userId, setUserId, fetchAddress, addresses, setAddresses }}
    >
      {children}
    </AppContext.Provider>
  );
};
