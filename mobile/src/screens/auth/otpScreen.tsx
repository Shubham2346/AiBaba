import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { auth } from "../../services/firebase/firebaseConfig";
import firebaseConfig from "../../services/firebase/firebaseConfig";


const OTPScreen = ({ navigation, route }: any) => {
  const phoneNumber = route?.params?.phoneNumber;
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    sendOtp();
  }, []);

  useEffect(() => {
    if (timer === 0) setCanResend(true);
    const interval = timer > 0 && setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval as any);
  }, [timer]);

  const sendOtp = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current!
      );
      setVerificationId(id);
      setTimer(30);
      setCanResend(false);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (!verificationId || code.length !== 6) return;

    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await signInWithCredential(auth, credential);
    } catch {
      alert("Invalid OTP");
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  return (
    <LinearGradient colors={["#1e3c72", "#2a5298", "#7e22ce"]} style={{ flex: 1 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>Sent to {phoneNumber}</Text>

          <View style={styles.otpRow}>
            {otp.map((d, i) => (
              <TextInput
                key={i}
                ref={(r) => {
                  inputRefs.current[i] = r;
                }}
                style={styles.otpBox}
                value={otp[i]}
                onChangeText={(v) => handleOtpChange(v, i)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>

          {!canResend ? (
            <Text style={styles.timer}>Resend in 00:{timer}</Text>
          ) : (
            <TouchableOpacity onPress={sendOtp}>
              <Text style={styles.resend}>Resend OTP</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleVerify}>
            <LinearGradient colors={["#3b82f6", "#2563eb"]} style={styles.button}>
              <Text style={styles.buttonText}>Verify & Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", textAlign: "center" },
  subtitle: { color: "#e0e7ff", textAlign: "center", marginBottom: 30 },
  otpRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  otpBox: {
    width: 48,
    height: 56,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  timer: { color: "#e0e7ff", textAlign: "center" },
  resend: { color: "#3b82f6", textAlign: "center", marginBottom: 20 },
  button: { height: 54, borderRadius: 12, justifyContent: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
