// import { Feather, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import api from "../services/axios";
// import { useAuth } from "../UserContext";

// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const { userId, signOut } = useAuth();

//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loggingOut, setLoggingOut] = useState(false);

//   const load = async (isRefresh = false) => {
//     try {
//       isRefresh ? setRefreshing(true) : setLoading(true);

//       const [profileRes, ordersRes] = await Promise.all([
//         api.get(`/profile/${userId}`),
//         api.get(`/orders/${userId}`),
//       ]);

//       setUser(profileRes.data.user);
//       setOrders(ordersRes.data.orders || []);
//     } catch (err) {
//       console.log("Profile load error:", err.message);
//       // Don't alert on load errors — just show empty state
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) load();
//   }, [userId]);

//   const handleLogout = () => {
//     Alert.alert("Logout", "Are you sure you want to log out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setLoggingOut(true);
//             await signOut();
//             // StackNavigator auto-swaps to Login when token becomes null
//           } catch (err) {
//             Alert.alert("Error", "Could not log out. Try again.");
//           } finally {
//             setLoggingOut(false);
//           }
//         },
//       },
//     ]);
//   };

//   // ─── Loading state ───
//   if (loading && !user) {
//     return (
//       <SafeAreaView style={styles.safeArea} edges={["top"]}>
//         <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//         <View style={styles.centerState}>
//           <ActivityIndicator size="large" color="#008E97" />
//           <Text style={styles.centerText}>Loading profile…</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top"]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Profile</Text>
//         <Pressable hitSlop={8}>
//           <Feather name="bell" size={22} color="#111827" />
//         </Pressable>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => load(true)}
//             tintColor="#008E97"
//           />
//         }
//       >
//         {/* ─── User card ─── */}
//         <View style={styles.userCard}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>
//               {user?.name?.[0]?.toUpperCase() ?? "?"}
//             </Text>
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.greeting}>Welcome back</Text>
//             <Text style={styles.userName} numberOfLines={1}>
//               {user?.name ?? "User"}
//             </Text>
//             <Text style={styles.userEmail} numberOfLines={1}>
//               {user?.email ?? ""}
//             </Text>
//           </View>
//         </View>

//         {/* ─── Quick action tiles ─── */}
//         <View style={styles.tilesRow}>
//           {/* <ActionTile
//             icon={<Feather name="package" size={22} color="#008E97" />}
//             label="Your Orders"
//             value={orders.length}
//           /> */}

//           <ActionTile
//             icon={<Feather name="package" size={22} color="#008E97" />}
//             label="Your Orders"
//             value={orders.length}
//             onPress={() => navigation.navigate("Order")}
//           />

//           <ActionTile
//             icon={<Feather name="map-pin" size={22} color="#008E97" />}
//             label="Addresses"
//             onPress={() => navigation.navigate("AddressList")}
//           />
//         </View>

//         <View style={styles.tilesRow}>
//           <ActionTile
//             icon={<Feather name="repeat" size={22} color="#008E97" />}
//             label="Buy Again"
//             onPress={() => navigation.navigate("Home")}
//           />
//           <ActionTile
//             icon={<Feather name="user" size={22} color="#008E97" />}
//             label="Your Account"
//           />
//         </View>

//         {/* ─── Recent orders ─── */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Recent Orders</Text>
//           {orders.length > 0 && (
//             <Pressable hitSlop={8} onPress={() => navigation.navigate("Order")}>
//               <Text style={styles.sectionLink}>See all</Text>
//             </Pressable>
//           )}
//         </View>

