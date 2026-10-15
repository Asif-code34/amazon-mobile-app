// import {
//   AntDesign,
//   Feather,
//   Ionicons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useState } from "react";
// import {
//   Alert,
//   Dimensions,
//   Image,
//   Pressable,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/cartReducer";

// import { Platform } from "react-native"; // ← add to your react-native imports

// const { width } = Dimensions.get("window");
// // On web, cap the carousel width to 480px (phone-frame width) — even on laptops
// const CAROUSEL_WIDTH = Platform.OS === "web" ? Math.min(width, 480) : width;
// const IMAGE_HEIGHT = CAROUSEL_WIDTH;

// const ProductInfoScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cart);

//   const [added, setAdded] = useState(false);
//   const [wishlisted, setWishlisted] = useState(false);

//   // route.params may come from ProductItem (item) OR from Home deals/offers (spread fields)
//   const product = route.params?.item ?? {
//     id: route.params?.id,
//     title: route.params?.title,
//     price: route.params?.price,
//     image: route.params?.carouselImages?.[0] ?? route.params?.image,
//     rating: route.params?.rating,
//     category: route.params?.category,
//     description: route.params?.description,
//   };

//   const carouselImages = route.params?.carouselImages?.length
//     ? route.params.carouselImages
//     : [product?.image].filter(Boolean);

//   const price = route.params?.price ?? product?.price ?? 0;
//   const oldPrice = route.params?.oldPrice;
//   const color = route.params?.color;
//   const size = route.params?.size;
//   const discount = oldPrice
//     ? Math.round(((oldPrice - price) / oldPrice) * 100)
//     : null;

//   const handleAddToCart = () => {
//     if (!product?.id) {
//       return Alert.alert("Error", "Product info missing");
//     }

//     dispatch(
//       addToCart({
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         image: product.image,
//         rating: product.rating,
//       }),
//     );

//     setAdded(true);
//     setTimeout(() => setAdded(false), 1500);
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     navigation.navigate("Main", { screen: "Cart" });
//   };

//   const inCart = cart.find((i) => i.id === product?.id);

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top"]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#00CED1" />

//       {/* ─── Search Bar ─── */}
//       <View style={styles.searchBar}>
//         <Pressable
//           onPress={() => navigation.goBack()}
//           hitSlop={10}
//           style={styles.backBtn}
//         >
//           <MaterialIcons name="arrow-back" size={22} color="#111827" />
//         </Pressable>

//         <View style={styles.searchInput}>
//           <AntDesign
//             name="search"
//             size={18}
//             color="#6B7280"
//             style={{ marginLeft: 10 }}
//           />
//           <TextInput
//             placeholder="Search Amazon.in"
//             placeholderTextColor="#9CA3AF"
//             style={styles.searchText}
//           />
//         </View>

//         <Pressable hitSlop={8} style={styles.micBtn}>
//           <Feather name="mic" size={22} color="#000" />
//         </Pressable>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         {/* ─── Image Carousel ─── */}
//         <ScrollView
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//         >
//           {carouselImages.map((uri, index) => (
//             <View key={index} style={styles.imageWrap}>
//               <Image
//                 source={{ uri }}
//                 style={styles.heroImage}
//                 resizeMode="contain"
//               />

//               {/* Top overlay actions */}
//               <View style={styles.imageOverlayTop}>
//                 {discount && (
//                   <View style={styles.discountPill}>
//                     <Text style={styles.discountText}>{discount}% OFF</Text>
//                   </View>
//                 )}
//                 <Pressable style={styles.circleBtn} hitSlop={6}>
//                   <Feather name="share-2" size={20} color="#111827" />
//                 </Pressable>
//               </View>

//               {/* Wishlist bottom-left */}
//               <Pressable
//                 onPress={() => setWishlisted(!wishlisted)}
//                 style={styles.wishlistBtn}
//                 hitSlop={6}
//               >
//                 <MaterialIcons
//                   name={wishlisted ? "favorite" : "favorite-border"}
//                   size={26}
//                   color={wishlisted ? "#DC2626" : "#111827"}
//                 />
//               </Pressable>
//             </View>
//           ))}
//         </ScrollView>

//         {/* ─── Title + Price ─── */}
//         <View style={styles.block}>
//           <Text style={styles.title}>{product?.title}</Text>

