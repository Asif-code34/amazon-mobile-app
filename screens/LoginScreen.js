import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "../services/axios";
import { useAuth } from "../UserContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      return Alert.alert("Missing fields", "Please enter email and password.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Alert.alert(
        "Invalid email",
        "Please enter a valid email address.",
      );
    }

    try {
      setLoading(true);
      const response = await api.post("/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, user } = response.data;

      // Save token + userId → StackNavigator auto-swaps to Main
      await signIn(token, user.id);
    } catch (err) {
      Alert.alert(
        "Login Failed",
        err.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ─── Logo ─── */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCard}>
              <Image
                style={styles.logo}
                source={{
                  uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* ─── Header ─── */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to continue shopping with us
            </Text>
          </View>

          {/* ─── Form ─── */}
          <View style={styles.formContainer}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View
                style={[
                  styles.inputContainer,
                  emailFocused && styles.inputContainerFocused,
                ]}
              >
                <MaterialIcons
                  name="email"
                  size={21}
                  color={emailFocused ? "#008E97" : "#9CA3AF"}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  keyboardType="email-address"
                  placeholder="you@example.com"
                  placeholderTextColor="#9CA3AF"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  returnKeyType="next"
                  editable={!loading}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <Pressable hitSlop={8}>
                  <Text style={styles.forgotInline}>Forgot?</Text>
                </Pressable>
              </View>

              <View
                style={[
                  styles.inputContainer,
                  passwordFocused && styles.inputContainerFocused,
                ]}
              >
                <MaterialIcons
                  name="lock-outline"
                  size={21}
                  color={passwordFocused ? "#008E97" : "#9CA3AF"}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  editable={!loading}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  hitSlop={10}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={21}
                    color="#6B7280"
                  />
                </Pressable>
              </View>
            </View>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => [
                styles.loginButton,
                (pressed || loading) && styles.loginButtonPressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={21}
                    color="#FFFFFF"
                  />
                </>
              )}
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            {/* Register */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account?</Text>
              <Pressable
                onPress={() => navigation.navigate("Register")}
                hitSlop={8}
                disabled={loading}
              >
                <Text style={styles.registerLink}> Sign Up</Text>
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            By continuing, you agree to our{" "}
            <Text style={styles.footerLink}>Terms</Text> &{" "}
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 5,
  },

  logoCard: {
    width: 150,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 145,
    height: 85,
  },

  header: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 32,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },

  formContainer: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },

  inputGroup: {
    marginBottom: 20,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 2,
    marginRight: 2,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginLeft: 2,
  },

  forgotInline: {
    fontSize: 13,
    fontWeight: "600",
    color: "#008E97",
    marginBottom: 8,
  },

  inputContainer: {
    height: 56,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  inputContainerFocused: {
    borderColor: "#008E97",
    shadowColor: "#008E97",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },

  inputIcon: {
    marginRight: 11,
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#111827",
    fontSize: 15,
    paddingVertical: 0,
  },

  eyeButton: {
    width: 38,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -5,
  },

  loginButton: {
    height: 55,
    borderRadius: 12,
    backgroundColor: "#FEBE10",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
    shadowColor: "#FEBE10",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  loginButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  dividerText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    marginHorizontal: 12,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  registerText: {
    fontSize: 14,
    color: "#6B7280",
  },

  registerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#008E97",
  },

  footerText: {
    marginTop: "auto",
    paddingTop: 35,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 17,
    color: "#9CA3AF",
  },

  footerLink: {
    color: "#008E97",
    fontWeight: "600",
  },
};

export default LoginScreen;