//         {orders.length === 0 ? (
//           <View style={styles.emptyOrders}>
//             <View style={styles.emptyIconWrap}>
//               <Feather name="shopping-bag" size={32} color="#9CA3AF" />
//             </View>
//             <Text style={styles.emptyTitle}>No orders yet</Text>
//             <Text style={styles.emptySubtitle}>
//               Your past orders will appear here
//             </Text>
//             <Pressable
//               onPress={() => navigation.navigate("Home")}
//               style={styles.shopNowBtn}
//             >
//               <Text style={styles.shopNowText}>Start Shopping</Text>
//             </Pressable>
//           </View>
//         ) : (
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingRight: 16 }}
//           >
//             {orders.slice(0, 6).map((order) => {
//               const firstProduct = order.products?.[0];
//               const itemCount = order.products?.length ?? 0;
//               return (
//                 <Pressable
//                   key={order._id}
//                   onPress={() => navigation.navigate("Order")}
//                   style={({ pressed }) => [
//                     styles.orderCard,
//                     pressed && { opacity: 0.9 },
//                   ]}
//                 >
//                   <View style={styles.orderImageWrap}>
//                     {firstProduct?.image ? (
//                       <Image
//                         source={{ uri: firstProduct.image }}
//                         style={styles.orderImage}
//                         resizeMode="contain"
//                       />
//                     ) : (
//                       <Feather name="package" size={40} color="#9CA3AF" />
//                     )}
//                   </View>
//                   <Text style={styles.orderStatus}>Delivered</Text>
//                   <Text style={styles.orderMeta}>
//                     {itemCount} {itemCount === 1 ? "item" : "items"} · ₹
//                     {order.totalPrice}
//                   </Text>
//                   <Text style={styles.orderDate}>
//                     {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </Text>
//                 </Pressable>
//               );
//             })}
//           </ScrollView>
//         )}

//         {/* ─── Settings list ─── */}
//         <View style={styles.menuCard}>
//           <MenuRow
//             icon="settings"
//             label="Account Settings"
//             onPress={() => {}}
//           />
//           <View style={styles.menuDivider} />
//           <MenuRow
//             icon="shield"
//             label="Privacy & Security"
//             onPress={() => {}}
//           />
//           <View style={styles.menuDivider} />
//           <MenuRow
//             icon="help-circle"
//             label="Help & Support"
//             onPress={() => {}}
//           />
//         </View>

//         {/* ─── Logout button ─── */}
//         <Pressable
//           onPress={handleLogout}
//           disabled={loggingOut}
//           style={({ pressed }) => [
//             styles.logoutBtn,
//             (pressed || loggingOut) && { opacity: 0.7 },
//           ]}
//         >
//           {loggingOut ? (
//             <ActivityIndicator color="#DC2626" />
//           ) : (
//             <>
//               <Feather name="log-out" size={18} color="#DC2626" />
//               <Text style={styles.logoutText}>Log Out</Text>
//             </>
//           )}
//         </Pressable>

//         <Text style={styles.footerText}>Amazon Clone · v1.0.0</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // ─── Reusable: Quick action tile ───
// const ActionTile = ({ icon, label, value, onPress }) => (
//   <Pressable
//     onPress={onPress}
//     style={({ pressed }) => [
//       styles.tile,
//       pressed && { backgroundColor: "#F0FDFA" },
//     ]}
//   >
//     <View style={styles.tileIconWrap}>{icon}</View>
//     <Text style={styles.tileLabel}>{label}</Text>
//     {value !== undefined && <Text style={styles.tileValue}>{value}</Text>}
//   </Pressable>
// );

// // ─── Reusable: Menu row ───
// const MenuRow = ({ icon, label, onPress }) => (
//   <Pressable
//     onPress={onPress}
//     style={({ pressed }) => [
//       styles.menuRow,
//       pressed && { backgroundColor: "#F9FAFB" },
//     ]}
//   >
//     <Feather name={icon} size={18} color="#6B7280" />
//     <Text style={styles.menuLabel}>{label}</Text>
//     <MaterialIcons name="keyboard-arrow-right" size={22} color="#9CA3AF" />
//   </Pressable>
// );

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#F7F8FA" },

//   // Header
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     backgroundColor: "#FFFFFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#111827",
//     letterSpacing: -0.3,
//   },

//   scrollContent: { padding: 16, paddingBottom: 40 },

//   // Loading
//   centerState: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 40,
//   },
//   centerText: { marginTop: 12, color: "#6B7280", fontSize: 13 },

//   // User card
//   userCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#E0F2F1",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarText: { fontSize: 24, fontWeight: "800", color: "#008E97" },
//   greeting: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
//   userName: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#111827",
//     marginTop: 2,
//   },
//   userEmail: { fontSize: 12, color: "#6B7280", marginTop: 2 },

//   // Tiles
//   tilesRow: {
//     flexDirection: "row",
//     gap: 12,
//     marginBottom: 12,
//   },
//   tile: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 14,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     alignItems: "flex-start",
//   },
//   tileIconWrap: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#E0F2F1",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//   },
//   tileLabel: { fontSize: 13, fontWeight: "700", color: "#111827" },
//   tileValue: { fontSize: 12, color: "#6B7280", marginTop: 2 },

