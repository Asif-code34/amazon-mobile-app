// // import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import LottieView from "lottie-react-native";
// import { useEffect, useRef, useState } from "react";
// import {
//   Pressable,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useAuth } from "../UserContext";

// const OrderScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { userId } = useAuth();

//   // Order data can come via route params (from ConfirmationScreen)
//   // OR we can show a generic success without it.
//   const orderFromParams = route.params?.order;

//   // Countdown before auto-redirect
//   const [seconds, setSeconds] = useState(5);
//   const timerRef = useRef(null);

//   useEffect(() => {
//     timerRef.current = setInterval(() => {
//       setSeconds((s) => {
//         if (s <= 1) {
//           clearInterval(timerRef.current);
//           navigation.replace("Main");
//           return 0;
//         }
//         return s - 1;
//       });
//     }, 1000);

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [navigation]);

//   const goHome = () => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     navigation.replace("Main");
//   };

//   const goToOrders = () => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     navigation.replace("Main");
//     // If you later add a dedicated Orders tab, navigate there instead
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Success animation */}
//       <View style={styles.heroWrap}>
//         <LottieView
//           source={require("../assets/thumbs.json")}
//           style={styles.thumbsAnimation}
//           autoPlay
//           loop={false}
//           speed={0.8}
//         />
//         <LottieView
//           source={require("../assets/sparkle.json")}
//           style={styles.sparkleAnimation}
//           autoPlay
//           loop={false}
//           speed={0.7}
//           pointerEvents="none"
//         />
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Headline */}
//         <Text style={styles.title}>Your order is confirmed!</Text>
//         <Text style={styles.subtitle}>
//           Thank you for shopping with us. We've sent a confirmation to your
//           email.
//         </Text>

//         {/* Order id badge */}
//         {orderFromParams?._id && (
//           <View style={styles.orderIdPill}>
//             <Feather name="hash" size={12} color="#008E97" />
//             <Text style={styles.orderIdText}>
//               {String(orderFromParams._id).slice(-8).toUpperCase()}
//             </Text>
//           </View>
//         )}

//         {/* Info cards */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoRow}>
//             <View style={styles.infoIconWrap}>
//               <MaterialIcons name="local-shipping" size={20} color="#008E97" />
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.infoTitle}>Estimated delivery</Text>
//               <Text style={styles.infoSubtitle}>Tomorrow by 10 PM</Text>
//             </View>
//           </View>

//           <View style={styles.infoDivider} />

//           <View style={styles.infoRow}>
//             <View style={styles.infoIconWrap}>
//               <MaterialIcons name="payments" size={20} color="#008E97" />
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.infoTitle}>Payment method</Text>
//               <Text style={styles.infoSubtitle}>
//                 {orderFromParams?.paymentMethod ?? "Cash on Delivery"}
//               </Text>
//             </View>
//           </View>

//           {orderFromParams?.totalPrice !== undefined && (
//             <>
//               <View style={styles.infoDivider} />
//               <View style={styles.infoRow}>
//                 <View style={styles.infoIconWrap}>
//                   <MaterialIcons
//                     name="receipt-long"
//                     size={20}
//                     color="#008E97"
//                   />
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.infoTitle}>Order total</Text>
//                   <Text style={styles.infoTotal}>
//                     ₹{orderFromParams.totalPrice}
//                   </Text>
//                 </View>
//               </View>
//             </>
//           )}
//         </View>

//         {/* CTAs */}
//         <Pressable
//           onPress={goToOrders}
//           style={({ pressed }) => [
//             styles.primaryBtn,
//             pressed && styles.primaryBtnPressed,
//           ]}
//         >
//           <Feather name="package" size={18} color="#111827" />
//           <Text style={styles.primaryBtnText}>View My Orders</Text>
//         </Pressable>

//         <Pressable
//           onPress={goHome}
//           style={({ pressed }) => [
//             styles.secondaryBtn,
//             pressed && { opacity: 0.7 },
//           ]}
//         >
//           <Feather name="home" size={18} color="#008E97" />
//           <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
//         </Pressable>

//         {/* Auto-redirect notice */}
//         <View style={styles.redirectNotice}>
//           <Ionicons name="time-outline" size={14} color="#6B7280" />
//           <Text style={styles.redirectText}>
//             Redirecting to home in {seconds}s…
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#FFFFFF" },

//   heroWrap: {
//     height: 240,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   thumbsAnimation: {
//     height: 220,
//     width: 260,
//   },
//   sparkleAnimation: {
//     height: 260,
//     width: 260,
//     position: "absolute",
//     top: -10,
//   },

//   scrollContent: {
//     paddingHorizontal: 24,
//     paddingBottom: 40,
//     alignItems: "stretch",
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "800",
//     color: "#111827",
//     textAlign: "center",
//     letterSpacing: -0.4,
//     marginTop: 8,
//   },
//   subtitle: {
//     fontSize: 13,
//     color: "#6B7280",
//     textAlign: "center",
//     marginTop: 8,
//     lineHeight: 19,
//     paddingHorizontal: 12,
//   },

