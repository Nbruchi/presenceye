import "./global.css";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { config } from "@/utils/config";
import React, { useEffect } from "react";
import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        nunito: require("@/assets/fonts/Nunito-Black.ttf"),
        "nunito-bold": require("@/assets/fonts/Nunito-Bold.ttf"),
        "nunito-extrabold": require("@/assets/fonts/Nunito-ExtraBold.ttf"),
        "nunito-medium": require("@/assets/fonts/Nunito-Medium.ttf"),
        "nunito-regular": require("@/assets/fonts/Nunito-Regular.ttf"),
        "nunito-semibold": require("@/assets/fonts/Nunito-SemiBold.ttf"),
        "nunito-light": require("@/assets/fonts/Nunito-Light.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        if (!isLoaded) return;

        const inTabs = segments[0] === "(root)";

        if (isSignedIn && !inTabs) {
            router.replace("/home");
        } else if (!isSignedIn && inTabs) {
            router.replace("/login");
        }
    }, [isSignedIn, isLoaded]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(root)" />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}

export default function MainLayout() {
    const publishableKey = config.env.clerk.publishableKey;

    if (!publishableKey) {
        throw new Error(
            "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
        );
    }

    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <ClerkLoaded>
                <InitialLayout />
            </ClerkLoaded>
        </ClerkProvider>
    );
}
