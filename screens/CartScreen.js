// import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import {
//   Alert,
//   FlatList,
//   Image,
//   Platform,
//   Pressable,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   decrementQuantity,
//   incrementQuantity,
//   removeFromCart,
// } from "../redux/cartReducer";

// const CartScreen = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cart);

//   const total = cart
//     .map((i) => i.price * i.quantity)
//     .reduce((a, b) => a + b, 0);

//   const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

//   const handleIncrease = (item) => dispatch(incrementQuantity(item));
//   const handleDecrease = (item) => dispatch(decrementQuantity(item));

//   const handleRemove = (item) => {
//     Alert.alert(
//       "Remove item",
//       `Remove "${item.title?.slice(0, 40)}..." from cart?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Remove",
//           style: "destructive",
//           onPress: () => dispatch(removeFromCart(item)),
//         },
//       ],
//     );
//   };

//   // ─── Empty State ───
//   if (cart.length === 0) {
//     return (
//       <SafeAreaView style={styles.safeArea} edges={["top"]}>
//         <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//         {/* <View style={styles.header}>
//           <Text style={styles.headerTitle}>Your Cart</Text>
//         </View> */}

//         <View style={styles.emptyContainer}>
//           <View style={styles.emptyIconWrap}>
//             <AntDesign name="shopping-cart" size={56} color="#9CA3AF" />
//           </View>
//           <Text style={styles.emptyTitle}>Your cart is empty</Text>
//           <Text style={styles.emptySubtitle}>
//             Browse products and add your favorites to cart
//           </Text>
//           <Pressable
//             onPress={() => navigation.navigate("Home")}
//             style={({ pressed }) => [
//               styles.shopButton,
//               pressed && { opacity: 0.85 },
//             ]}
//           >
//             <MaterialIcons name="storefront" size={18} color="#FFFFFF" />
//             <Text style={styles.shopButtonText}>Start Shopping</Text>
//           </Pressable>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // ─── Cart List ───
//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top"]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Header */}
//       {/* <View style={styles.header}>
//         <Text style={styles.headerTitle}>Your Cart</Text>
//         <View style={styles.headerBadge}>
//           <Text style={styles.headerBadgeText}>
//             {totalItems} {totalItems === 1 ? "item" : "items"}
//           </Text>
//         </View>
//       </View> */}

//       <FlatList
//         data={cart}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         ListFooterComponent={
//           <View style={styles.deliveryNote}>
//             <MaterialIcons name="local-shipping" size={18} color="#008E97" />
//             <Text style={styles.deliveryText}>
//               Free delivery on this order · EMI available
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <View style={styles.cardBody}>
//               {/* Image */}
//               <Pressable
//                 onPress={() => navigation.navigate("Info", { item })}
//                 style={styles.imageWrap}
//               >
//                 <Image
//                   source={{ uri: item.image }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />
//               </Pressable>

//               {/* Details */}
//               <View style={styles.details}>
//                 <Pressable
//                   onPress={() => navigation.navigate("Info", { item })}
//                 >
//                   <Text numberOfLines={2} style={styles.title}>
//                     {item.title}
//                   </Text>
//                 </Pressable>

//                 <View style={styles.priceRow}>
//                   <Text style={styles.price}>₹{item.price}</Text>
//                   <View style={styles.stockPill}>
//                     <View style={styles.stockDot} />
//                     <Text style={styles.stockText}>In Stock</Text>
//                   </View>
//                 </View>

//                 <Text style={styles.ratingsText}>
//                   {item?.rating?.rate ?? "—"} ★ ({item?.rating?.count ?? 0})
//                 </Text>

//                 {/* Quantity Row */}
//                 <View style={styles.quantityRow}>
//                   <View style={styles.qtyBox}>
//                     <Pressable
//                       onPress={() => handleDecrease(item)}
//                       style={({ pressed }) => [
//                         styles.qtyBtn,
//                         pressed && styles.qtyBtnPressed,
//                       ]}
//                       hitSlop={6}
//                     >
//                       {item.quantity === 1 ? (
//                         <Feather name="trash-2" size={16} color="#111827" />
//                       ) : (
//                         <AntDesign name="minus" size={16} color="#111827" />
//                       )}
//                     </Pressable>
//                     <View style={styles.qtyValue}>
//                       <Text style={styles.qtyValueText}>{item.quantity}</Text>
//                     </View>
//                     <Pressable
//                       onPress={() => handleIncrease(item)}
//                       style={({ pressed }) => [
//                         styles.qtyBtn,
//                         pressed && styles.qtyBtnPressed,
//                       ]}
//                       hitSlop={6}
//                     >
//                       <Feather name="plus" size={16} color="#111827" />
//                     </Pressable>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Actions Row */}
//             <View style={styles.actionsRow}>
//               <Pressable
//                 onPress={() => handleRemove(item)}
//                 style={styles.actionButton}
//               >
//                 <Feather name="trash-2" size={14} color="#374151" />
//                 <Text style={styles.actionText}>Delete</Text>
//               </Pressable>

//               <Pressable style={styles.actionButton}>
//                 <Feather name="bookmark" size={14} color="#374151" />
//                 <Text style={styles.actionText}>Save for later</Text>
//               </Pressable>

