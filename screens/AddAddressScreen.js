import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const { addresses, fetchAddress } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [defaultId, setDefaultId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      await fetchAddress();
    } catch (e) {
      console.log("load error:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, []),
  );

  const handleRemove = (item) => {
    const addressId = item._id;
    if (!addressId) {
      return Alert.alert("Error", "Cannot remove — invalid address id");
    }

    Alert.alert("Remove Address", `Remove the address for ${item.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            setDeletingId(addressId);
            await api.delete(`/addresses/${addressId}`);
            await fetchAddress();
            if (defaultId === addressId) setDefaultId(null);
          } catch (err) {
            Alert.alert("Error", err.message || "Failed to remove address");
          } finally {
            setDeletingId(null);
          }
        },
      },
    ]);
  };

  const handleEdit = (item) => {
    if (!item._id) {
      return Alert.alert("Error", "Cannot edit — invalid address id");
    }
    navigation.navigate("AddressForm", {
      edit: true,
      addressId: item._id,
      address: item,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <MaterialIcons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>Your Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

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
        {/* Add new */}
        <Pressable
          onPress={() => navigation.navigate("AddressForm")}
          style={({ pressed }) => [
            styles.addNewCard,
            pressed && { opacity: 0.9 },
          ]}
        >
          <View style={styles.addIconWrap}>
            <Feather name="plus" size={20} color="#008E97" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.addNewTitle}>Add a new address</Text>
            <Text style={styles.addNewSubtitle}>Deliver to a new location</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#9CA3AF"
          />
        </Pressable>

        {/* Loading */}
        {loading && !addresses?.length && (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#008E97" />
            <Text style={styles.centerText}>Loading addresses…</Text>
          </View>
        )}

        {/* Empty state */}
        {!loading && !addresses?.length && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Entypo name="location-pin" size={40} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyTitle}>No addresses yet</Text>
            <Text style={styles.emptySubtitle}>
              Add your first delivery address to get started
            </Text>
          </View>
        )}

        {/* Address cards */}
        {addresses?.map((item) => {
          const isDefault = defaultId === item._id;
          const isDeleting = deletingId === item._id;

          return (
            <View key={item._id} style={styles.card}>
              {/* Card header */}
              <View style={styles.cardHeader}>
                <View style={styles.avatarWrap}>
                  <Text style={styles.avatarText}>
                    {item.name?.[0]?.toUpperCase() ?? "?"}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.cardName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    {isDefault && (
                      <View style={styles.defaultPill}>
                        <Text style={styles.defaultPillText}>DEFAULT</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardPhone}>{item.mobileNo}</Text>
                </View>
                <Entypo name="location-pin" size={22} color="#EF4444" />
              </View>

              <View style={styles.cardDivider} />

              {/* Address lines */}
              <View style={styles.cardBody}>
                <Text style={styles.cardLine} numberOfLines={2}>
                  {item.houseNo}, {item.landmark}
                </Text>
                <Text style={styles.cardLine} numberOfLines={1}>
                  {item.street}
                </Text>
                <Text style={styles.cardLine}>
                  {item.city ?? "Bangalore"}, {item.country ?? "India"} —{" "}
                  {item.postalCode}
                </Text>
              </View>

              {/* Actions */}
              <View style={styles.actionsRow}>
                <Pressable
                  disabled={isDeleting}
                  style={({ pressed }) => [
                    styles.actionBtn,
                    pressed && styles.actionBtnPressed,
                    isDeleting && { opacity: 0.5 },
                  ]}
                  onPress={() => handleEdit(item)}
                >
                  <Feather name="edit-2" size={14} color="#374151" />
                  <Text style={styles.actionText}>Edit</Text>
                </Pressable>

                <Pressable
                  disabled={isDeleting}
                  style={({ pressed }) => [
                    styles.actionBtn,
                    pressed && styles.actionBtnPressed,
                    isDeleting && { opacity: 0.5 },
                  ]}
                  onPress={() => handleRemove(item)}
                >
                  {isDeleting ? (
                    <ActivityIndicator size="small" color="#DC2626" />
                  ) : (
                    <>
                      <Feather name="trash-2" size={14} color="#DC2626" />
                      <Text style={[styles.actionText, { color: "#DC2626" }]}>
                        Remove
                      </Text>
                    </>
                  )}
                </Pressable>

                <Pressable
                  disabled={isDeleting}
                  style={({ pressed }) => [
                    styles.actionBtn,
                    pressed && styles.actionBtnPressed,
                    isDeleting && { opacity: 0.5 },
                  ]}
                  onPress={() => setDefaultId(isDefault ? null : item._id)}
                >
                  <Feather name="check-circle" size={14} color="#374151" />
                  <Text style={styles.actionText}>
                    {isDefault ? "Default" : "Set Default"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

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
  headerTitle: { fontSize: 17, fontWeight: "800", color: "#111827" },

  scrollContent: { padding: 16, paddingBottom: 40 },

  // Add new card
  addNewCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#008E97",
    borderStyle: "dashed",
    marginBottom: 16,
  },
  addIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  addNewTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  addNewSubtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  // Center states
  centerState: { padding: 40, alignItems: "center" },
  centerText: { marginTop: 12, color: "#6B7280", fontSize: 13 },

  emptyState: { alignItems: "center", paddingVertical: 40 },
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
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 30,
  },

  // Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 16, fontWeight: "800", color: "#008E97" },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardName: { fontSize: 15, fontWeight: "800", color: "#111827" },
  cardPhone: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  defaultPill: {
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultPillText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#008E97",
    letterSpacing: 0.5,
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#F1F3F5",
    marginVertical: 10,
  },

  cardBody: { gap: 3 },
  cardLine: { fontSize: 13, color: "#374151", lineHeight: 18 },

  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
  },
  actionBtn: {
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
  actionBtnPressed: { backgroundColor: "#F9FAFB" },
  actionText: { fontSize: 12, fontWeight: "600", color: "#374151" },
});

export default AddAddressScreen;
