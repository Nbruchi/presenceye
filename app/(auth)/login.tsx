import {
    Text,
    Alert,
    TextInput,
    Button,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useState } from "react";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import icons from "@/constants/icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Login() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onSignInPress = async () => {
        if (!isLoaded) return;
        setLoading(true);

        try {
            const completeSignIn = await signIn.create({
                identifier: emailAddress,
                password,
            });
            await setActive({ session: completeSignIn.createdSessionId });
        } catch (error: any) {
            console.error(JSON.stringify(error.errors[0].message, null, 2));
            Alert.alert("Error", error.errors[0].message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const { createdSessionId, setActive: setOauthActive } =
                await startOAuthFlow();
            if (createdSessionId) {
                await setOauthActive!({ session: createdSessionId });
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to sign in with Google");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="container px-6">
            <Spinner visible={loading} />
            <Text className="title">Welcome back👋</Text>
            <Text className="text-gray-500 text-center my-2">
                Sign in to access your account
            </Text>
            <TouchableOpacity
                onPress={handleGoogleSignIn}
                className="google-btn"
            >
                <Image
                    source={icons.google}
                    className="size-6"
                    alt="google"
                    resizeMode="contain"
                />
                <Text className="text-gray-800">Login with Google</Text>
            </TouchableOpacity>
            <View className="flex-row items-center justify-center gap-2 px-24 my-4">
                <View className="w-4/5 h-px bg-gray-500" />
                <Text className="text-gray-500 text-center">Or</Text>
                <View className="w-4/5 h-px bg-gray-500" />
            </View>
            <View className="w-full bg-white">
                <TextInput
                    placeholder="Email..."
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    className="input"
                />
                <View className="relative w-full">
                    <TextInput
                        placeholder="Password..."
                        value={password}
                        secureTextEntry={!visible}
                        onChangeText={setPassword}
                        className="input"
                    />
                    <Text
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onPress={() => setVisible(!visible)}
                    >
                        {visible ? (
                            <Ionicons name="eye" size={24} color="gray" />
                        ) : (
                            <Ionicons name="eye-off" size={24} color="gray" />
                        )}
                    </Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-2">
                        <BouncyCheckbox
                            fillColor="#000"
                            textContainerStyle={{ display: "none" }}
                        />
                        <Text className="text-lg">Remember me</Text>
                    </View>
                    <Link href="/reset" className="text-primary text-lg my-4">
                        <Text>Forgot Password</Text>
                    </Link>
                </View>
                <TouchableOpacity
                    onPress={onSignInPress}
                    className="bg-primary p-4 rounded-2xl mt-2"
                >
                    <Text className="text-white text-center">Login</Text>
                </TouchableOpacity>
                <Link href="/register" asChild>
                    <Text className="text-gray-500 mt-4 text-xl text-center">
                        Don't have an account?{" "}
                        <Text className="text-primary">Sign Up</Text>
                    </Text>
                </Link>
            </View>
        </SafeAreaView>
    );
}