//               <Pressable style={styles.actionButton}>
//                 <Feather name="eye" size={14} color="#374151" />
//                 <Text style={styles.actionText}>Similar</Text>
//               </Pressable>
//             </View>
//           </View>
//         )}
//       />

//       {/* ─── Sticky Checkout Bar ─── */}
//       <View style={styles.checkoutBar}>
//         <View>
//           <Text style={styles.checkoutLabel}>Subtotal</Text>
//           <Text style={styles.checkoutTotal}>
//             ₹{total.toLocaleString("en-IN")}
//           </Text>
//         </View>
//         <Pressable
//           onPress={() => navigation.navigate("Confirm")}
//           style={({ pressed }) => [
//             styles.checkoutButton,
//             pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
//           ]}
//         >
//           <Text style={styles.checkoutButtonText}>Proceed to Buy</Text>
//           <MaterialIcons name="arrow-forward" size={18} color="#111827" />
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#F7F8FA" },

//   // ─── Header ───
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
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
//   headerBadge: {
//     backgroundColor: "#E0F2F1",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   headerBadgeText: { fontSize: 12, fontWeight: "700", color: "#008E97" },

//   // ─── Empty State ───
//   emptyContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 40,
//   },
//   emptyIconWrap: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#F1F3F5",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   emptyTitle: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#111827",
//     marginBottom: 6,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     color: "#6B7280",
//     textAlign: "center",
//     lineHeight: 20,
//     marginBottom: 24,
//   },
//   shopButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     backgroundColor: "#008E97",
//     paddingHorizontal: 22,
//     paddingVertical: 13,
//     borderRadius: 10,
//     shadowColor: "#008E97",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.25,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   shopButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },

//   // ─── List ───
//   listContent: { padding: 12, paddingBottom: 100 },

//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#EEF0F3",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   cardBody: { flexDirection: "row", gap: 12 },

//   imageWrap: {
//     width: 110,
//     height: 110,
//     borderRadius: 10,
//     backgroundColor: "#FAFAFA",
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//   },
//   image: { width: "100%", height: "100%" },

//   details: { flex: 1, justifyContent: "space-between" },
//   title: { fontSize: 13, fontWeight: "600", color: "#111827", lineHeight: 18 },

//   priceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 4,
//   },
//   price: { fontSize: 18, fontWeight: "800", color: "#111827" },

//   stockPill: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     backgroundColor: "#ECFDF5",
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 6,
//   },
//   stockDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#16A34A",
//   },
//   stockText: { fontSize: 11, fontWeight: "700", color: "#166534" },

//   ratingsText: { fontSize: 11, color: "#6B7280", marginTop: 4 },

//   quantityRow: { flexDirection: "row", marginTop: 8 },
//   qtyBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   qtyBtn: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     backgroundColor: "#F8FAFC",
//   },
//   qtyBtnPressed: { backgroundColor: "#E2E8F0" },
//   qtyValue: {
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     backgroundColor: "#FFFFFF",
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: "#E5E7EB",
//   },
//   qtyValueText: { fontSize: 14, fontWeight: "700", color: "#111827" },

//   // ─── Actions row ───
//   actionsRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//     marginTop: 12,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#F1F3F5",
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 7,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     backgroundColor: "#FFFFFF",
//   },
//   actionText: { fontSize: 12, fontWeight: "600", color: "#374151" },

//   // ─── Delivery note ───
//   deliveryNote: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     backgroundColor: "#E0F2F1",
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 4,
//   },
//   deliveryText: { fontSize: 12, fontWeight: "600", color: "#00695C" },

//   // ─── Sticky checkout ───
//   checkoutBar: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     paddingBottom: Platform.OS === "ios" ? 26 : 12,
//     backgroundColor: "#FFFFFF",
//     borderTopWidth: 1,
//     borderTopColor: "#E5E7EB",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     elevation: 8,
//   },
//   checkoutLabel: { fontSize: 12, color: "#6B7280", fontWeight: "500" },
//   checkoutTotal: {
//     fontSize: 22,
//     fontWeight: "800",
//     color: "#111827",
//     letterSpacing: -0.5,
//   },
//   checkoutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     backgroundColor: "#FFD814",
//     paddingHorizontal: 22,
//     paddingVertical: 12,
//     borderRadius: 10,
//     shadowColor: "#FFD814",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   checkoutButtonText: {
//     fontSize: 15,
//     fontWeight: "800",
//     color: "#111827",
//   },
// });

// export default CartScreen;

