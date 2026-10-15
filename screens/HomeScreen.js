import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
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
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import ProductItem from "../components/ProductItem";
import { AppContext } from "../UserContext";

const SLIDER_WIDTH = Dimensions.get("window").width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, fetchAddress, addresses } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);

  const cart = useSelector((state) => state.cart.cart);

  // ─── Data: fetch products from FakeStore API ───
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Product fetch error:", error);
      }
    };
    fetchData();
  }, []);

  // ─── Data: fetch addresses when logged in ───
  useEffect(() => {
    if (userId) fetchAddress();
  }, [userId, modalVisible]);

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#00CED1" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          {/* ─── Search Bar ─── */}
          <View style={styles.searchBar}>
            <View style={styles.searchInput}>
              <AntDesign
                name="search"
                size={20}
                color="#6B7280"
                style={{ paddingLeft: 10 }}
              />
              <TextInput
                placeholder="Search Amazon.in"
                placeholderTextColor="#9CA3AF"
                style={styles.searchText}
              />
            </View>
            <Pressable hitSlop={8}>
              <Feather name="mic" size={24} color="#000" />
            </Pressable>
          </View>

          {/* ─── Delivery Address Bar ─── */}
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.addressBar}
          >
            <Ionicons name="location-outline" size={22} color="#000" />
            {selectedAddress ? (
              <Text style={styles.addressText} numberOfLines={1}>
                Deliver to {selectedAddress.name} - {selectedAddress.street}
              </Text>
            ) : (
              <Text style={styles.addressText}>Add an Address</Text>
            )}
            <MaterialIcons name="keyboard-arrow-down" size={22} color="#000" />
          </Pressable>

          {/* ─── Category Row ─── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((item) => (
              <Pressable key={item.id} style={styles.categoryItem}>
                <Image source={item.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* ─── Hero Carousel ─── */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {heroImages.map((source, index) => (
              <Image
                key={index}
                source={source}
                style={{
                  width: SLIDER_WIDTH,
                  height: 200,
                  resizeMode: "cover",
                }}
              />
            ))}
          </ScrollView>

          {/* ─── Trending Deals ─── */}
          <Text style={styles.sectionTitle}>Trending Deals of the Week</Text>
          <View style={styles.trendingGrid}>
            {deals.map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    carouselImages: item.carouselImages,
                    color: item.color,
                    size: item.size,
                    oldPrice: item.oldPrice,
                    item,
                  })
                }
                style={styles.trendingItem}
              >
                <Image
                  source={item.image}
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.divider} />

          {/* ─── Today's Deals ─── */}
          <Text style={styles.sectionTitle}>Today's Deals</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          >
            {offers.map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    carouselImages: item.carouselImages,
                    color: item.color,
                    size: item.size,
                    oldPrice: item.oldPrice,
                    item,
                  })
                }
                style={styles.offerItem}
              >
                <Image
                  source={item.image}
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                />
                <View style={styles.offerBadge}>
                  <Text style={styles.offerText}>Upto {item.offer}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.divider} />

          {/* ─── Category Picker ─── */}
          <View style={{ marginHorizontal: 10, marginTop: 20, zIndex: 10 }}>
            <DropDownPicker
              style={styles.dropdown}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Choose a category"
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          {/* ─── Product Grid ─── */}
          <View style={styles.productGrid}>
            {products
              ?.filter((item) => item.category === category)
              .map((item) => (
                <ProductItem item={item} key={item.id} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* ─── Address Modal ─── */}
      {/* <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
      > */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0, alignItems: "center" }}
      >
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>Choose your Location</Text>
          <Text style={styles.modalSubtitle}>
            Select a delivery location to see product availability
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedAddress(item)}
                style={[
                  styles.addressCard,
                  selectedAddress === item && styles.addressCardSelected,
                ]}
              >
                <View style={styles.addressCardHeader}>
                  <Text style={styles.addressCardName}>{item?.name}</Text>
                  <Entypo name="location-pin" size={20} color="red" />
                </View>
                <Text numberOfLines={1} style={styles.addressCardLine}>
                  {item?.houseNo}, {item?.landmark}
                </Text>
                <Text numberOfLines={1} style={styles.addressCardLine}>
                  {item?.street}
                </Text>
                <Text numberOfLines={1} style={styles.addressCardLine}>
                  India, Bangalore
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("AddressList");
              }}
              style={[styles.addressCard, styles.addressCardAdd]}
            >
              <Text style={styles.addressCardAddText}>
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ marginTop: 20, gap: 12 }}>
            <ModalRow
              icon={<Entypo name="location-pin" size={20} color="#0066b2" />}
              label="Enter an Indian pincode"
            />
            <ModalRow
              icon={<Ionicons name="locate-sharp" size={20} color="#0066b2" />}
              label="Use My Current Location"
            />
            <ModalRow
              icon={<AntDesign name="earth" size={20} color="#0066b2" />}
              label="Deliver outside India"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const ModalRow = ({ icon, label }) => (
  <View style={styles.modalRow}>
    {icon}
    <Text style={styles.modalRowText}>{label}</Text>
  </View>
);

