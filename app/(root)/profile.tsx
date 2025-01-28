import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import icons from "@/constants/icons";

export default function Profile() {
    const { user } = useUser();

    return (
        <SafeAreaView className="w-full">
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={["#1570ca", "#003366"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        height: 200,
                        borderBottomLeftRadius: 80,
                        borderBottomRightRadius: 80,
                        padding: 4,
                        position: "relative",
                    }}
                >
                    <StatusBar barStyle="light-content" />
                    <View className="flex flex-row items-center justify-between px-4 mt-4">
                        <Ionicons name="arrow-back" size={20} color="white" />
                        <View className="gap-2 flex flex-row">
                            <Ionicons
                                name="notifications-outline"
                                size={20}
                                color="white"
                            />
                            <Ionicons
                                name="ellipsis-vertical"
                                size={20}
                                color="white"
                            />
                        </View>
                    </View>
                    <View className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                        <Image
                            source={{ uri: user?.imageUrl }}
                            alt="Profile"
                            resizeMode="contain"
                            className="size-40 rounded-full"
                        />
                    </View>
                    <TouchableOpacity className="absolute -bottom-16 right-32 size-14 rounded-full bg-gray-300 flex items-center justify-center">
                        <Ionicons
                            name="pencil-outline"
                            color="gray"
                            size={28}
                        />
                    </TouchableOpacity>
                </LinearGradient>
                <View className="w-full mt-20 px-10 h-dvh">
                    <View className="flex flex-col items-center justify-center gap-2">
                        <Text className="title">{user?.fullName}</Text>
                        <Text className="text-gray-600 text-md">
                            {user?.emailAddresses[0].emailAddress} |{" "}
                            {user?.phoneNumbers[0]?.phoneNumber ||
                                "+15555550100"}
                        </Text>
                    </View>

                    <View className="mt-4 shadow-md shadow-gray-800 rounded-lg flex flex-col px-4 gap-2 py-4">
                        <View className="flex flex-row items-center justify-between gap-2">
                            <View className="flex flex-row gap-2 items-center">
                                <Image
                                    source={icons.profileEdit}
                                    alt="profile"
                                    resizeMode="contain"
                                />
                                <Text>Edit profile information</Text>
                            </View>
                        </View>
                        <View className="flex flex-row items-center justify-between gap-2">
                            <View className="flex flex-row gap-2 items-center">
                                <Ionicons
                                    name="notifications-outline"
                                    size={24}
                                    color="black"
                                />
                                <Text>Notifications</Text>
                            </View>
                            <Text className="text-blue-600">ON</Text>
                        </View>
                        <View className="flex flex-row items-center justify-between gap-2">
                            <View className="flex flex-row gap-2 items-center">
                                <Image
                                    source={icons.translate}
                                    resizeMode="contain"
                                />
                                <Text>Language</Text>
                            </View>
                            <Text className="text-blue-600">English</Text>
                        </View>
                    </View>
                    <View className="mt-4 shadow-md shadow-gray-800 rounded-lg flex flex-col px-4 gap-2 py-4">
                        <View className="flex flex-row items-center justify-between gap-2">
                            <View className="flex flex-row gap-2 items-center">
                                <Ionicons
                                    name="share-social"
                                    size={24}
                                    color="black"
                                />
                                <Text>Share</Text>
                            </View>
                            <Ionicons
                                name="copy-outline"
                                size={24}
                                color="black"
                            />
                        </View>
                        <View className="flex flex-row items-center justify-between gap-2">
                            <View className="flex flex-row gap-2 items-center">
                                <Image
                                    source={icons.colors}
                                    resizeMode="contain"
                                    alt="colors"
                                />
                                <Text>Theme</Text>
                            </View>
                            <Text className="text-blue-600">Light mode</Text>
                        </View>
                    </View>
                    <View className="mt-4 shadow-md shadow-gray-800 rounded-xl flex flex-col p-6 gap-2 mb-20">
                        <View className="flex flex-row items-center justify-between gap-2">
                            <View className="flex flex-row gap-2 items-center">
                                <Image
                                    source={icons.support}
                                    resizeMode="contain"
                                    alt="colors"
                                />
                                <Text>Help & Support</Text>
                            </View>
                        </View>
                        <View className="flex flex-row items-center justify-between gap-2">
                            <View className="flex flex-row gap-2 items-center">
                                <Image
                                    source={icons.contact}
                                    resizeMode="contain"
                                    alt="colors"
                                />
                                <Text>Contact Us</Text>
                            </View>
                        </View>
                        <View className="flex flex-row items-center justify-between gap-2">
                            <View className="flex flex-row gap-2 items-center">
                                <Image
                                    source={icons.lock}
                                    resizeMode="contain"
                                    alt="colors"
                                />
                                <Text>Privacy Policy</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
