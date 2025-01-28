import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Link } from "expo-router";

export default function PasswordSuccess() {
    return (
        <SafeAreaView className="container px-2">
            <Text className="title my-4">Your password is successfully reset!</Text>
            <Image
                source={images.passwordSuccess}
                alt="password success"
                resizeMode="contain"
            />
            <View className="mt-4 px-4">
                <Text>Continue to login to your account</Text>

                <Link href="/login" className="btn">
                    <Text className="text-white text-center">Login</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
}