//   // Section header
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
//   sectionLink: { fontSize: 13, fontWeight: "700", color: "#008E97" },

//   // Order cards
//   orderCard: {
//     width: 160,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 12,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//   },
//   orderImageWrap: {
//     height: 90,
//     backgroundColor: "#FAFAFA",
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   orderImage: { width: "100%", height: "100%" },
//   orderStatus: {
//     fontSize: 11,
//     fontWeight: "800",
//     color: "#16A34A",
//     letterSpacing: 0.3,
//     textTransform: "uppercase",
//   },
//   orderMeta: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#374151",
//     marginTop: 4,
//   },
//   orderDate: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },

//   // Empty orders
//   emptyOrders: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 28,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     borderStyle: "dashed",
//     marginBottom: 16,
//   },
//   emptyIconWrap: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: "#F1F3F5",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 12,
//   },
//   emptyTitle: {
//     fontSize: 15,
//     fontWeight: "800",
//     color: "#111827",
//     marginBottom: 4,
//   },
//   emptySubtitle: {
//     fontSize: 12,
//     color: "#6B7280",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   shopNowBtn: {
//     backgroundColor: "#008E97",
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   shopNowText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },

//   // Menu
//   menuCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     marginTop: 16,
//     overflow: "hidden",
//   },
//   menuRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },
//   menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#111827" },
//   menuDivider: { height: 1, backgroundColor: "#F1F3F5", marginLeft: 46 },

//   // Logout
//   logoutBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     marginTop: 16,
//     paddingVertical: 14,
//     borderRadius: 12,
//     backgroundColor: "#FEF2F2",
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },
//   logoutText: { fontSize: 14, fontWeight: "800", color: "#DC2626" },

//   footerText: {
//     textAlign: "center",
//     fontSize: 11,
//     color: "#9CA3AF",
//     marginTop: 20,
//   },
// });

// export default ProfileScreen;

// import { Feather, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import api from "../services/axios";
// import { useAuth } from "../UserContext";

// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const { userId, signOut } = useAuth();

//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loggingOut, setLoggingOut] = useState(false);

//   const load = async (isRefresh = false) => {
//     try {
//       isRefresh ? setRefreshing(true) : setLoading(true);

//       const [profileRes, ordersRes] = await Promise.all([
//         api.get(`/profile/${userId}`),
//         api.get(`/orders/${userId}`),
//       ]);

//       setUser(profileRes.data.user);
//       setOrders(ordersRes.data.orders || []);
//     } catch (err) {
//       console.log("Profile load error:", err.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) load();
//   }, [userId]);

//   const handleLogout = () => {
//     Alert.alert("Logout", "Are you sure you want to log out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setLoggingOut(true);
//             await signOut();
//           } catch (err) {
//             Alert.alert("Error", "Could not log out. Try again.");
//           } finally {
//             setLoggingOut(false);
//           }
//         },
//       },
//     ]);
//   };

//   // ─── Loading state ───
//   if (loading && !user) {
//     return (
//       <SafeAreaView style={styles.safeArea} edges={["top"]}>
//         <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
//         <View style={styles.centerState}>
//           <ActivityIndicator size="large" color="#008E97" />
//           <Text style={styles.centerText}>Loading profile…</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top"]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => load(true)}
//             tintColor="#008E97"
//           />
//         }
//       >
//         {/* ─── Page heading ─── */}
//         <View style={styles.pageHeader}>
//           <Text style={styles.pageTitle}>Profile</Text>
//           <Pressable
//             hitSlop={10}
//             style={({ pressed }) => [
//               styles.bellBtn,
//               pressed && { backgroundColor: "#EEF0F3" },
//             ]}
//           >
//             <Feather name="bell" size={20} color="#111827" />
//           </Pressable>
//         </View>

//         {/* ─── User card ─── */}
//         <View style={styles.userCard}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>
//               {user?.name?.[0]?.toUpperCase() ?? "?"}
//             </Text>
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.greeting}>Welcome back</Text>
//             <Text style={styles.userName} numberOfLines={1}>
//               {user?.name ?? "User"}
//             </Text>
//             <Text style={styles.userEmail} numberOfLines={1}>
//               {user?.email ?? ""}
//             </Text>
//           </View>
//         </View>