import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartReducer";

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    .map((i) => i.price * i.quantity)
    .reduce((a, b) => a + b, 0);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const handleIncrease = (item) => dispatch(incrementQuantity(item));
  const handleDecrease = (item) => dispatch(decrementQuantity(item));

  const handleRemove = (item) => {
    Alert.alert(
      "Remove item",
      `Remove "${item.title?.slice(0, 40)}..." from cart?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => dispatch(removeFromCart(item)),
        },
      ],
    );
  };

  // ─── Empty State ───
  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrap}>
            <AntDesign name="shopping-cart" size={56} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Browse products and add your favorites to cart
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={({ pressed }) => [
              styles.shopButton,
              pressed && { opacity: 0.85 },
            ]}
          >
            <MaterialIcons name="storefront" size={18} color="#FFFFFF" />
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Cart List ───
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>Your Cart</Text>
            <Text style={styles.listHeaderSubtitle}>
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.deliveryNote}>
            <MaterialIcons name="local-shipping" size={18} color="#008E97" />
            <Text style={styles.deliveryText}>
              Free delivery on this order · EMI available
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardBody}>
              {/* Image */}
              <Pressable
                onPress={() => navigation.navigate("Info", { item })}
                style={styles.imageWrap}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </Pressable>

              {/* Details */}
              <View style={styles.details}>
                <Pressable
                  onPress={() => navigation.navigate("Info", { item })}
                >
                  <Text numberOfLines={2} style={styles.title}>
                    {item.title}
                  </Text>
                </Pressable>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{item.price}</Text>
                  <View style={styles.stockPill}>
                    <View style={styles.stockDot} />
                    <Text style={styles.stockText}>In Stock</Text>
                  </View>
                </View>

                <Text style={styles.ratingsText}>
                  {item?.rating?.rate ?? "—"} ★ ({item?.rating?.count ?? 0})
                </Text>

                {/* Quantity Row */}
                <View style={styles.quantityRow}>
                  <View style={styles.qtyBox}>
                    <Pressable
                      onPress={() => handleDecrease(item)}
                      style={({ pressed }) => [
                        styles.qtyBtn,
                        pressed && styles.qtyBtnPressed,
                      ]}
                      hitSlop={6}
                    >
                      {item.quantity === 1 ? (
                        <Feather name="trash-2" size={16} color="#111827" />
                      ) : (
                        <AntDesign name="minus" size={16} color="#111827" />
                      )}
                    </Pressable>
                    <View style={styles.qtyValue}>
                      <Text style={styles.qtyValueText}>{item.quantity}</Text>
                    </View>
                    <Pressable
                      onPress={() => handleIncrease(item)}
                      style={({ pressed }) => [
                        styles.qtyBtn,
                        pressed && styles.qtyBtnPressed,
                      ]}
                      hitSlop={6}
                    >
                      <Feather name="plus" size={16} color="#111827" />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            {/* Actions Row */}
            <View style={styles.actionsRow}>
              <Pressable
                onPress={() => handleRemove(item)}
                style={styles.actionButton}
              >
                <Feather name="trash-2" size={14} color="#374151" />
                <Text style={styles.actionText}>Delete</Text>
              </Pressable>

              <Pressable style={styles.actionButton}>
                <Feather name="bookmark" size={14} color="#374151" />
                <Text style={styles.actionText}>Save for later</Text>
              </Pressable>

              <Pressable style={styles.actionButton}>
                <Feather name="eye" size={14} color="#374151" />
                <Text style={styles.actionText}>Similar</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* ─── Sticky Checkout Bar ─── */}
      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.checkoutLabel}>Subtotal</Text>
          <Text style={styles.checkoutTotal}>
            ₹{total.toLocaleString("en-IN")}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Confirm")}
          style={({ pressed }) => [
            styles.checkoutButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          ]}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Buy</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#111827" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F8FA" },

  // ─── List Header (replaces old top bar) ───
  listHeader: {
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 12,
  },
  listHeaderTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },
  listHeaderSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
  },

  // ─── Empty State ───
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyIconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F1F3F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  shopButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#008E97",
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 10,
    shadowColor: "#008E97",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  shopButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },

  // ─── List ───
  listContent: { padding: 12, paddingBottom: 100 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardBody: { flexDirection: "row", gap: 12 },

  imageWrap: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },

  details: { flex: 1, justifyContent: "space-between" },
  title: { fontSize: 13, fontWeight: "600", color: "#111827", lineHeight: 18 },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  price: { fontSize: 18, fontWeight: "800", color: "#111827" },

  stockPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
  },
  stockText: { fontSize: 11, fontWeight: "700", color: "#166534" },

  ratingsText: { fontSize: 11, color: "#6B7280", marginTop: 4 },

  quantityRow: { flexDirection: "row", marginTop: 8 },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    overflow: "hidden",
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F8FAFC",
  },
  qtyBtnPressed: { backgroundColor: "#E2E8F0" },
  qtyValue: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
  },
  qtyValueText: { fontSize: 14, fontWeight: "700", color: "#111827" },

  // ─── Actions row ───
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  actionText: { fontSize: 12, fontWeight: "600", color: "#374151" },

  // ─── Delivery note ───
  deliveryNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E0F2F1",
    padding: 12,
    borderRadius: 10,
    marginTop: 4,
  },
  deliveryText: { fontSize: 12, fontWeight: "600", color: "#00695C" },

  // ─── Sticky checkout ───
  checkoutBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === "ios" ? 26 : 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  checkoutLabel: { fontSize: 12, color: "#6B7280", fontWeight: "500" },
  checkoutTotal: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFD814",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: "#FFD814",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },
});

export default CartScreen;