//           <View style={styles.priceRow}>
//             <Text style={styles.price}>₹{price}</Text>
//             {oldPrice ? <Text style={styles.oldPrice}>₹{oldPrice}</Text> : null}
//             {discount ? (
//               <Text style={styles.discountInline}>({discount}% off)</Text>
//             ) : null}
//           </View>

//           {product?.rating?.rate ? (
//             <View style={styles.ratingRow}>
//               <View style={styles.starsPill}>
//                 <Text style={styles.starsText}>{product.rating.rate} ★</Text>
//               </View>
//               <Text style={styles.ratingCount}>
//                 {product.rating.count} ratings
//               </Text>
//             </View>
//           ) : null}
//         </View>

//         <View style={styles.divider} />

//         {/* ─── Color / Size ─── */}
//         {(color || size) && (
//           <View style={styles.block}>
//             {color ? (
//               <View style={styles.specRow}>
//                 <Text style={styles.specLabel}>Color</Text>
//                 <Text style={styles.specValue}>{color}</Text>
//               </View>
//             ) : null}
//             {size ? (
//               <View style={styles.specRow}>
//                 <Text style={styles.specLabel}>Size</Text>
//                 <Text style={styles.specValue}>{size}</Text>
//               </View>
//             ) : null}
//           </View>
//         )}

//         {product?.description ? (
//           <>
//             <View style={styles.divider} />
//             <View style={styles.block}>
//               <Text style={styles.sectionLabel}>About this item</Text>
//               <Text style={styles.description}>{product.description}</Text>
//             </View>
//           </>
//         ) : null}

//         <View style={styles.divider} />

//         {/* ─── Delivery Info ─── */}
//         <View style={styles.block}>
//           <View style={styles.deliveryRow}>
//             <Ionicons name="flash" size={18} color="#008E97" />
//             <Text style={styles.deliveryText}>
//               <Text style={{ fontWeight: "800" }}>FREE delivery</Text> Tomorrow
//               by 3 PM. Order within 10 hrs 30 mins
//             </Text>
//           </View>

//           <View style={styles.deliveryRow}>
//             <Ionicons name="location" size={18} color="#008E97" />
//             <Text style={styles.deliveryText}>
//               Deliver to{" "}
//               <Text style={{ fontWeight: "700" }}>Bangalore 560019</Text>
//             </Text>
//           </View>

//           <View style={styles.stockRow}>
//             <View style={styles.stockPill}>
//               <View style={styles.stockDot} />
//               <Text style={styles.stockText}>In Stock</Text>
//             </View>
//             {inCart ? (
//               <Text style={styles.inCartHint}>{inCart.quantity} in cart</Text>
//             ) : null}
//           </View>
//         </View>

//         {/* ─── Total ─── */}
//         <View style={styles.block}>
//           <View style={styles.totalRow}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>₹{price}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* ─── Sticky Bottom Actions ─── */}
//       <View style={styles.bottomBar}>
//         <Pressable
//           onPress={handleAddToCart}
//           style={({ pressed }) => [
//             styles.addBtn,
//             (pressed || added) && { opacity: 0.9 },
//           ]}
//         >
//           {added ? (
//             <>
//               <Feather name="check" size={18} color="#111827" />
//               <Text style={styles.addBtnText}>Added to Cart</Text>
//             </>
//           ) : (
//             <>
//               <Feather name="shopping-cart" size={18} color="#111827" />
//               <Text style={styles.addBtnText}>Add to Cart</Text>
//             </>
//           )}
//         </Pressable>

//         <Pressable
//           onPress={handleBuyNow}
//           style={({ pressed }) => [styles.buyBtn, pressed && { opacity: 0.9 }]}
//         >
//           <Feather name="zap" size={18} color="#FFFFFF" />
//           <Text style={styles.buyBtnText}>Buy Now</Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#FFFFFF" },

//   // ─── Search bar ───
//   searchBar: {
//     backgroundColor: "#00CED1",
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   backBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   searchInput: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 6,
//     height: 38,
//   },
//   searchText: {
//     flex: 1,
//     paddingHorizontal: 8,
//     color: "#111827",
//     fontSize: 14,
//   },
//   micBtn: {
//     width: 36,
//     height: 36,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   // ─── Image ───
//   // imageWrap: {
//   //   width,
//   //   height: IMAGE_HEIGHT,
//   //   backgroundColor: "#FAFAFA",
//   // },