//         {/* ─── Quick action tiles ─── */}
//         <View style={styles.tilesRow}>
//           <ActionTile
//             icon={<Feather name="package" size={22} color="#008E97" />}
//             label="Your Orders"
//             value={orders.length}
//             onPress={() => navigation.navigate("Order")}
//           />
//           <ActionTile
//             icon={<Feather name="map-pin" size={22} color="#008E97" />}
//             label="Addresses"
//             onPress={() => navigation.navigate("AddressList")}
//           />
//         </View>

//         <View style={styles.tilesRow}>
//           <ActionTile
//             icon={<Feather name="repeat" size={22} color="#008E97" />}
//             label="Buy Again"
//             onPress={() => navigation.navigate("Home")}
//           />
//           <ActionTile
//             icon={<Feather name="user" size={22} color="#008E97" />}
//             label="Your Account"
//           />
//         </View>

//         {/* ─── Recent orders ─── */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Recent Orders</Text>
//           {orders.length > 0 && (
//             <Pressable hitSlop={8} onPress={() => navigation.navigate("Order")}>
//               <Text style={styles.sectionLink}>See all</Text>
//             </Pressable>
//           )}
//         </View>

//         {orders.length === 0 ? (
//           <View style={styles.emptyOrders}>
//             <View style={styles.emptyIconWrap}>
//               <Feather name="shopping-bag" size={32} color="#9CA3AF" />
//             </View>
//             <Text style={styles.emptyTitle}>No orders yet</Text>
//             <Text style={styles.emptySubtitle}>
//               Your past orders will appear here
//             </Text>
//             <Pressable
//               onPress={() => navigation.navigate("Home")}
//               style={styles.shopNowBtn}
//             >
//               <Text style={styles.shopNowText}>Start Shopping</Text>
//             </Pressable>
//           </View>
//         ) : (
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingRight: 16 }}
//           >
//             {orders.slice(0, 6).map((order) => {
//               const firstProduct = order.products?.[0];
//               const itemCount = order.products?.length ?? 0;
//               return (
//                 <Pressable
//                   key={order._id}
//                   onPress={() => navigation.navigate("Order")}
//                   style={({ pressed }) => [
//                     styles.orderCard,
//                     pressed && { opacity: 0.9 },
//                   ]}
//                 >
//                   <View style={styles.orderImageWrap}>
//                     {firstProduct?.image ? (
//                       <Image
//                         source={{ uri: firstProduct.image }}
//                         style={styles.orderImage}
//                         resizeMode="contain"
//                       />
//                     ) : (
//                       <Feather name="package" size={40} color="#9CA3AF" />
//                     )}
//                   </View>
//                   <Text style={styles.orderStatus}>Delivered</Text>
//                   <Text style={styles.orderMeta}>
//                     {itemCount} {itemCount === 1 ? "item" : "items"} · ₹
//                     {order.totalPrice}
//                   </Text>
//                   <Text style={styles.orderDate}>
//                     {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </Text>
//                 </Pressable>
//               );
//             })}
//           </ScrollView>
//         )}

//         {/* ─── Settings list ─── */}
//         <View style={styles.menuCard}>
//           <MenuRow
//             icon="settings"
//             label="Account Settings"
//             onPress={() => {}}
//           />
//           <View style={styles.menuDivider} />
//           <MenuRow
//             icon="shield"
//             label="Privacy & Security"
//             onPress={() => {}}
//           />
//           <View style={styles.menuDivider} />
//           <MenuRow
//             icon="help-circle"
//             label="Help & Support"
//             onPress={() => {}}
//           />
//         </View>

//         {/* ─── Logout button ─── */}
//         <Pressable
//           onPress={handleLogout}
//           disabled={loggingOut}
//           style={({ pressed }) => [
//             styles.logoutBtn,
//             (pressed || loggingOut) && { opacity: 0.7 },
//           ]}
//         >
//           {loggingOut ? (
//             <ActivityIndicator color="#DC2626" />
//           ) : (
//             <>
//               <Feather name="log-out" size={18} color="#DC2626" />
//               <Text style={styles.logoutText}>Log Out</Text>
//             </>
//           )}
//         </Pressable>

