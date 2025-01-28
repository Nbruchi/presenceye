import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function AccountSuccess() {
    const router = useRouter();

    return (
        <SafeAreaView className="container px-4">
            <Text className="title mb-4">
                Your account is created successfully!
            </Text>
            <Image
                source={images.accountSuccess}
                alt="Account Success"
                resizeMode="contain"
            />
            <Text className="text-center text-gray-500 text-sm mt-8">
                Click continue to go to your home page
            </Text>
            <TouchableOpacity
                className="btn mt-4"
                onPress={() => router.replace("/home")}
            >
                <Text className="text-white text-center">Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
