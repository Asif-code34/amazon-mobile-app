// import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { useContext, useState } from "react";
// import { Pressable, ScrollView, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch, useSelector } from "react-redux";
// import { cleanCart } from "../redux/cartReducer";
// import { AppContext } from "../UserContext";

// const ConfirmationScreen = () => {
//   const navigation = useNavigation();
//   const cart = useSelector((state) => state.cart.cart);
//   const dispatch = useDispatch();
//   const [currentStep, setCurrentStep] = useState(0);
//   const { fetchAddress, addresses, setAddresses, userId } =
//     useContext(AppContext);
//   const [selectedAddress, setSelectedAdress] = useState("");
//   const [option, setOption] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");
//   const total = cart
//     ?.map((item) => item.price * item.quantity)
//     .reduce((curr, prev) => curr + prev, 0);
//   const steps = [
//     {
//       title: "Address",
//       content: "Address Form",
//     },
//     {
//       title: "Delivery",
//       content: "Delivery Options",
//     },
//     {
//       title: "Payment",
//       content: "Payment Details",
//     },
//     {
//       title: "Place Order",
//       content: "Order Summery",
//     },
//   ];
//   const handlePlaceOrder = async () => {
//     try {
//       const orderData = {
//         userId: userId,
//         cartItems: cart,
//         totalPrice: total,
//         shippingAddress: selectedAddress,
//         paymentMethod: selectedOption,
//       };

//       const response = await axios.post(
//         "http://172.20.10.3:8000/orders",
//         orderData
//       );
//       if (response.status === 200) {
//         navigation.navigate("Order");
//         dispatch(cleanCart());
//       } else {
//         console.log("error creating order", response.data);
//       }
//     } catch (error) {
//       console.log("errror", error);
//     }
//   };
//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginBottom: 20,
//               justifyContent: "space-between",
//             }}
//           >
//             {steps.map((item, index) => (
//               <View
//                 style={{ justifyContent: "center", alignItems: "center" }}
//                 key={index}
//               >
//                 {index > 0 && (
//                   <View
//                     style={[
//                       { flex: 1, height: 2, backgroundColor: "green" },
//                       index <= currentStep && { backgroundColor: "green" },
//                     ]}
//                   />
//                 )}
//                 <View
//                   style={[
//                     {
//                       width: 30,
//                       height: 30,
//                       borderRadius: 15,
//                       backgroundColor: "#ccc",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     },
//                     index < currentStep && { backgroundColor: "green" },
//                   ]}
//                 >
//                   {index < currentStep ? (
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         fontWeight: "bold",
//                         color: "white",
//                       }}
//                     >
//                       &#10003;
//                     </Text>
//                   ) : (
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         fontWeight: "bold",
//                         color: "white",
//                       }}
//                     >
//                       {index + 1}
//                     </Text>
//                   )}
//                 </View>
//                 <Text style={{ textAlign: "center", marginTop: 8 }}>
//                   {item.title}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//         {currentStep == 0 && (
//           <View style={{ marginHorizontal: 20 }}>
//             <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//               Select Delivery Address
//             </Text>
//             <Pressable>
//               {addresses.map((item, index) => (
//                 <Pressable
//                   key={index}
//                   style={{
//                     borderWidth: 1,
//                     borderColor: "#D0D0D0",
//                     padding: 10,
//                     flexDirection: "row",
//                     alignItems: "center",
//                     gap: 5,
//                     paddingBottom: 17,
//                     marginVertical: 7,
//                     borderRadius: 6,
//                   }}
//                 >
//                   {selectedAddress && selectedAddress._id === item?._id ? (
//                     <FontAwesome5 name="dot-circle" size={20} color="#008397" />
//                   ) : (
//                     <Entypo
//                       onPress={() => setSelectedAdress(item)}
//                       name="circle"
//                       size={20}
//                       color="gray"
//                     />
//                   )}
//                   <View style={{ marginLeft: 6 }}>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         gap: 3,
//                       }}
//                     >
//                       <Text style={{ fontSize: 15, fontWeight: "bold" }}>
//                         {item.name}
//                       </Text>
//                       <Entypo name="location-pin" size={24} color="red" />
//                     </View>
//                     <Text style={{ fontSize: 15, color: "#181818" }}>
//                       {item?.houseNo}, {item?.landmark}
//                     </Text>
//                     <Text style={{ fontSize: 15, color: "#181818" }}>
//                       {item?.street}
//                     </Text>