//         <Text style={styles.footerText}>Amazon· v1.0.0</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // ─── Reusable: Quick action tile ───
// const ActionTile = ({ icon, label, value, onPress }) => (
//   <Pressable
//     onPress={onPress}
//     style={({ pressed }) => [
//       styles.tile,
//       pressed && { backgroundColor: "#F0FDFA" },
//     ]}
//   >
//     <View style={styles.tileIconWrap}>{icon}</View>
//     <Text style={styles.tileLabel}>{label}</Text>
//     {value !== undefined && <Text style={styles.tileValue}>{value}</Text>}
//   </Pressable>
// );

// // ─── Reusable: Menu row ───
// const MenuRow = ({ icon, label, onPress }) => (
//   <Pressable
//     onPress={onPress}
//     style={({ pressed }) => [
//       styles.menuRow,
//       pressed && { backgroundColor: "#F9FAFB" },
//     ]}
//   >
//     <Feather name={icon} size={18} color="#6B7280" />
//     <Text style={styles.menuLabel}>{label}</Text>
//     <MaterialIcons name="keyboard-arrow-right" size={22} color="#9CA3AF" />
//   </Pressable>
// );

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#F7F8FA" },

//   scrollContent: { padding: 16, paddingBottom: 40 },

//   // Loading
//   centerState: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 40,
//   },
//   centerText: { marginTop: 12, color: "#6B7280", fontSize: 13 },

//   // ─── Page header (in-scroll, not fixed) ───
//   pageHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   pageTitle: {
//     fontSize: 26,
//     fontWeight: "800",
//     color: "#111827",
//     letterSpacing: -0.5,
//   },
//   bellBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//   },

//   // User card
//   userCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#E0F2F1",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarText: { fontSize: 24, fontWeight: "800", color: "#008E97" },
//   greeting: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
//   userName: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#111827",
//     marginTop: 2,
//   },
//   userEmail: { fontSize: 12, color: "#6B7280", marginTop: 2 },

//   // Tiles
//   tilesRow: {
//     flexDirection: "row",
//     gap: 12,
//     marginBottom: 12,
//   },
//   tile: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 14,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     alignItems: "flex-start",
//   },
//   tileIconWrap: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#E0F2F1",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//   },
//   tileLabel: { fontSize: 13, fontWeight: "700", color: "#111827" },
//   tileValue: { fontSize: 12, color: "#6B7280", marginTop: 2 },

//   // Section header
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
//   sectionLink: { fontSize: 13, fontWeight: "700", color: "#008E97" },

//   // Order cards
//   orderCard: {
//     width: 160,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 12,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//   },
//   orderImageWrap: {
//     height: 90,
//     backgroundColor: "#FAFAFA",
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   orderImage: { width: "100%", height: "100%" },
//   orderStatus: {
//     fontSize: 11,
//     fontWeight: "800",
//     color: "#16A34A",
//     letterSpacing: 0.3,
//     textTransform: "uppercase",
//   },
//   orderMeta: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#374151",
//     marginTop: 4,
//   },
//   orderDate: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },

//   // Empty orders
//   emptyOrders: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 28,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     borderStyle: "dashed",
//     marginBottom: 16,
//   },
//   emptyIconWrap: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: "#F1F3F5",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 12,
//   },
//   emptyTitle: {
//     fontSize: 15,
//     fontWeight: "800",
//     color: "#111827",
//     marginBottom: 4,
//   },
//   emptySubtitle: {
//     fontSize: 12,
//     color: "#6B7280",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   shopNowBtn: {
//     backgroundColor: "#008E97",
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   shopNowText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },

//   // Menu
//   menuCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     marginTop: 16,
//     overflow: "hidden",
//   },
//   menuRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },
//   menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#111827" },
//   menuDivider: { height: 1, backgroundColor: "#F1F3F5", marginLeft: 46 },

//   // Logout
//   logoutBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     marginTop: 16,
//     paddingVertical: 14,
//     borderRadius: 12,
//     backgroundColor: "#FEF2F2",
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },
//   logoutText: { fontSize: 14, fontWeight: "800", color: "#DC2626" },

//   footerText: {
//     textAlign: "center",
//     fontSize: 11,
//     color: "#9CA3AF",
//     marginTop: 20,
//   },
// });

