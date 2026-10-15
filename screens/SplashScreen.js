import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
          resizeMode="contain"
        />
        <Text style={styles.brand}>Amazon</Text>
        <Text style={styles.tagline}>Shop smart. Live better.</Text>
      </View>

      <View style={styles.loaderWrap}>
        <ActivityIndicator size="small" color="#008E97" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  center: { alignItems: "center" },
  logo: { width: 200, height: 120 },
  brand: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
    marginTop: 8,
  },
  tagline: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
    fontWeight: "500",
  },
  loaderWrap: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
});

export default SplashScreen;
