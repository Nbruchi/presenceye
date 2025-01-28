import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function Home() {
    const { user } = useUser();

    return (
        <SafeAreaView className="container bg-white">
            <View>
                <Text className="text-2xl font-bold">
                    Welcome{" "}
                    <Text className="text-primary">
                        Hi,{user?.emailAddresses[0].emailAddress}
                    </Text>
                </Text>
                <Link href="/profile" className="mt-6 text-blue-700">Go to profile</Link>
            </View>
        </SafeAreaView>
    );
}