// ─── Static content — now with LOCAL images ───
const categories = [
  {
    id: "0",
    image: require("../assets/images/category-home.jpg"),
    name: "Home",
  },
  {
    id: "1",
    image: require("../assets/images/category-deals.jpg"),
    name: "Deals",
  },
  {
    id: "3",
    image: require("../assets/images/category-electronics.jpg"),
    name: "Electronics",
  },
  {
    id: "4",
    image: require("../assets/images/category-mobiles.jpg"),
    name: "Mobiles",
  },
  {
    id: "5",
    image: require("../assets/images/category-music.jpg"),
    name: "Music",
  },
  {
    id: "6",
    image: require("../assets/images/category-fashion.jpg"),
    name: "Fashion",
  },
];

const heroImages = [
  require("../assets/images/hero-1.jpg"),
  require("../assets/images/hero-2.jpg"),
  require("../assets/images/hero-3.jpg"),
];

const deals = [
  {
    id: "20",
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
    oldPrice: 25000,
    price: 19000,
    image: require("../assets/images/deal-1.jpg"),
    carouselImages: [
      "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
      "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
    ],
    color: "Stellar Green",
    size: "6 GB RAM 128GB Storage",
  },
  {
    id: "30",
    title:
      "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
    oldPrice: 74000,
    price: 26000,
    image: require("../assets/images/deal-2.jpg"),
    carouselImages: [
      "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
      "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
    ],
    color: "Cloud Navy",
    size: "8 GB RAM 128GB Storage",
  },
  {
    id: "40",
    title:
      "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
    oldPrice: 16000,
    price: 14000,
    image: require("../assets/images/deal-3.jpg"),
    carouselImages: [
      "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
    ],
    color: "Icy Silver",
    size: "6 GB RAM 64GB Storage",
  },
  {
    id: "41",
    title:
      "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
    oldPrice: 12999,
    price: 10999,
    image: require("../assets/images/deal-4.jpg"),
    carouselImages: [
      "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
    ],
    color: "Prime Blue",
    size: "4GB+64GB",
  },
];

const offers = [
  {
    id: "0",
    title:
      "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
    offer: "72% off",
    oldPrice: 7500,
    price: 4500,
    image: require("../assets/images/offer-1.webp"),
    carouselImages: [
      "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
    ],
    color: "Green",
    size: "Normal",
  },
  {
    id: "1",
    title:
      "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display|NitroFast Charging|110+ Sports Modes|Upto 7 Days Battery",
    offer: "40%",
    oldPrice: 7955,
    price: 3495,
    image: require("../assets/images/offer-2.jpg"),
    carouselImages: [
      "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
    ],
    color: "Black",
    size: "Normal",
  },
  {
    id: "2",
    title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
    offer: "40%",
    oldPrice: 7955,
    price: 3495,
    image: require("../assets/images/offer-3.jpg"),
    carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
    color: "Black",
    size: "Normal",
  },
  {
    id: "3",
    title:
      "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display",
    offer: "40%",
    oldPrice: 24999,
    price: 19999,
    image: require("../assets/images/offer-4.jpg"),
    carouselImages: [
      "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
    ],
    color: "Norway Blue",
    size: "8GB RAM, 128GB Storage",
  },
];

// ─── Styles (unchanged) ───
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },

  searchBar: {
    backgroundColor: "#00CED1",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 6,
    height: 40,
    flex: 1,
  },
  searchText: {
    flex: 1,
    paddingHorizontal: 8,
    color: "#111827",
    fontSize: Platform.OS === "web" ? 16 : 14,
  },
  // searchText: { flex: 1, paddingHorizontal: 8, color: "#111827" },

  addressBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
    backgroundColor: "#AFEEEE",
  },
  addressText: { fontSize: 13, fontWeight: "500", color: "#111827" },

  categoryRow: { paddingHorizontal: 8, paddingVertical: 8 },
  categoryItem: {
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryImage: { width: 50, height: 50, resizeMode: "contain" },
  categoryText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    color: "#111827",
  },

  sectionTitle: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  trendingGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  trendingItem: { marginVertical: 10, width: "48%", alignItems: "center" },

  divider: {
    height: 1,
    backgroundColor: "#D0D0D0",
    marginVertical: 15,
    marginHorizontal: 10,
  },

  offerItem: {
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  offerBadge: {
    backgroundColor: "#E31837",
    paddingVertical: 5,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
  },
  offerText: { color: "white", fontSize: 13, fontWeight: "700" },

  dropdown: { borderColor: "#B7B7B7", height: 40 },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    paddingHorizontal: 8,
  },

  // modalBody: {
  //   backgroundColor: "white",
  //   padding: 20,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   maxHeight: 480,
  // },
  modalBody: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 480,
    width: Platform.OS === "web" ? 480 : "100%",
    alignSelf: "center",
  },
  modalTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  modalSubtitle: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
    marginBottom: 12,
  },
  addressCard: {
    width: 140,
    height: 140,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    marginRight: 12,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  addressCardSelected: { backgroundColor: "#FBCEB1", borderColor: "#0066b2" },
  addressCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addressCardName: { fontSize: 13, fontWeight: "700", color: "#111827" },
  addressCardLine: {
    width: 130,
    fontSize: 12,
    textAlign: "center",
    color: "#374151",
  },
  addressCardAdd: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressCardAddText: {
    textAlign: "center",
    color: "#0066b2",
    fontWeight: "600",
    fontSize: 13,
  },
  modalRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  modalRowText: { color: "#0066b2", fontWeight: "500" },
});

export default HomeScreen;