//   // imageWrap: {
//   //   width,
//   //   height: IMAGE_HEIGHT,
//   //   backgroundColor: "#FAFAFA",
//   //   position: "relative",
//   // },

//   imageWrap: {
//     width: CAROUSEL_WIDTH,
//     height: IMAGE_HEIGHT,
//     backgroundColor: "#FAFAFA",
//     position: "relative",
//   },

//   heroImage: { width: "100%", height: "100%" },
//   imageOverlayTop: {
//     position: "absolute",
//     top: 12,
//     left: 12,
//     right: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   discountPill: {
//     backgroundColor: "#C60C30",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 6,
//   },
//   discountText: { color: "#FFFFFF", fontWeight: "800", fontSize: 12 },

//   circleBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 4,
//     zIndex: 10,
//   },

//   // circleBtn: {
//   //   width: 40,
//   //   height: 40,
//   //   borderRadius: 20,
//   //   backgroundColor: "#FFFFFF",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   //   shadowColor: "#000",
//   //   shadowOffset: { width: 0, height: 1 },
//   //   shadowOpacity: 0.1,
//   //   shadowRadius: 3,
//   //   elevation: 2,
//   // },

//   // wishlistBtn: {
//   //   position: "absolute",
//   //   bottom: 16,
//   //   left: 16,
//   //   width: 44,
//   //   height: 44,
//   //   borderRadius: 22,
//   //   backgroundColor: "#FFFFFF",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   //   shadowColor: "#000",
//   //   shadowOffset: { width: 0, height: 1 },
//   //   shadowOpacity: 0.1,
//   //   shadowRadius: 3,
//   //   elevation: 2,
//   // },

//   wishlistBtn: {
//     position: "absolute",
//     bottom: 16,
//     left: 16,
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 4,
//     zIndex: 10,
//   },

//   // ─── Content blocks ───
//   block: { paddingHorizontal: 16, paddingVertical: 12 },

//   title: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#111827",
//     lineHeight: 22,
//   },

//   priceRow: {
//     flexDirection: "row",
//     alignItems: "baseline",
//     gap: 10,
//     marginTop: 10,
//   },
//   price: { fontSize: 24, fontWeight: "800", color: "#111827" },
//   oldPrice: {
//     fontSize: 14,
//     color: "#9CA3AF",
//     textDecorationLine: "line-through",
//   },
//   discountInline: { fontSize: 14, fontWeight: "700", color: "#16A34A" },

//   ratingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//   },
//   starsPill: {
//     backgroundColor: "#FFF8E7",
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 6,
//   },
//   starsText: { fontSize: 12, fontWeight: "800", color: "#B45309" },
//   ratingCount: { fontSize: 12, color: "#6B7280" },

//   divider: { height: 1, backgroundColor: "#F1F3F5" },

//   specRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 6,
//   },
//   specLabel: { fontSize: 13, color: "#6B7280", width: 60 },
//   specValue: { fontSize: 14, fontWeight: "700", color: "#111827" },

//   sectionLabel: {
//     fontSize: 14,
//     fontWeight: "800",
//     color: "#111827",
//     marginBottom: 8,
//   },
//   description: { fontSize: 13, color: "#374151", lineHeight: 20 },

//   deliveryRow: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 10,
//     marginBottom: 10,
//   },
//   deliveryText: { fontSize: 13, color: "#374151", flex: 1, lineHeight: 19 },

//   stockRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 4,
//   },
//   stockPill: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     backgroundColor: "#ECFDF5",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   stockDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#16A34A",
//   },
//   stockText: { fontSize: 12, fontWeight: "800", color: "#166534" },
//   inCartHint: { fontSize: 12, fontWeight: "700", color: "#008E97" },

//   totalRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   totalLabel: { fontSize: 16, fontWeight: "700", color: "#111827" },
//   totalValue: { fontSize: 22, fontWeight: "800", color: "#C60C30" },

//   // ─── Bottom bar ───
//   bottomBar: {
//     flexDirection: "row",
//     gap: 10,
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 24,
//     backgroundColor: "#FFFFFF",
//     borderTopWidth: 1,
//     borderTopColor: "#E5E7EB",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     elevation: 8,
//   },
//   addBtn: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     backgroundColor: "#FFD814",
//     height: 50,
//     borderRadius: 10,
//   },
//   addBtnText: { fontSize: 15, fontWeight: "800", color: "#111827" },
//   buyBtn: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     backgroundColor: "#FF8C00",
//     height: 50,
//     borderRadius: 10,
//   },
//   buyBtnText: { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
// });

