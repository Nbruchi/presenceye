import { ImageSourcePropType, View, Text, Image } from "react-native";

const TabIcon = ({
    focused,
    icon,
    title,
}: {
    focused: boolean;
    icon: ImageSourcePropType;
    title?: string;
}) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image
            source={icon}
            tintColor={focused ? "#003366" : "#666876"}
            resizeMode="contain"
            className="size-6"
        />
        <Text
            className={`${
                focused
                    ? "text-primary font-nunito-medium"
                    : "text-primary-200 font-nunito"
            } text-xs w-full text-center mt-1`}
        >
            {title}
        </Text>
    </View>
);

export default TabIcon;
