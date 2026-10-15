import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
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
import api from "../services/axios";
import { useAuth } from "../UserContext";

const AddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fetchAddress } = useAuth();

  const isEdit = route.params?.edit === true;
  const addressId = route.params?.addressId;
  const initial = route.params?.address;

  const [name, setName] = useState(initial?.name ?? "");
  const [mobileNo, setMobileNo] = useState(initial?.mobileNo ?? "");
  const [houseNo, setHouseNo] = useState(initial?.houseNo ?? "");
  const [street, setStreet] = useState(initial?.street ?? "");
  const [landmark, setLandmark] = useState(initial?.landmark ?? "");
  const [postalCode, setPostalCode] = useState(initial?.postalCode ?? "");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim()) return "Please enter full name";
    if (!/^\d{10}$/.test(mobileNo.trim()))
      return "Mobile number must be 10 digits";
    if (!houseNo.trim()) return "Please enter house / building";
    if (!street.trim()) return "Please enter street / sector";
    if (!landmark.trim()) return "Please enter a landmark";
    if (!/^\d{6}$/.test(postalCode.trim())) return "Pincode must be 6 digits";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) return Alert.alert("Invalid input", error);

    const address = {
      name: name.trim(),
      mobileNo: mobileNo.trim(),
      houseNo: houseNo.trim(),
      street: street.trim(),
      landmark: landmark.trim(),
      postalCode: postalCode.trim(),
      city: "Bangalore",
      country: "India",
    };

    try {
      setLoading(true);

      if (isEdit) {
        await api.put(`/addresses/${addressId}`, { address });
      } else {
        await api.post("/addresses", { address });
      }

      await fetchAddress();

      Alert.alert(
        "Success",
        isEdit ? "Address updated" : "Address added successfully",
        [{ text: "OK", onPress: () => navigation.goBack() }],
      );
    } catch (err) {
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <MaterialIcons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {isEdit ? "Edit Address" : "Add New Address"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.countryBar}>
            <MaterialIcons name="public" size={18} color="#00695C" />
            <Text style={styles.countryText}>Delivering to India</Text>
          </View>

          <FormField
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            icon="person-outline"
            editable={!loading}
          />
          <FormField
            label="Mobile Number"
            value={mobileNo}
            onChangeText={setMobileNo}
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
            maxLength={10}
            icon="phone"
            editable={!loading}
          />
          <FormField
            label="House No, Building"
            value={houseNo}
            onChangeText={setHouseNo}
            placeholder="Flat / House no / Building name"
            icon="home"
            editable={!loading}
          />
          <FormField
            label="Street, Sector, Village"
            value={street}
            onChangeText={setStreet}
            placeholder="Street / area / village"
            icon="map"
            editable={!loading}
          />
          <FormField
            label="Landmark"
            value={landmark}
            onChangeText={setLandmark}
            placeholder="Nearby landmark"
            icon="place"
            editable={!loading}
          />
          <FormField
            label="Pincode"
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="6-digit pincode"
            keyboardType="number-pad"
            maxLength={6}
            icon="location-on"
            editable={!loading}
          />

          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            style={({ pressed }) => [
              styles.submitButton,
              (pressed || loading) && styles.submitButtonPressed,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <>
                <MaterialIcons
                  name={isEdit ? "save" : "check-circle"}
                  size={20}
                  color="#111827"
                />
                <Text style={styles.submitButtonText}>
                  {isEdit ? "Update Address" : "Add Address"}
                </Text>
              </>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── Reusable input field ───
const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  keyboardType,
  maxLength,
  editable = true,
}) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldInputWrap}>
      <MaterialIcons
        name={icon}
        size={20}
        color="#9CA3AF"
        style={{ marginRight: 10 }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
        style={styles.fieldInput}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F8FA" },

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
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },

  scrollContent: { padding: 16, paddingBottom: 40 },

  countryBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E0F2F1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  countryText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#00695C",
  },

  fieldWrap: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginLeft: 2,
  },
  fieldInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  fieldInput: {
    flex: 1,
    fontSize: Platform.OS === "web" ? 16 : 15,
    // fontSize: 15,
    color: "#111827",
    paddingVertical: 0,
  },

  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFD814",
    height: 54,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: "#FFD814",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },
});

export default AddressScreen;
