import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import OtpTextInput from "react-native-otp-textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";

export default function Reset() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    if (!isLoaded) {
        return null;
    }

    if (isSignedIn) {
        router.push("/");
    }

    const create = async () => {
        try {
            await signIn.create({
                strategy: "reset_password_phone_code",
                identifier: phone,
            });
            setSuccessfulCreation(true);
        } catch (error: any) {
            console.error("Error", error);
            setError(error.errors[0].longMessage);
        }
    };

    async function reset() {
        await signIn
            ?.attemptFirstFactor({
                strategy: "reset_password_phone_code",
                code,
                password,
            })
            .then((result) => {
                // Check if 2FA is required
                if (result.status === "needs_second_factor") {
                    setSecondFactor(true);
                    setError("");
                } else if (result.status === "complete") {
                    // Set the active session to
                    // the newly created session (user is now signed in)
                    setActive({ session: result.createdSessionId });
                    setError("");
                    router.push("/password-success");
                } else {
                    console.log(result);
                }
            })
            .catch((err) => {
                console.error("error", err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            });
    }

    const handleResend = async () => {
        try {
            await signIn.create({
                strategy: "reset_password_phone_code",
                identifier: phone,
            });
            Alert.alert(
                "Resent code",
                "A new code has been sent to your phone"
            );
        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.errors[0].longMessage);
        }
    };

    return (
        <SafeAreaView className="container">
            <View className="p-6">
                {!successfulCreation && (
                    <View>
                        <Image
                            source={images.forgotPassword}
                            alt="forgot password"
                            resizeMode="contain"
                        />
                        <Text className="title">Forgot Password?</Text>
                        <Text className="my-2 text-md text-gray-500">
                            Don't worry! It happens.Please enter the phone
                            number we will send the OTP on the phone.
                        </Text>
                        <TextInput
                            placeholder="Enter the phone number"
                            value={phone}
                            keyboardType="phone-pad"
                            onChangeText={setPhone}
                            className="input"
                        />

                        {error && (
                            <Text className="block text-red-500">{error}</Text>
                        )}
                        <TouchableOpacity onPress={create} className="btn mt-3">
                            <Text className="text-white text-center">
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {successfulCreation && (
                    <View>
                        <Image
                            source={images.otp}
                            alt="otp"
                            resizeMode="contain"
                        />
                        <Text className="title">OTP Verification</Text>
                        <Text className="text-gray-500 my-2">
                            Enter the otp sent to{" "}
                            <Text className="font-bold">{phone}</Text>
                        </Text>
                        <OtpTextInput
                            inputCount={4}
                            handleTextChange={(code) => setCode(code)}
                            keyboardType="phone-pad"
                            containerStyle={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            textInputStyle={{
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                marginBottom: 10,
                                paddingBottom: 2,
                            }}
                        />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter new password"
                            className="input"
                        />

                        {error && (
                            <Text className="text-red-600 block">{error}</Text>
                        )}

                        <TouchableOpacity onPress={reset} className="btn mt-2">
                            <Text className="text-white text-center">
                                Submit
                            </Text>
                        </TouchableOpacity>
                        <View className="flex flex-row items-center gap-2">
                            <Text className="text-gray-500 text-md">
                                Didn't receive code?
                            </Text>
                            <TouchableOpacity onPress={handleResend}>
                                <Text className="text-primary">Resend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {secondFactor && (
                    <Text>
                        2FA is required, but this UI does not handle that
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
}
