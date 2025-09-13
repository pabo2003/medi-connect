import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PharmacyHeartIcon from './PharmacyHeartIcon';

const { width, height } = Dimensions.get("window");

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (isLoading) return;
    
    setIsLoading(true);
    await login(email, password)
      .then((res) => {
        console.log(res);
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Login failed", "Invalid email or password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LinearGradient
      colors={["#00033D", "#0600AB", "#0033FF"]}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {/* Logo/Header Section */}
            <LinearGradient
              colors={["#977DFF", "#F2E6EE"]}
              style={styles.logoContainer}
            >
              <PharmacyHeartIcon size={60} color="#00033D" />
              <Text style={styles.appName}>Medi Connect</Text>
              <Text style={styles.tagline}>Your Health, Our Priority</Text>
            </LinearGradient>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.instructionText}>
                Sign in to access your account
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#977DFF" style={styles.inputIcon} />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#977DFF" style={styles.inputIcon} />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable 
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={secureTextEntry ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#977DFF" 
                  />
                </Pressable>
              </View>

              <Pressable 
                onPress={() => Alert.alert("Info", "Forgot password feature would be implemented here")}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="large" />
                ) : (
                  <LinearGradient
                    colors={["#0033FF", "#977DFF"]}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.loginButtonText}>Login</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  </LinearGradient>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable 
                style={styles.signupContainer}
                onPress={() => router.push("/register")}
              >
                <Text style={styles.signupText}>
                  Don't have an account?{" "}
                  <Text style={styles.signupLink}>Register Now</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  tagline: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    opacity: 0.8,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00033D",
    textAlign: "center",
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#1F2937",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#0033FF",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    height: 55,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    color: "#6B7280",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  signupContainer: {
    alignItems: "center",
  },
  signupText: {
    color: "#4B5563",
    fontSize: 15,
  },
  signupLink: {
    color: "#0033FF",
    fontWeight: "bold",
  },
});

export default Login;