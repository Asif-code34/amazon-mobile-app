// import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Pressable,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigation = useNavigation();
//   const [checkingLogin, setCheckingLogin] = useState(true);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const token = await AsyncStorage.getItem("token");
//         if (token) {
//           navigation.replace("Main");
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setCheckingLogin(false); // ✅ Mark check as done
//       }
//     };
//     checkLoginStatus();
//   }, []);

//   if (checkingLogin) {
//     return null; // 👈 Or show loading spinner
//   }

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://172.20.10.3:8000/login", {
//         email: email.trim().toLowerCase(),
//         password: password,
//       });

//       const { token, user } = response.data;
//       await AsyncStorage.setItem("token", token);

//       Alert.alert("Success", "Login successful");
//       console.log("Logged in user:", user);

//       // Navigate to home screen or dashboard
//       navigation.replace("Main");
//     } catch (err) {
//       console.log("LOGIN ERROR ===>", err.response?.data || err.message);
//       Alert.alert("Error", err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: "white",
//         alignItems: "center",
//         marginTop: 50,
//       }}
//     >
//       <View>
//         <Image
//           style={{ width: 150, height: 100 }}
//           source={{
//             uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
//           }}
//         />
//       </View>
//       <KeyboardAvoidingView>
//         <View style={{ alignItems: "center" }}>
//           <Text
//             style={{
//               fontSize: 17,
//               fontWeight: "bold",
//               marginTop: 12,
//               color: "#041E42",
//             }}
//           >
//             {" "}
//             Login In to your Account
//           </Text>
//         </View>

//         <View style={{ marginTop: 70 }}>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               gap: 5,
//               backgroundColor: "#D0D0D0",
//               paddingVertical: 5,
//               borderRadius: 5,
//               marginTop: 30,
//             }}
//           >
//             <MaterialIcons
//               style={{ marginLeft: 8 }}
//               name="email"
//               size={24}
//               color="gray"
//             />

//             <TextInput
//               value={email}
//               onChangeText={(text) => setEmail(text)}
//               style={{
//                 color: "gray",
//                 marginVertical: 10,
//                 width: 300,
//                 fontSize: email ? 16 : 16,
//               }}
//               autoCapitalize="none"
//               keyboardType="email-address"
//               placeholder="enter your Email"
//             />
//           </View>
//         </View>

//         <View style={{ marginTop: 30 }}>
//           <View
//             style={{
//               flexDirection: "row",
//               borderRadius: 5,
//               paddingVertical: 5,
//               gap: 5,
//               backgroundColor: "#D0D0D0",
//               alignItems: "center",
//             }}
//           >
//             <AntDesign
//               name="lock1"
//               size={24}
//               color="gray"
//               style={{ marginLeft: 8 }}
//             />
//             <TextInput
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//               style={{
//                 color: "gray",
//                 width: 300,
//                 marginVertical: 10,
//                 fontSize: password ? 16 : 16,
//               }}
//               placeholder="enter your password"
//               secureTextEntry={true}
//             />
//           </View>
//         </View>

//         <View
//           style={{
//             marginTop: 12,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Text>Keep me logged in</Text>

//           <Text style={{ color: "#007FFF", fontWeight: "500" }}>
//             Forgot Password
//           </Text>
//         </View>
//         <View style={{ marginTop: 80 }}>
//           <Pressable
//             onPress={handleLogin}
//             style={{
//               backgroundColor: "#FEBE10",
//               borderRadius: 6,
//               width: 200,
//               marginLeft: "auto",
//               marginRight: "auto",
//               padding: 15,
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 color: "white",
//                 fontSize: 16,
//                 fontWeight: "bold",
//               }}
//             >
//               Login
//             </Text>
//           </Pressable>
//           <Pressable
//             onPress={() => navigation.navigate("Register")}
//             style={{ marginTop: 15 }}
//           >
//             <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
//               Dont have an account? Sign Up
//             </Text>
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [checkingLogin, setCheckingLogin] = useState(true);

  // UI-only states
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCheckingLogin(false); // ✅ Mark check as done
      }
    };
    checkLoginStatus();
  }, []);

  if (checkingLogin) {
    return null; // 👈 Or show loading spinner
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://172.20.10.3:8000/login", {
        email: email.trim().toLowerCase(),
        password: password,
      });

      const { token, user } = response.data;
      await AsyncStorage.setItem("token", token);

      Alert.alert("Success", "Login successful");
      console.log("Logged in user:", user);

      // Navigate to home screen or dashboard
      navigation.replace("Main");
    } catch (err) {
      console.log("LOGIN ERROR ===>", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.message || "Login failed");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
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

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Login to your account to continue
            </Text>
          </View>

          {/* Form */}
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
                  color={emailFocused ? "#007FFF" : "#6B7280"}
                  style={styles.inputIcon}
                />

                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>

              <View
                style={[
                  styles.inputContainer,
                  passwordFocused && styles.inputContainerFocused,
                ]}
              >
                {/* Password lock icon */}
                <MaterialIcons
                  name="lock-outline"
                  size={21}
                  color={passwordFocused ? "#007FFF" : "#6B7280"}
                  style={styles.inputIcon}
                />

                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  returnKeyType="done"
                />

                {/* Show / Hide password */}
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

            {/* Options */}
            <View style={styles.optionsRow}>
              <Pressable style={styles.keepLoggedIn}>
                <View style={styles.checkbox} />
                <Text style={styles.keepLoggedText}>Keep me logged in</Text>
              </Pressable>

              <Pressable>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}
            >
              <Text style={styles.loginButtonText}>Login</Text>
              <MaterialIcons name="arrow-forward" size={21} color="#FFFFFF" />
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
              >
                <Text style={styles.registerLink}> Sign Up</Text>
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy Policy
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

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginLeft: 2,
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  inputContainerFocused: {
    borderColor: "#007FFF",
    shadowOpacity: 0.08,
    shadowRadius: 5,
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

  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 28,
  },

  keepLoggedIn: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    marginRight: 8,
  },

  keepLoggedText: {
    fontSize: 13,
    color: "#6B7280",
  },

  forgotPassword: {
    fontSize: 13,
    fontWeight: "600",
    color: "#007FFF",
  },

  loginButton: {
    height: 55,
    borderRadius: 12,
    backgroundColor: "#FEBE10",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#FEBE10",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  loginButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
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
    color: "#007FFF",
  },

  footerText: {
    marginTop: "auto",
    paddingTop: 35,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 17,
    color: "#9CA3AF",
  },
};

export default LoginScreen;