// export default ProfileScreen;

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/axios";
import { useAuth } from "../UserContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userId, signOut } = useAuth();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const load = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const [profileRes, ordersRes] = await Promise.all([
        api.get(`/profile/${userId}`),
        api.get(`/orders/${userId}`),
      ]);

      setUser(profileRes.data.user);
      setOrders(ordersRes.data.orders || []);
    } catch (err) {
      console.log("Profile load error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (userId) load();
  }, [userId]);

  const performLogout = async () => {
    try {
      setConfirmVisible(false);
      setLoggingOut(true);
      await signOut();
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  // ─── Loading state ───
  if (loading && !user) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#008E97" />
          <Text style={styles.centerText}>Loading profile…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(true)}
              tintColor="#008E97"
            />
          }
        >
          {/* ─── Page heading ─── */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Profile</Text>
            <Pressable
              hitSlop={10}
              style={({ pressed }) => [
                styles.bellBtn,
                pressed && { backgroundColor: "#EEF0F3" },
              ]}
            >
              <Feather name="bell" size={20} color="#111827" />
            </Pressable>
          </View>

          {/* ─── User card ─── */}
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.[0]?.toUpperCase() ?? "?"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Welcome back</Text>
              <Text style={styles.userName} numberOfLines={1}>
                {user?.name ?? "User"}
              </Text>
              <Text style={styles.userEmail} numberOfLines={1}>
                {user?.email ?? ""}
              </Text>
            </View>
          </View>

          {/* ─── Quick action tiles ─── */}
          <View style={styles.tilesRow}>
            <ActionTile
              icon={<Feather name="package" size={22} color="#008E97" />}
              label="Your Orders"
              value={orders.length}
              onPress={() => navigation.navigate("Order")}
            />
            <ActionTile
              icon={<Feather name="map-pin" size={22} color="#008E97" />}
              label="Addresses"
              onPress={() => navigation.navigate("AddressList")}
            />
          </View>

          <View style={styles.tilesRow}>
            <ActionTile
              icon={<Feather name="repeat" size={22} color="#008E97" />}
              label="Buy Again"
              onPress={() => navigation.navigate("Home")}
            />
            <ActionTile
              icon={<Feather name="user" size={22} color="#008E97" />}
              label="Your Account"
            />
          </View>

          {/* ─── Recent orders ─── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            {orders.length > 0 && (
              <Pressable
                hitSlop={8}
                onPress={() => navigation.navigate("Order")}
              >
                <Text style={styles.sectionLink}>See all</Text>
              </Pressable>
            )}
          </View>

          {orders.length === 0 ? (
            <View style={styles.emptyOrders}>
              <View style={styles.emptyIconWrap}>
                <Feather name="shopping-bag" size={32} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptySubtitle}>
                Your past orders will appear here
              </Text>
              <Pressable
                onPress={() => navigation.navigate("Home")}
                style={styles.shopNowBtn}
              >
                <Text style={styles.shopNowText}>Start Shopping</Text>
              </Pressable>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              {orders.slice(0, 6).map((order) => {
                const firstProduct = order.products?.[0];
                const itemCount = order.products?.length ?? 0;
                return (
                  <Pressable
                    key={order._id}
                    onPress={() => navigation.navigate("Order")}
                    style={({ pressed }) => [
                      styles.orderCard,
                      pressed && { opacity: 0.9 },
                    ]}
                  >
                    <View style={styles.orderImageWrap}>
                      {firstProduct?.image ? (
                        <Image
                          source={{ uri: firstProduct.image }}
                          style={styles.orderImage}
                          resizeMode="contain"
                        />
                      ) : (
                        <Feather name="package" size={40} color="#9CA3AF" />
                      )}
                    </View>
                    <Text style={styles.orderStatus}>Delivered</Text>
                    <Text style={styles.orderMeta}>
                      {itemCount} {itemCount === 1 ? "item" : "items"} · ₹
                      {order.totalPrice}
                    </Text>
                    <Text style={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          )}

          {/* ─── Settings list ─── */}
          <View style={styles.menuCard}>
            <MenuRow
              icon="settings"
              label="Account Settings"
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuRow
              icon="shield"
              label="Privacy & Security"
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuRow
              icon="help-circle"
              label="Help & Support"
              onPress={() => {}}
            />
          </View>

          {/* ─── Logout button ─── */}
          <Pressable
            onPress={() => setConfirmVisible(true)}
            disabled={loggingOut}
            style={({ pressed }) => [
              styles.logoutBtn,
              (pressed || loggingOut) && { opacity: 0.7 },
            ]}
          >
            {loggingOut ? (
              <ActivityIndicator color="#DC2626" />
            ) : (
              <>
                <Feather name="log-out" size={18} color="#DC2626" />
                <Text style={styles.logoutText}>Log Out</Text>
              </>
            )}
          </Pressable>

          <Text style={styles.footerText}>Amazon · v1.0.0</Text>
        </ScrollView>
      </SafeAreaView>

      {/* ─── Logout confirmation modal ─── */}
      <Modal
        isVisible={confirmVisible}
        onBackdropPress={() => setConfirmVisible(false)}
        onBackButtonPress={() => setConfirmVisible(false)}
        onSwipeComplete={() => setConfirmVisible(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.modalBody}>
          <View style={styles.modalIconWrap}>
            <Feather name="log-out" size={26} color="#DC2626" />
          </View>

          <Text style={styles.modalTitle}>Log out?</Text>
          <Text style={styles.modalSubtitle}>
            You'll need to sign in again to access your cart, orders, and
            addresses.
          </Text>

          <Pressable
            onPress={performLogout}
            style={({ pressed }) => [
              styles.modalConfirmBtn,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.modalConfirmText}>Log Out</Text>
          </Pressable>

          <Pressable
            onPress={() => setConfirmVisible(false)}
            style={({ pressed }) => [
              styles.modalCancelBtn,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

// ─── Reusable: Quick action tile ───
const ActionTile = ({ icon, label, value, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.tile,
      pressed && { backgroundColor: "#F0FDFA" },
    ]}
  >
    <View style={styles.tileIconWrap}>{icon}</View>
    <Text style={styles.tileLabel}>{label}</Text>
    {value !== undefined && <Text style={styles.tileValue}>{value}</Text>}
  </Pressable>
);

// ─── Reusable: Menu row ───
const MenuRow = ({ icon, label, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.menuRow,
      pressed && { backgroundColor: "#F9FAFB" },
    ]}
  >
    <Feather name={icon} size={18} color="#6B7280" />
    <Text style={styles.menuLabel}>{label}</Text>
    <MaterialIcons name="keyboard-arrow-right" size={22} color="#9CA3AF" />
  </Pressable>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F8FA" },
  scrollContent: { padding: 16, paddingBottom: 40 },

  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  centerText: { marginTop: 12, color: "#6B7280", fontSize: 13 },

  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEF0F3",
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 24, fontWeight: "800", color: "#008E97" },
  greeting: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginTop: 2,
  },
  userEmail: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  tilesRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  tile: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    alignItems: "flex-start",
  },
  tileIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  tileLabel: { fontSize: 13, fontWeight: "700", color: "#111827" },
  tileValue: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
  sectionLink: { fontSize: 13, fontWeight: "700", color: "#008E97" },

  orderCard: {
    width: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#EEF0F3",
  },
  orderImageWrap: {
    height: 90,
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  orderImage: { width: "100%", height: "100%" },
  orderStatus: {
    fontSize: 11,
    fontWeight: "800",
    color: "#16A34A",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  orderMeta: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginTop: 4,
  },
  orderDate: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },

  emptyOrders: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF0F3",
    borderStyle: "dashed",
    marginBottom: 16,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F1F3F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 16,
  },
  shopNowBtn: {
    backgroundColor: "#008E97",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  shopNowText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    marginTop: 16,
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#111827" },
  menuDivider: { height: 1, backgroundColor: "#F1F3F5", marginLeft: 46 },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: { fontSize: 14, fontWeight: "800", color: "#DC2626" },

  footerText: {
    textAlign: "center",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 20,
  },

  // ─── Logout Modal ───
  modalBody: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 480, // ← NEW
    alignSelf: "center", // ← NEW
    marginHorizontal: "auto", // ← NEW
  },
  modalIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  modalConfirmBtn: {
    width: "100%",
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  modalConfirmText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  modalCancelBtn: {
    width: "100%",
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
});

export default ProfileScreen;
