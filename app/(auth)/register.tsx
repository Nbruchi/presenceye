import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import OtpTextInput from "react-native-otp-textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import icons from "@/constants/icons";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

function Register() {
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [code, setCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [pendingVerification, setPendingVerification] =
        useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSignUp = async () => {
        if (!isLoaded) return;

        // Basic validation
        if (!firstName || !lastName || !emailAddress || !password) {
            Alert.alert("Validation Error", "Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            const signUpAttempt = await signUp.create({
                firstName,
                lastName,
                emailAddress,
                password,
            });

            await signUpAttempt.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setPendingVerification(true);
        } catch (error: any) {
            console.error(JSON.stringify(error, null, 2));
            Alert.alert("Error signing up", error.errors[0].message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!isLoaded) return;
        setLoading(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code,
                }
            );

            await setActive({ session: completeSignUp.createdSessionId });
            router.replace("/account-success");
        } catch (error: any) {
            console.error(JSON.stringify(error, null, 2));
            Alert.alert("Error verifying code", error.errors[0].message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!isLoaded) return;
        setLoading(true);

        try {
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            Alert.alert("Code resent", "Please check your email for the code");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to resend code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthSignUp = async () => {
        try {
            const { createdSessionId, setActive: setOAuthActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setOAuthActive!({ session: createdSessionId });
            } else {
                // Handle case where OAuth flow was not completed
            }
        } catch (err) {
            console.error("OAuth error", err);
            Alert.alert("Error", JSON.stringify(err, null, 2));
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center p-4 bg-white">
            <Stack.Screen
                options={{ headerBackVisible: !pendingVerification }}
            />
            <Spinner visible={loading} />
            <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
                {pendingVerification ? (
                    <View>
                        <Text className="title">Account verification</Text>
                        <Text className="text-md text-gray-500 my-4">
                            Please enter the 6-digit code sent to your email for
                            verification
                        </Text>
                        <View className="gap-8">
                            <OtpTextInput
                                inputCount={6}
                                handleTextChange={(code) => setCode(code)}
                                keyboardType="phone-pad"
                                containerStyle={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                textInputStyle={{
                                    borderWidth: 1,
                                    width: 40,
                                    height: 40,
                                    borderColor: "#ccc",
                                    borderRadius: 8,
                                    marginBottom: 10,
                                    paddingBottom: 4,
                                }}
                            />
                            <TouchableOpacity
                                onPress={handleVerify}
                                className="btn"
                            >
                                <Text className="text-white text-center">
                                    Verify
                                </Text>
                            </TouchableOpacity>
                            <View className="flex-row justify-center mt-6">
                                <Text className="text-md text-gray-500">
                                    Didn't receive the code?
                                </Text>
                                <TouchableOpacity onPress={handleResendCode}>
                                    <Text className="text-blue-500 ml-2">
                                        Resend code
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <>
                        <Text className="title">Create an account</Text>
                        <Text className="text-lg text-gray-500 my-2 text-center">
                            Connect with your system today
                        </Text>
                        <TouchableOpacity
                            onPress={handleOAuthSignUp}
                            className="google-btn"
                        >
                            <Image
                                source={icons.google}
                                alt="google"
                                className="size-6"
                            />
                            <Text>Sign up with Google</Text>
                        </TouchableOpacity>
                        <View className="flex-row items-center gap-2 px-20 self-center">
                            <View className="h-px bg-gray-500 w-3/5" />
                            <Text className="text-gray-500">Or</Text>
                            <View className="h-px bg-gray-500 w-3/5" />
                        </View>

                        <View className="flex flex-col space-y-4">
                            <TextInput
                                placeholder="Enter First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                                className="input"
                            />
                            <TextInput
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                                className="input"
                            />
                            <TextInput
                                placeholder="Enter Email Address"
                                value={emailAddress}
                                onChangeText={setEmailAddress}
                                keyboardType="email-address"
                                className="input"
                                autoCapitalize="none"
                            />

                            <View className="w-full relative">
                                <TextInput
                                    placeholder="Enter Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    className="input"
                                />
                                <Text
                                    className="absolute top-1/2 right-3 -translate-y-1/2"
                                    onPress={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    {showPassword ? (
                                        <Ionicons
                                            name="eye"
                                            size={20}
                                            color="gray"
                                        />
                                    ) : (
                                        <Ionicons
                                            name="eye-off"
                                            size={20}
                                            color="gray"
                                        />
                                    )}
                                </Text>
                            </View>
                            <View className="flex flex-row items-center gap-2">
                                <BouncyCheckbox
                                    textContainerStyle={{ display: "none" }}
                                    fillColor="gray"
                                />
                                <Text className="text-gray-500 text-md">
                                    By checking the box you agree to our{" "}
                                    <Link href="/" className="text-primary">
                                        Terms{" "}
                                        <Text className="text-gray-500">
                                            and{" "}
                                        </Text>
                                        Conditions
                                    </Link>
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleSignUp}
                                className="btn mt-4"
                            >
                                <Text className="text-white text-center">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                            <Text className="text-md text-center text-gray-500 mt-4 mb-20">
                                Already a memeber?{" "}
                                <Link href="/login">
                                    <Text className="text-primary">Login</Text>
                                </Link>
                            </Text>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Register;