//   orderIdPill: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     alignSelf: "center",
//     backgroundColor: "#E0F2F1",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 12,
//     marginTop: 16,
//   },
//   orderIdText: {
//     fontSize: 11,
//     fontWeight: "800",
//     color: "#008E97",
//     letterSpacing: 1,
//   },

//   infoCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     padding: 14,
//     marginTop: 24,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//     elevation: 1,
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingVertical: 8,
//   },
//   infoIconWrap: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#E0F2F1",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   infoTitle: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
//   infoSubtitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#111827",
//     marginTop: 2,
//   },
//   infoTotal: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#C60C30",
//     marginTop: 2,
//   },
//   infoDivider: {
//     height: 1,
//     backgroundColor: "#F1F3F5",
//     marginVertical: 4,
//   },

//   primaryBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     backgroundColor: "#FFD814",
//     height: 54,
//     borderRadius: 12,
//     marginTop: 24,
//     shadowColor: "#FFD814",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   primaryBtnPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
//   primaryBtnText: { fontSize: 15, fontWeight: "800", color: "#111827" },

//   secondaryBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     height: 54,
//     borderRadius: 12,
//     marginTop: 10,
//     borderWidth: 1.5,
//     borderColor: "#008E97",
//     backgroundColor: "#FFFFFF",
//   },
//   secondaryBtnText: { fontSize: 15, fontWeight: "800", color: "#008E97" },

//   redirectNotice: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 6,
//     marginTop: 20,
//   },
//   redirectText: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
// });

// export default OrderScreen;

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/axios";
import { useAuth } from "../UserContext";

const OrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = useAuth();

  const justPlacedOrder = route.params?.order; // set when coming from ConfirmationScreen
  const isSuccessMode = !!justPlacedOrder;

  // ─── Success mode state ───
  const [seconds, setSeconds] = useState(5);
  const timerRef = useRef(null);

  // ─── History mode state ───
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(!isSuccessMode);
  const [refreshing, setRefreshing] = useState(false);

  // ══════════════════════════════════════════════
  // SUCCESS MODE: 5s countdown → Home
  // ══════════════════════════════════════════════
  useEffect(() => {
    if (!isSuccessMode) return;

    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          navigation.replace("Main");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSuccessMode, navigation]);

  // ══════════════════════════════════════════════
  // HISTORY MODE: fetch orders
  // ══════════════════════════════════════════════
  const fetchOrders = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const response = await api.get(`/orders/${userId}`);
      setOrders(response.data.orders || []);
    } catch (err) {
      console.log("Orders fetch error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isSuccessMode && userId) fetchOrders();
  }, [isSuccessMode, userId]);

  const goHome = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigation.replace("Main");
  };

  // ══════════════════════════════════════════════
  // SUCCESS MODE UI
  // ══════════════════════════════════════════════
  if (isSuccessMode) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        <View style={styles.heroWrap}>
          <LottieView
            source={require("../assets/thumbs.json")}
            style={styles.thumbsAnimation}
            autoPlay
            loop={false}
            speed={0.8}
          />
          <LottieView
            source={require("../assets/sparkle.json")}
            style={styles.sparkleAnimation}
            autoPlay
            loop={false}
            speed={0.7}
            pointerEvents="none"
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Your order is confirmed!</Text>
          <Text style={styles.subtitle}>
            Thank you for shopping with us. We've sent a confirmation to your
            email.
          </Text>

          {justPlacedOrder?._id && (
            <View style={styles.orderIdPill}>
              <Feather name="hash" size={12} color="#008E97" />
              <Text style={styles.orderIdText}>
                {String(justPlacedOrder._id).slice(-8).toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.infoCard}>
            <InfoRow
              icon={
                <MaterialIcons
                  name="local-shipping"
                  size={20}
                  color="#008E97"
                />
              }
              title="Estimated delivery"
              subtitle="Tomorrow by 10 PM"
            />
            <View style={styles.infoDivider} />
            <InfoRow
              icon={<MaterialIcons name="payments" size={20} color="#008E97" />}
              title="Payment method"
              subtitle={justPlacedOrder?.paymentMethod ?? "Cash on Delivery"}
            />
            {justPlacedOrder?.totalPrice !== undefined && (
              <>
                <View style={styles.infoDivider} />
                <InfoRow
                  icon={
                    <MaterialIcons
                      name="receipt-long"
                      size={20}
                      color="#008E97"
                    />
                  }
                  title="Order total"
                  subtitle={`₹${justPlacedOrder.totalPrice}`}
                  highlight
                />
              </>
            )}
          </View>

          <Pressable
            onPress={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              navigation.replace("Order"); // go to history mode
            }}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.primaryBtnPressed,
            ]}
          >
            <Feather name="package" size={18} color="#111827" />
            <Text style={styles.primaryBtnText}>View My Orders</Text>
          </Pressable>

          <Pressable
            onPress={goHome}
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Feather name="home" size={18} color="#008E97" />
            <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
          </Pressable>

          <Text style={styles.redirectText}>
            Redirecting to home in {seconds}s…
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ══════════════════════════════════════════════
  // HISTORY MODE UI
  // ══════════════════════════════════════════════
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <MaterialIcons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#008E97" />
          <Text style={styles.centerText}>Loading orders…</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.historyContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchOrders(true)}
              tintColor="#008E97"
            />
          }
        >
          {orders.length === 0 ? (
            <View style={styles.emptyOrders}>
              <View style={styles.emptyIconWrap}>
                <Feather name="shopping-bag" size={36} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptySubtitle}>
                Your past orders will appear here once you place one.
              </Text>
              <Pressable
                onPress={() => navigation.replace("Main")}
                style={styles.shopNowBtn}
              >
                <Text style={styles.shopNowText}>Start Shopping</Text>
              </Pressable>
            </View>
          ) : (
            orders.map((order) => (
              <OrderHistoryCard key={order._id} order={order} />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// ─── Success mode: info row ───
const InfoRow = ({ icon, title, subtitle, highlight }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconWrap}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={highlight ? styles.infoTotal : styles.infoSubtitle}>
        {subtitle}
      </Text>
    </View>
  </View>
);

// ─── History mode: order card ───
const OrderHistoryCard = ({ order }) => {
  const itemCount = order.products?.length ?? 0;
  const firstProduct = order.products?.[0];

  return (
    <View style={styles.historyCard}>
      {/* Header */}
      <View style={styles.historyCardHeader}>
        <View style={styles.historyIdWrap}>
          <Feather name="hash" size={11} color="#008E97" />
          <Text style={styles.historyId}>
            {String(order._id).slice(-8).toUpperCase()}
          </Text>
        </View>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Delivered</Text>
        </View>
      </View>

      {/* Product preview */}
      <View style={styles.historyProductRow}>
        <View style={styles.historyImageWrap}>
          {firstProduct?.image ? (
            <Image
              source={{ uri: firstProduct.image }}
              style={styles.historyImage}
              resizeMode="contain"
            />
          ) : (
            <Feather name="package" size={28} color="#9CA3AF" />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2} style={styles.historyProductName}>
            {firstProduct?.name ?? "Order item"}
          </Text>
          <Text style={styles.historyMeta}>
            {itemCount} {itemCount === 1 ? "item" : "items"} in this order
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.historyDivider} />

      {/* Footer */}
      <View style={styles.historyFooter}>
        <View>
          <Text style={styles.historyDateLabel}>Ordered on</Text>
          <Text style={styles.historyDate}>
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.historyDateLabel}>Total</Text>
          <Text style={styles.historyTotal}>₹{order.totalPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },

  // ─── Success mode ───
  heroWrap: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  thumbsAnimation: { height: 220, width: 260 },
  sparkleAnimation: {
    height: 260,
    width: 260,
    position: "absolute",
    top: -10,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    letterSpacing: -0.4,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 19,
    paddingHorizontal: 12,
  },
  orderIdPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "center",
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 16,
  },
  orderIdText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#008E97",
    letterSpacing: 1,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    padding: 14,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  infoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  infoSubtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
  },
  infoTotal: {
    fontSize: 18,
    fontWeight: "800",
    color: "#C60C30",
    marginTop: 2,
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#F1F3F5",
    marginVertical: 4,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFD814",
    height: 54,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: "#FFD814",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  primaryBtnText: { fontSize: 15, fontWeight: "800", color: "#111827" },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 54,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: "#008E97",
    backgroundColor: "#FFFFFF",
  },
  secondaryBtnText: { fontSize: 15, fontWeight: "800", color: "#008E97" },
  redirectText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },

  // ─── History mode ───
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 17, fontWeight: "800", color: "#111827" },

  historyContent: { padding: 16, paddingBottom: 40 },

  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  centerText: { marginTop: 12, color: "#6B7280", fontSize: 13 },

  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  historyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historyIdWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  historyId: {
    fontSize: 10,
    fontWeight: "800",
    color: "#008E97",
    letterSpacing: 0.8,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#166534",
    letterSpacing: 0.4,
  },

  historyProductRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  historyImageWrap: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  historyImage: { width: "100%", height: "100%" },
  historyProductName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 18,
  },
  historyMeta: { fontSize: 11, color: "#6B7280", marginTop: 4 },

  historyDivider: {
    height: 1,
    backgroundColor: "#F1F3F5",
    marginVertical: 10,
  },

  historyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  historyDateLabel: { fontSize: 10, color: "#9CA3AF", fontWeight: "600" },
  historyDate: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
    marginTop: 2,
  },
  historyTotal: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginTop: 2,
  },

  emptyOrders: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF0F3",
    borderStyle: "dashed",
    marginTop: 40,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F1F3F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
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
});

export default OrderScreen;
