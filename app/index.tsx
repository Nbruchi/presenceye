import {
    View,
    Text,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { onBoardingData, OnBoardingType } from "@/constants/data";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Index() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const listRef = useRef<FlatList>(null);
    const router = useRouter();

    const handleNext = () => {
        if (currentIndex < onBoardingData.length - 1) {
            listRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
            setCurrentIndex(currentIndex + 1);
        } else {
            router.replace("/login");
        }
    };

    const handleViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: any }) => {
            if (viewableItems.length > 0) {
                setCurrentIndex(viewableItems[0].index);
            }
        }
    ).current;

    const renderItem = ({ item }: { item: OnBoardingType }) => {
        return (
            <View style={{ width }} className="flex justify-center p-4">
                <Image
                    source={item.image}
                    alt={item.text}
                    resizeMode="contain"
                    className="self-center"
                />
                <Text className="text-4xl font-bold mt-20">{item.title}</Text>
                <Text className="text-2xl text-gray-500 mt-4">{item.text}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                ref={listRef}
                data={onBoardingData}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={handleViewableItemsChanged}
            />
            <View className="flex flex-row w-full items-center justify-between px-12 mb-20">
                <View className="flex flex-row items-center">
                    {onBoardingData.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                backgroundColor:
                                    currentIndex === index ? "#003366" : "#ccc",
                            }}
                            className="w-4 h-2 ml-1 rounded-full"
                        />
                    ))}
                </View>
                <TouchableOpacity
                    onPress={handleNext}
                    className="bg-primary p-2 size-12 flex items-center justify-center rounded-full"
                >
                    <AntDesign name="right" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