// export default ProductInfoScreen;

import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartReducer";

const { width } = Dimensions.get("window");
// Cap carousel width on web so it fits inside the 480px phone frame
const CAROUSEL_WIDTH = Platform.OS === "web" ? Math.min(width, 480) : width;
const IMAGE_HEIGHT = CAROUSEL_WIDTH;

const ProductInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const product = route.params?.item ?? {
    id: route.params?.id,
    title: route.params?.title,
    price: route.params?.price,
    image: route.params?.carouselImages?.[0] ?? route.params?.image,
    rating: route.params?.rating,
    category: route.params?.category,
    description: route.params?.description,
  };

  const carouselImages = route.params?.carouselImages?.length
    ? route.params.carouselImages
    : [product?.image].filter(Boolean);

  const price = route.params?.price ?? product?.price ?? 0;
  const oldPrice = route.params?.oldPrice;
  const color = route.params?.color;
  const size = route.params?.size;
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!product?.id) {
      return Alert.alert("Error", "Product info missing");
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating,
      }),
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigation.navigate("Main", { screen: "Cart" });
  };

  const inCart = cart.find((i) => i.id === product?.id);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#00CED1" />

      {/* ─── Search Bar ─── */}
      <View style={styles.searchBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.backBtn}
        >
          <MaterialIcons name="arrow-back" size={22} color="#111827" />
        </Pressable>

        <View style={styles.searchInput}>
          <AntDesign
            name="search"
            size={18}
            color="#6B7280"
            style={{ marginLeft: 10 }}
          />
          <TextInput
            placeholder="Search Amazon.in"
            placeholderTextColor="#9CA3AF"
            style={styles.searchText}
          />
        </View>

        <Pressable hitSlop={8} style={styles.micBtn}>
          <Feather name="mic" size={22} color="#000" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ─── Image Carousel ─── */}
        <View style={styles.carouselOuter}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {carouselImages.map((uri, index) => (
              <View key={index} style={styles.imageWrap}>
                <Image
                  source={{ uri }}
                  style={styles.heroImage}
                  resizeMode="contain"
                />

                {/* Top overlay actions */}
                <View style={styles.imageOverlayTop}>
                  {discount && (
                    <View style={styles.discountPill}>
                      <Text style={styles.discountText}>{discount}% OFF</Text>
                    </View>
                  )}
                  <Pressable style={styles.circleBtn} hitSlop={6}>
                    <Feather name="share-2" size={20} color="#111827" />
                  </Pressable>
                </View>

                {/* Wishlist bottom-left */}
                <Pressable
                  onPress={() => setWishlisted(!wishlisted)}
                  style={styles.wishlistBtn}
                  hitSlop={6}
                >
                  <MaterialIcons
                    name={wishlisted ? "favorite" : "favorite-border"}
                    size={26}
                    color={wishlisted ? "#DC2626" : "#111827"}
                  />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ─── Title + Price ─── */}
        <View style={styles.block}>
          <Text style={styles.title}>{product?.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{price}</Text>
            {oldPrice ? <Text style={styles.oldPrice}>₹{oldPrice}</Text> : null}
            {discount ? (
              <Text style={styles.discountInline}>({discount}% off)</Text>
            ) : null}
          </View>

          {product?.rating?.rate ? (
            <View style={styles.ratingRow}>
              <View style={styles.starsPill}>
                <Text style={styles.starsText}>{product.rating.rate} ★</Text>
              </View>
              <Text style={styles.ratingCount}>
                {product.rating.count} ratings
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.divider} />

        {/* ─── Color / Size ─── */}
        {(color || size) && (
          <View style={styles.block}>
            {color ? (
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Color</Text>
                <Text style={styles.specValue}>{color}</Text>
              </View>
            ) : null}
            {size ? (
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Size</Text>
                <Text style={styles.specValue}>{size}</Text>
              </View>
            ) : null}
          </View>
        )}

        {product?.description ? (
          <>
            <View style={styles.divider} />
            <View style={styles.block}>
              <Text style={styles.sectionLabel}>About this item</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </>
        ) : null}

        <View style={styles.divider} />

        {/* ─── Delivery Info ─── */}
        <View style={styles.block}>
          <View style={styles.deliveryRow}>
            <Ionicons name="flash" size={18} color="#008E97" />
            <Text style={styles.deliveryText}>
              <Text style={{ fontWeight: "800" }}>FREE delivery</Text> Tomorrow
              by 3 PM. Order within 10 hrs 30 mins
            </Text>
          </View>

          <View style={styles.deliveryRow}>
            <Ionicons name="location" size={18} color="#008E97" />
            <Text style={styles.deliveryText}>
              Deliver to{" "}
              <Text style={{ fontWeight: "700" }}>Bangalore 560019</Text>
            </Text>
          </View>

          <View style={styles.stockRow}>
            <View style={styles.stockPill}>
              <View style={styles.stockDot} />
              <Text style={styles.stockText}>In Stock</Text>
            </View>
            {inCart ? (
              <Text style={styles.inCartHint}>{inCart.quantity} in cart</Text>
            ) : null}
          </View>
        </View>

        {/* ─── Total ─── */}
        <View style={styles.block}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{price}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ─── Sticky Bottom Actions ─── */}
      <View style={styles.bottomBar}>
        <Pressable
          onPress={handleAddToCart}
          style={({ pressed }) => [
            styles.addBtn,
            (pressed || added) && { opacity: 0.9 },
          ]}
        >
          {added ? (
            <>
              <Feather name="check" size={18} color="#111827" />
              <Text style={styles.addBtnText}>Added to Cart</Text>
            </>
          ) : (
            <>
              <Feather name="shopping-cart" size={18} color="#111827" />
              <Text style={styles.addBtnText}>Add to Cart</Text>
            </>
          )}
        </Pressable>

        <Pressable
          onPress={handleBuyNow}
          style={({ pressed }) => [styles.buyBtn, pressed && { opacity: 0.9 }]}
        >
          <Feather name="zap" size={18} color="#FFFFFF" />
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },

  // ─── Search bar ───
  searchBar: {
    backgroundColor: "#00CED1",
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    height: 38,
  },
  searchText: {
    flex: 1,
    paddingHorizontal: 8,
    color: "#111827",
    fontSize: Platform.OS === "web" ? 16 : 14,

    // fontSize: 14,
  },
  micBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Image Carousel ───
  carouselOuter: {
    width: "100%",
    alignItems: Platform.OS === "web" ? "center" : "stretch",
  },

  imageWrap: {
    width: CAROUSEL_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: "#FAFAFA",
    position: "relative",
  },

  heroImage: { width: "100%", height: "100%" },
  imageOverlayTop: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  discountPill: {
    backgroundColor: "#C60C30",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  discountText: { color: "#FFFFFF", fontWeight: "800", fontSize: 12 },

  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },

  wishlistBtn: {
    position: "absolute",
    bottom: 16,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },

  // ─── Content blocks ───
  block: { paddingHorizontal: 16, paddingVertical: 12 },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 22,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    marginTop: 10,
  },
  price: { fontSize: 24, fontWeight: "800", color: "#111827" },
  oldPrice: {
    fontSize: 14,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  discountInline: { fontSize: 14, fontWeight: "700", color: "#16A34A" },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  starsPill: {
    backgroundColor: "#FFF8E7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  starsText: { fontSize: 12, fontWeight: "800", color: "#B45309" },
  ratingCount: { fontSize: 12, color: "#6B7280" },

  divider: { height: 1, backgroundColor: "#F1F3F5" },

  specRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  specLabel: { fontSize: 13, color: "#6B7280", width: 60 },
  specValue: { fontSize: 14, fontWeight: "700", color: "#111827" },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  description: { fontSize: 13, color: "#374151", lineHeight: 20 },

  deliveryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  deliveryText: { fontSize: 13, color: "#374151", flex: 1, lineHeight: 19 },

  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  stockPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
  },
  stockText: { fontSize: 12, fontWeight: "800", color: "#166534" },
  inCartHint: { fontSize: 12, fontWeight: "700", color: "#008E97" },

  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: { fontSize: 16, fontWeight: "700", color: "#111827" },
  totalValue: { fontSize: 22, fontWeight: "800", color: "#C60C30" },

  // ─── Bottom bar ───
  bottomBar: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  addBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFD814",
    height: 50,
    borderRadius: 10,
  },
  addBtnText: { fontSize: 15, fontWeight: "800", color: "#111827" },
  buyBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FF8C00",
    height: 50,
    borderRadius: 10,
  },
  buyBtnText: { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
});

export default ProductInfoScreen;