//                     <Text style={{ fontSize: 15, color: "#181818" }}>
//                       India, Bangalore
//                     </Text>

//                     <Text style={{ fontSize: 15, color: "#181818" }}>
//                       phone No : {item?.mobileNo}
//                     </Text>
//                     <Text style={{ fontSize: 15, color: "#181818" }}>
//                       pin code : {item?.postalCode}
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         gap: 10,
//                         marginTop: 7,
//                       }}
//                     >
//                       <Pressable
//                         style={{
//                           backgroundColor: "#F5F5F5",
//                           paddingHorizontal: 10,
//                           paddingVertical: 6,
//                           borderRadius: 5,
//                           borderWidth: 0.9,
//                           borderColor: "#D0D0D0",
//                         }}
//                       >
//                         <Text>Edit</Text>
//                       </Pressable>
//                       <Pressable
//                         style={{
//                           backgroundColor: "#F5F5F5",
//                           paddingHorizontal: 10,
//                           paddingVertical: 6,
//                           borderRadius: 5,
//                           borderWidth: 0.9,
//                           borderColor: "#D0D0D0",
//                         }}
//                       >
//                         <Text>Remove</Text>
//                       </Pressable>

//                       <Pressable
//                         style={{
//                           backgroundColor: "#F5F5F5",
//                           paddingHorizontal: 10,
//                           paddingVertical: 6,
//                           borderRadius: 5,
//                           borderWidth: 0.9,
//                           borderColor: "#D0D0D0",
//                         }}
//                       >
//                         <Text>Set as Default</Text>
//                       </Pressable>
//                     </View>
//                     <View>
//                       {selectedAddress && selectedAddress._id === item?._id && (
//                         <Pressable
//                           onPress={() => setCurrentStep(1)}
//                           style={{
//                             backgroundColor: "#008397",
//                             padding: 10,
//                             borderRadius: 20,
//                             justifyContent: "center",
//                             alignItems: "center",
//                             marginTop: 10,
//                           }}
//                         >
//                           <Text style={{ textAlign: "center", color: "white" }}>
//                             Deliver to this Address
//                           </Text>
//                         </Pressable>
//                       )}
//                     </View>
//                   </View>
//                 </Pressable>
//               ))}
//             </Pressable>
//           </View>
//         )}
//         {currentStep == 1 && (
//           <View style={{ marginHorizontal: 20 }}>
//             <Text style={{ fontWeight: "bold", fontSize: 16 }}>
//               {" "}
//               Choose your delivery options
//             </Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 backgroundColor: "white",
//                 padding: 8,
//                 gap: 7,
//                 borderColor: "#D0D0D0",
//                 borderWidth: 1,
//                 marginTop: 10,
//               }}
//             >
//               {option ? (
//                 <FontAwesome5 name="dot-circle" size={20} color="#008397" />
//               ) : (
//                 <Entypo
//                   onPress={() => setOption(!option)}
//                   name="circle"
//                   size={20}
//                   color="gray"
//                 />
//               )}
//               <Text style={{ flex: 1 }}>
//                 <Text style={{ color: "green", fontWeight: "500" }}>
//                   Tomorrow by 10pm
//                 </Text>{" "}
//                 - FREE delivery with your Prime membership
//               </Text>
//             </View>
//             <Pressable
//               onPress={() => setCurrentStep(2)}
//               style={{
//                 backgroundColor: "#FFC72C",
//                 padding: 10,
//                 borderRadius: 20,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: 15,
//               }}
//             >
//               <Text>Continue</Text>
//             </Pressable>
//           </View>
//         )}
//         {currentStep == 2 && (
//           <View style={{ marginHorizontal: 20 }}>
//             <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//               Select your payment Method
//             </Text>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 padding: 8,
//                 borderColor: "#D0D0D0",
//                 borderWidth: 1,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: 7,
//                 marginTop: 12,
//               }}
//             >
//               {selectedOption === "cash" ? (
//                 <FontAwesome5 name="dot-circle" size={20} color="#008397" />
//               ) : (
//                 <Entypo
//                   onPress={() => setSelectedOption("cash")}
//                   name="circle"
//                   size={20}
//                   color="gray"
//                 />
//               )}
//               <Text>Cash on Delivery</Text>
//             </View>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 padding: 8,
//                 borderColor: "#D0D0D0",
//                 borderWidth: 1,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: 7,
//                 marginTop: 12,
//               }}
//             >
//               {selectedOption === "card" ? (
//                 <FontAwesome5 name="dot-circle" size={20} color="#008397" />
//               ) : (
//                 <Entypo
//                   onPress={() => setSelectedOption("card")}
//                   name="circle"
//                   size={20}
//                   color="gray"
//                 />
//               )}
//               <Text>Pay Online</Text>
//             </View>
//             <Pressable
//               onPress={() => setCurrentStep(3)}
//               style={{
//                 backgroundColor: "#FFC72C",
//                 padding: 10,
//                 borderRadius: 20,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: 15,
//               }}
//             >
//               <Text>Continue</Text>
//             </Pressable>
//           </View>
//         )}
//         {currentStep === 3 && selectedOption === "cash" && (
//           <View style={{ marginHorizontal: 20 }}>
//             <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 gap: 8,
//                 backgroundColor: "white",
//                 padding: 8,
//                 borderColor: "#D0D0D0",
//                 borderWidth: 1,
//                 marginTop: 10,
//               }}
//             >
//               <View>
//                 <Text style={{ fontSize: 17, fontWeight: "bold" }}>
//                   Save 5% and never run out
//                 </Text>
//                 <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
//                   Turn on auto deliveries
//                 </Text>
//               </View>
//               <MaterialIcons
//                 name="keyboard-arrow-right"
//                 size={24}
//                 color="black"
//               />
//             </View>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 padding: 8,
//                 borderColor: "#D0D0D0",
//                 borderWidth: 1,
//                 marginTop: 10,
//               }}
//             >
//               <Text>Shipping to {selectedAddress?.name}</Text>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginTop: 8,
//                 }}
//               >
//                 <Text
//                   style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
//                 >
//                   Delivery
//                 </Text>

