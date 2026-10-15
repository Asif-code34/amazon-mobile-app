// import { useState } from "react";
// import { Image, Pressable, Text, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/cartReducer";

// const ProductItem = ({ item }) => {
//   const [addedToCart, setAddedToCart] = useState(false);
//   const dispatch = useDispatch();
//   const addItemToCart = (item) => {
//     setAddedToCart(true);
//     dispatch(addToCart(item));
//     setTimeout(() => {
//       setAddedToCart(false);
//     }, 60000);
//   };
//   const cart = useSelector((state) => state.cart.cart);
//   console.log(cart);
//   return (
//     <Pressable style={{ marginVertical: 25, marginHorizontal: 20 }}>
//       <Image
//         style={{ width: 150, height: 150, resizeMode: "contain" }}
//         source={{ uri: item.image }}
//       />
//       <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
//         {item.title}
//       </Text>
//       <View
//         style={{
//           marginTop: 5,
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
//         <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
//           {item?.rating?.rate} ratings
//         </Text>
//       </View>
//       <Pressable
//         onPress={() => addItemToCart(item)}
//         style={{
//           backgroundColor: "#FFC72C",
//           padding: 10,
//           borderRadius: 20,
//           justifyContent: "center",
//           alignItems: "center",
//           marginHorizontal: 10,
//           marginTop: 10,
//         }}
//       >
//         {addedToCart ? <Text>Added To Cart</Text> : <Text>Add to Cart</Text>}
//       </Pressable>
//     </Pressable>
//   );
// };

// export default ProductItem;

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";

const CARD_WIDTH = 165;
const CARD_HEIGHT = 260;

const ProductItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Reset "Added" state after 1.5s so button feels interactive again
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        rating: item.rating,
      }),
    );

    // Pulse animation on tap
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    setAdded(true);
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("Info", { item })}
      style={styles.card}
    >
      {/* Image */}
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text numberOfLines={2} style={styles.title}>
        {item.title}
      </Text>

      {/* Price + Rating */}
      <View style={styles.metaRow}>
        <Text style={styles.price}>₹{item?.price?.toFixed(0)}</Text>
        <View style={styles.ratingPill}>
          <MaterialIcons name="star" size={12} color="#FFA41C" />
          <Text style={styles.ratingText}>
            {item?.rating?.rate ?? "—"} ({item?.rating?.count ?? 0})
          </Text>
        </View>
      </View>

      {/* Add to Cart */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPress={handleAddToCart}
          style={[styles.addButton, added && styles.addButtonSuccess]}
        >
          {added ? (
            <>
              <MaterialIcons name="check" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Added</Text>
            </>
          ) : (
            <>
              <MaterialIcons
                name="add-shopping-cart"
                size={16}
                color="#111827"
              />
              <Text style={[styles.addButtonText, { color: "#111827" }]}>
                Add to Cart
              </Text>
            </>
          )}
        </Pressable>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    minHeight: CARD_HEIGHT,
    backgroundColor: "#FFFFFF",
    margin: 6,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F1F3F5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: "space-between",
  },
  imageWrap: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  title: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
    marginTop: 8,
    minHeight: 34,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  price: { fontSize: 16, fontWeight: "800", color: "#111827" },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#FFF8E7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: { fontSize: 11, fontWeight: "600", color: "#B45309" },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#FFD814",
    paddingVertical: 9,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonSuccess: { backgroundColor: "#16A34A" },
  addButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default ProductItem;
