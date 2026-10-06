// import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { useState } from "react";
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
// const RegisterScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const navigation = useNavigation();

//   const handleRegister = () => {
//     const user = {
//       name: name.trim(),
//       email: email.trim().toLowerCase(),
//       password: password,
//     };

//     // send a POST  request to the backend API to register the user
//     axios
//       .post("http://172.20.10.3:8000/register", user)
//       .then((response) => {
//         console.log(response);
//         Alert.alert(
//           "Registration successful",
//           "You have been registered Successfully"
//         );
//         setName("");
//         setEmail("");
//         setPassword("");
//       })
//       .catch((error) => {
//         Alert.alert(
//           "Registration Error",
//           "An error occurred while registering"
//         );
//         console.log("registration failed", error);
//       });
//   };

//   {
//     /*} const handleRegister = async () => {
//     try {
//       const payload = {
//         name: name.trim(),
//         email: email.trim().toLowerCase(),
//         password: password,
//       };

//       // ✅ Confirm this is the only object you're sending
//       console.log("Payload:", payload);

//       const response = await axios.post(
//         "http://172.20.10.2:8000/register",
//         payload
//       );

//       console.log("Response:", response.data);
//       Alert.alert("Success", "Registered successfully");
//     } catch (err) {
//       console.log("REGISTER ERROR ===>", err.response?.data || err.message);
//       Alert.alert(
//         "Error",
//         err.response?.data?.message || "Registration failed"
//       );
//     }
//   };   */
//   }

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
//             Register to your Account
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
//             <Ionicons
//               name="ios-person"
//               size={24}
//               color="gray"
//               style={{ marginLeft: 8 }}
//             />
//             <TextInput
//               value={name}
//               onChangeText={(text) => setName(text)}
//               style={{
//                 color: "gray",
//                 marginVertical: 10,
//                 width: 300,
//                 fontSize: name ? 16 : 16,
//               }}
//               placeholder="enter your name"
//             />
//           </View>
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
//                 fontSize: password ? 16 : 16,
//               }}
//               autoCapitalize="none"
//               keyboardType="email-address"
//               placeholder="enter your Email"
//             />
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               backgroundColor: "#D0D0D0",
//               borderRadius: 5,
//               paddingVertical: 5,
//               marginTop: 30,
//               gap: 5,
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
//               secureTextEntry={true}
//               placeholder="enter your password"
//               style={{
//                 color: "gray",
//                 marginVertical: 10,
//                 width: 300,
//                 fontSize: password ? 16 : 16,
//               }}
//             ></TextInput>
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
//         <View style={{ marginTop: 60 }} />

//         <Pressable
//           onPress={handleRegister}
//           style={{
//             width: 200,
//             backgroundColor: "#FEBE10",
//             borderRadius: 6,
//             marginLeft: "auto",
//             marginRight: "auto",
//             padding: 15,
//           }}
//         >
//           <Text
//             style={{
//               textAlign: "center",
//               color: "white",
//               fontSize: 16,
//               fontWeight: "bold",
//             }}
//           >
//             Register
//           </Text>
//         </Pressable>

//         <Pressable
//           onPress={() => navigation.goBack()}
//           style={{ marginTop: 15 }}
//         >
//           <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
//             Already have an account? Sign In
//           </Text>
//         </Pressable>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
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

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  // UI-only states
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
    };

    // send a POST request to the backend API to register the user
    axios
      .post("http://172.20.10.3:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully",
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering",
        );
        console.log("registration failed", error);
      });
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
            <Text style={styles.title}>Create Account</Text>

            <Text style={styles.subtitle}>
              Sign up to get started with your account
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>

              <View
                style={[
                  styles.inputContainer,
                  nameFocused && styles.inputContainerFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={21}
                  color={nameFocused ? "#007FFF" : "#6B7280"}
                  style={styles.inputIcon}
                />

                <TextInput
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                  autoCorrect={false}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  returnKeyType="next"
                />
              </View>
            </View>

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
                  secureTextEntry={!showPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  returnKeyType="done"
                />

                {/* Show / Hide Password */}
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

            {/* Existing UI options */}
            <View style={styles.optionsRow}>
              <Pressable style={styles.keepLoggedIn}>
                <View style={styles.checkbox} />
                <Text style={styles.keepLoggedText}>Keep me logged in</Text>
              </Pressable>

              <Pressable>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Register Button */}
            <Pressable
              onPress={handleRegister}
              style={({ pressed }) => [
                styles.registerButton,
                pressed && styles.registerButtonPressed,
              ]}
            >
              <Text style={styles.registerButtonText}>Create Account</Text>

              <MaterialIcons name="arrow-forward" size={21} color="#FFFFFF" />
            </Pressable>

            {/* Login */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>

              <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
                <Text style={styles.loginLink}> Sign In</Text>
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            By creating an account, you agree to our Terms & Privacy Policy
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
    paddingTop: 20,
    paddingBottom: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 5,
  },

  logoCard: {
    width: 150,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 145,
    height: 80,
  },

  header: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 28,
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
    lineHeight: 20,
  },

  formContainer: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },

  inputGroup: {
    marginBottom: 18,
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

    shadowColor: "#007FFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    marginTop: 1,
    marginBottom: 25,
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

  registerButton: {
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

  registerButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  loginText: {
    fontSize: 14,
    color: "#6B7280",
  },

  loginLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#007FFF",
  },

  footerText: {
    marginTop: "auto",
    paddingTop: 30,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 17,
    color: "#9CA3AF",
  },
};

export default RegisterScreen;