//                 <Text style={{ color: "gray", fontSize: 16 }}>₹0</Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginTop: 8,
//                 }}
//               >
//                 <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//                   Order Total
//                 </Text>

//                 <Text
//                   style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
//                 >
//                   ₹{total}
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 padding: 8,
//                 borderColor: "#D0D0D0",
//                 borderWidth: 1,
//                 marginTop: 10,
//               }}
//             >
//               <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

//               <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
//                 Pay on delivery (Cash)
//               </Text>
//             </View>
//             <Pressable
//               onPress={() => handlePlaceOrder()}
//               style={{
//                 backgroundColor: "#FFC72C",
//                 padding: 10,
//                 borderRadius: 20,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: 20,
//               }}
//             >
//               <Text>Place your order</Text>
//             </Pressable>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ConfirmationScreen;

import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/cartReducer";
import api from "../services/axios";
import { useAuth } from "../UserContext";

const STEPS = ["Address", "Delivery", "Payment", "Place Order"];

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { fetchAddress, addresses, userId } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState("tomorrow");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const total = cart
    .map((i) => i.price * i.quantity)
    .reduce((a, b) => a + b, 0);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  // Fetch addresses on mount
  useEffect(() => {
    if (userId) fetchAddress();
  }, [userId]);

  const canContinue = () => {
    if (currentStep === 0) return !!selectedAddress;
    if (currentStep === 1) return !!deliveryOption;
    if (currentStep === 2) return !!paymentMethod;
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      return Alert.alert("Error", "Please select a delivery address");
    }
    if (!paymentMethod) {
      return Alert.alert("Error", "Please select a payment method");
    }

    try {
      setPlacingOrder(true);

      const orderData = {
        cartItems: cart,
        totalPrice: total,
        shippingAddress: {
          name: selectedAddress.name,
          mobileNo: selectedAddress.mobileNo,
          houseNo: selectedAddress.houseNo,
          street: selectedAddress.street,
          landmark: selectedAddress.landmark,
          postalCode: selectedAddress.postalCode,
        },
        paymentMethod: paymentMethod === "cash" ? "Cash on Delivery" : "Online",
      };

      const response = await api.post("/orders", orderData);

      if (response.status === 201 || response.status === 200) {
        const placedOrder = response.data.order;
        dispatch(cleanCart());
        navigation.replace("Order", { order: placedOrder });
      } else {
        Alert.alert("Error", "Could not place order. Try again.");
      }
    } catch (err) {
      Alert.alert("Order Failed", err.message || "Something went wrong");
    } finally {
      setPlacingOrder(false);
    }
  };

  // ─── Empty cart guard ───
  if (!cart.length) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <MaterialIcons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIconWrap}>
            <Feather name="shopping-bag" size={48} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add items to cart before proceeding to checkout
          </Text>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <MaterialIcons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </Text>
        </View>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepBar}>
        {STEPS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          return (
            <View key={label} style={styles.stepItem}>
              {index > 0 && (
                <View
                  style={[
                    styles.stepLine,
                    isCompleted || isActive ? styles.stepLineActive : null,
                  ]}
                />
              )}
              <View
                style={[
                  styles.stepCircle,
                  isCompleted && styles.stepCircleCompleted,
                  isActive && styles.stepCircleActive,
                ]}
              >
                {isCompleted ? (
                  <Feather name="check" size={14} color="#FFFFFF" />
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      isActive && { color: "#FFFFFF" },
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  isActive && { color: "#008E97", fontWeight: "800" },
                ]}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Step 0: Address ─── */}
        {currentStep === 0 && (
          <View>
            <Text style={styles.sectionTitle}>Select Delivery Address</Text>

            {!addresses?.length ? (
              <View style={styles.noAddressWrap}>
                <MaterialIcons name="location-off" size={40} color="#9CA3AF" />
                <Text style={styles.noAddressTitle}>No addresses saved</Text>
                <Pressable
                  onPress={() => navigation.navigate("AddressForm")}
                  style={styles.addAddressBtn}
                >
                  <Feather name="plus" size={16} color="#FFFFFF" />
                  <Text style={styles.addAddressBtnText}>Add Address</Text>
                </Pressable>
              </View>
            ) : (
              addresses.map((item) => {
                const isSelected = selectedAddress?._id === item._id;
                return (
                  <Pressable
                    key={item._id}
                    onPress={() => setSelectedAddress(item)}
                    style={[
                      styles.addressCard,
                      isSelected && styles.addressCardSelected,
                    ]}
                  >
                    <View style={styles.radioWrap}>
                      {isSelected ? (
                        <FontAwesome5
                          name="dot-circle"
                          size={20}
                          color="#008E97"
                        />
                      ) : (
                        <Entypo name="circle" size={20} color="#9CA3AF" />
                      )}
                    </View>

                    <View style={{ flex: 1 }}>
                      <View style={styles.addressNameRow}>
                        <Text style={styles.addressName}>{item.name}</Text>
                        <Entypo name="location-pin" size={18} color="#EF4444" />
                      </View>
                      <Text style={styles.addressLine}>
                        {item.houseNo}, {item.landmark}
                      </Text>
                      <Text style={styles.addressLine}>{item.street}</Text>
                      <Text style={styles.addressLine}>
                        {item.city ?? "Bangalore"}, {item.country ?? "India"} —{" "}
                        {item.postalCode}
                      </Text>
                      <Text style={styles.addressMeta}>📞 {item.mobileNo}</Text>
                    </View>
                  </Pressable>
                );
              })
            )}

            {addresses?.length > 0 && (
              <Pressable
                onPress={() => navigation.navigate("AddressForm")}
                style={styles.addMoreBtn}
              >
                <Feather name="plus" size={16} color="#008E97" />
                <Text style={styles.addMoreText}>Add another address</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* ─── Step 1: Delivery ─── */}
        {currentStep === 1 && (
          <View>
            <Text style={styles.sectionTitle}>Choose Delivery Option</Text>

            <Pressable
              onPress={() => setDeliveryOption("tomorrow")}
              style={[
                styles.optionCard,
                deliveryOption === "tomorrow" && styles.optionCardSelected,
              ]}
            >
              <View style={styles.radioWrap}>
                {deliveryOption === "tomorrow" ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008E97" />
                ) : (
                  <Entypo name="circle" size={20} color="#9CA3AF" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>Tomorrow by 10 PM</Text>
                <Text style={styles.optionSubtitle}>
                  <Text style={{ color: "#16A34A", fontWeight: "700" }}>
                    FREE delivery
                  </Text>{" "}
                  with Prime membership
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setDeliveryOption("standard")}
              style={[
                styles.optionCard,
                deliveryOption === "standard" && styles.optionCardSelected,
              ]}
            >
              <View style={styles.radioWrap}>
                {deliveryOption === "standard" ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008E97" />
                ) : (
                  <Entypo name="circle" size={20} color="#9CA3AF" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>Standard Delivery</Text>
                <Text style={styles.optionSubtitle}>
                  Delivered in 3–5 business days · ₹40
                </Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* ─── Step 2: Payment ─── */}
        {currentStep === 2 && (
          <View>
            <Text style={styles.sectionTitle}>Select Payment Method</Text>

            <Pressable
              onPress={() => setPaymentMethod("cash")}
              style={[
                styles.optionCard,
                paymentMethod === "cash" && styles.optionCardSelected,
              ]}
            >
              <View style={styles.radioWrap}>
                {paymentMethod === "cash" ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008E97" />
                ) : (
                  <Entypo name="circle" size={20} color="#9CA3AF" />
                )}
              </View>
              <MaterialIcons name="payments" size={22} color="#111827" />
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>Cash on Delivery</Text>
                <Text style={styles.optionSubtitle}>
                  Pay when your order arrives
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setPaymentMethod("card")}
              style={[
                styles.optionCard,
                paymentMethod === "card" && styles.optionCardSelected,
              ]}
            >
              <View style={styles.radioWrap}>
                {paymentMethod === "card" ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008E97" />
                ) : (
                  <Entypo name="circle" size={20} color="#9CA3AF" />
                )}
              </View>
              <MaterialIcons name="credit-card" size={22} color="#111827" />
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>Pay Online</Text>
                <Text style={styles.optionSubtitle}>
                  UPI, Cards, Net Banking
                </Text>
              </View>
            </Pressable>

            {paymentMethod === "card" && (
              <View style={styles.infoBanner}>
                <Feather name="info" size={16} color="#92400E" />
                <Text style={styles.infoBannerText}>
                  Online payments will be enabled soon. Please choose Cash on
                  Delivery for now.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* ─── Step 3: Review & Place Order ─── */}
        {currentStep === 3 && (
          <View>
            <Text style={styles.sectionTitle}>Review Your Order</Text>

            {/* Delivery address summary */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <Feather name="map-pin" size={16} color="#008E97" />
                <Text style={styles.summaryHeaderText}>Deliver to</Text>
              </View>
              <Text style={styles.summaryName}>{selectedAddress?.name}</Text>
              <Text style={styles.summaryLine}>
                {selectedAddress?.houseNo}, {selectedAddress?.landmark}
              </Text>
              <Text style={styles.summaryLine}>
                {selectedAddress?.street},{" "}
                {selectedAddress?.city ?? "Bangalore"} —{" "}
                {selectedAddress?.postalCode}
              </Text>
              <Text style={styles.summaryMeta}>
                📞 {selectedAddress?.mobileNo}
              </Text>
            </View>

            {/* Items */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <Feather name="package" size={16} color="#008E97" />
                <Text style={styles.summaryHeaderText}>
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </Text>
              </View>
              {cart.map((item) => (
                <View key={item.id} style={styles.summaryItem}>
                  <Text numberOfLines={1} style={styles.summaryItemName}>
                    {item.title}
                  </Text>
                  <Text style={styles.summaryItemMeta}>
                    x{item.quantity} · ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </View>

            {/* Pricing */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryRowLabel}>Items subtotal</Text>
                <Text style={styles.summaryRowValue}>₹{total}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryRowLabel}>Delivery</Text>
                <Text style={[styles.summaryRowValue, { color: "#16A34A" }]}>
                  FREE
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Order Total</Text>
                <Text style={styles.summaryTotalValue}>₹{total}</Text>
              </View>
            </View>

            {/* Payment method */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <Feather name="credit-card" size={16} color="#008E97" />
                <Text style={styles.summaryHeaderText}>Payment</Text>
              </View>
              <Text style={styles.summaryName}>
                {paymentMethod === "cash"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ─── Sticky bottom action bar ─── */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>
            {currentStep === 3 ? "Total" : "Subtotal"}
          </Text>
          <Text style={styles.bottomTotal}>₹{total}</Text>
        </View>

        {currentStep < 3 ? (
          <Pressable
            onPress={() => {
              if (!canContinue()) {
                return Alert.alert("Required", "Please select an option");
              }
              setCurrentStep((s) => s + 1);
            }}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.primaryBtnPressed,
              !canContinue() && { opacity: 0.5 },
            ]}
          >
            <Text style={styles.primaryBtnText}>Continue</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#111827" />
          </Pressable>
        ) : (
          <Pressable
            onPress={handlePlaceOrder}
            disabled={placingOrder}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.primaryBtnPressed,
              placingOrder && { opacity: 0.7 },
            ]}
          >
            {placingOrder ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <>
                <Feather name="check-circle" size={18} color="#111827" />
                <Text style={styles.primaryBtnText}>Place Order</Text>
              </>
            )}
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F8FA" },

  // Header
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
  headerBadge: {
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: { fontSize: 12, fontWeight: "700", color: "#008E97" },

  // Step indicator
  stepBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  stepItem: { alignItems: "center", flex: 1, position: "relative" },
  stepLine: {
    position: "absolute",
    top: 15,
    left: "-50%",
    width: "100%",
    height: 2,
    backgroundColor: "#E5E7EB",
    zIndex: -1,
  },
  stepLineActive: { backgroundColor: "#008E97" },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  stepCircleCompleted: { backgroundColor: "#008E97" },
  stepCircleActive: { backgroundColor: "#FFD814" },
  stepNumber: { fontSize: 13, fontWeight: "800", color: "#6B7280" },
  stepLabel: { fontSize: 10, fontWeight: "600", color: "#9CA3AF" },

  scrollContent: { padding: 16, paddingBottom: 120 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },

  // Address card
  addressCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },
  addressCardSelected: {
    borderColor: "#008E97",
    backgroundColor: "#F0FDFA",
  },
  radioWrap: { marginTop: 2 },
  addressNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  addressName: { fontSize: 14, fontWeight: "800", color: "#111827" },
  addressLine: { fontSize: 13, color: "#374151", lineHeight: 19 },
  addressMeta: { fontSize: 12, color: "#6B7280", marginTop: 4 },

  noAddressWrap: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  noAddressTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 12,
    marginBottom: 16,
  },
  addAddressBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#008E97",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addAddressBtnText: { color: "#FFFFFF", fontWeight: "700" },

  addMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    marginTop: 4,
  },
  addMoreText: { color: "#008E97", fontWeight: "700", fontSize: 13 },

  // Option card (delivery / payment)
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },
  optionCardSelected: {
    borderColor: "#008E97",
    backgroundColor: "#F0FDFA",
  },
  optionTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  optionSubtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  infoBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#FEF3C7",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 12,
    color: "#92400E",
    lineHeight: 17,
  },

  // Summary cards (step 3)
  summaryCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    marginBottom: 12,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  summaryHeaderText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#008E97",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryName: { fontSize: 14, fontWeight: "800", color: "#111827" },
  summaryLine: { fontSize: 13, color: "#374151", marginTop: 2, lineHeight: 19 },
  summaryMeta: { fontSize: 12, color: "#6B7280", marginTop: 6 },

  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  summaryItemName: { flex: 1, fontSize: 13, color: "#374151", marginRight: 8 },
  summaryItemMeta: { fontSize: 12, fontWeight: "600", color: "#111827" },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  summaryRowLabel: { fontSize: 13, color: "#6B7280" },
  summaryRowValue: { fontSize: 13, fontWeight: "600", color: "#111827" },
  summaryDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  summaryTotalLabel: { fontSize: 15, fontWeight: "800", color: "#111827" },
  summaryTotalValue: { fontSize: 17, fontWeight: "800", color: "#C60C30" },

  // Bottom bar
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 26,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomLabel: { fontSize: 11, color: "#6B7280", fontWeight: "600" },
  bottomTotal: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },
  primaryBtn: {
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
  primaryBtnPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  primaryBtnText: { fontSize: 15, fontWeight: "800", color: "#111827" },

  // Empty state
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F1F3F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: "#008E97",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  emptyButtonText: { color: "#FFFFFF", fontWeight: "700" },
});

export default ConfirmationScreen;
