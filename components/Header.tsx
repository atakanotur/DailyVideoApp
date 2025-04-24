import { Pressable, View } from "react-native";
import { Text } from "./ui/text";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "expo-router";
import { PlusIcon, BackIcon } from "@/lib/icons";

type HeaderProps = {
    iconName: "plus" | "back"
    title: string
}

const Header = ({ iconName, title }: HeaderProps) => {
    const router = useRouter();

    const handleAdd = () => {
        router.navigate("/(main)/AddVideoScreen");
    }

    const handleBack = () => {
        router.back();
    }

    return (
        <View className="flex-row items-center justify-between w-full border-b-2 border-border p-6">
            {iconName === "back" ? (
                <Pressable onPress={handleBack}>
                    <BackIcon />
                </Pressable>
            ) : (
                <Pressable onPress={handleAdd}>
                    <PlusIcon />
                </Pressable>
            )}

            <Text className="font-bold text-xl">{title}</Text>
            <ThemeToggle />
        </View>
    )
}

export default Header;