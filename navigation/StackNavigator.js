import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import { useSelector } from "react-redux";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import CartScreen from "../screens/CartScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderScreen from "../screens/OrderScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";

import { useAuth } from "../UserContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ACTIVE = "#008E97";
const INACTIVE = "#9CA3AF";

const BottomTabs = () => {
  // If you're using Redux, use: const cart = useSelector(state => state.cart.cart);
  // Then: const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const cart = useSelector((state) => state.cart.cart);
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <Tab.Navigator
      // screenOptions={{
      //   headerShown: false,
      //   tabBarActiveTintColor: ACTIVE,
      //   tabBarInactiveTintColor: INACTIVE,
      //   tabBarStyle: {
      //     height: Platform.OS === "ios" ? 88 : 64,
      //     paddingTop: 8,
      //     paddingBottom: Platform.OS === "ios" ? 28 : 8,
      //     borderTopWidth: 1,
      //     borderTopColor: "#E5E7EB",
      //     backgroundColor: "#FFFFFF",
      //   },
      //   tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      // }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 88 : Platform.OS === "web" ? 90 : 64,
          paddingTop: Platform.OS === "web" ? 10 : 8,
          paddingBottom:
            Platform.OS === "ios" ? 28 : Platform.OS === "web" ? 16 : 8,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          lineHeight: Platform.OS === "web" ? 16 : 14,
          marginTop: Platform.OS === "web" ? 4 : 0,
          marginBottom: Platform.OS === "web" ? 4 : 0,
          includeFontPadding: false,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === "web" ? 2 : 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Entypo
              name="home"
              size={size ?? 24}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ focused, size }) => (
            <AntDesign
              name="shopping-cart"
              size={size ?? 24}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#FF3B30",
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: "700",
            minWidth: 18,
            height: 18,
            lineHeight: 18,
            borderRadius: 9,
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size ?? 24}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const { token, authLoading } = useAuth();

  if (authLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          // ─── Logged In ───
          <>
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="Info" component={ProductInfoScreen} />
            {/* <Stack.Screen name="Address" component={AddAddressScreen} />
            <Stack.Screen name="Add" component={AddressScreen} /> */}
            <Stack.Screen name="AddressList" component={AddAddressScreen} />
            <Stack.Screen name="AddressForm" component={AddressScreen} />
            <Stack.Screen name="Confirm" component={ConfirmationScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
          </>
        ) : (
          // ─── Logged Out ───
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
