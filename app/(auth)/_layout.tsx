import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="reset" />
            <Stack.Screen name="account-success" />
            <Stack.Screen name="password-success" />
        </Stack>
    );
}
