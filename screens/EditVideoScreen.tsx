import { useState } from "react";
import { View } from "react-native";
import Header from "@/components/Header";
import { Button, Input, Text } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import useVideoStore from "@/store/useVideoStore";
import { useRouter } from "expo-router";

const EditVideoScreen = () => {
    const router = useRouter();

    const video = useVideoStore(state => state.video);
    const editVideoById = useVideoStore(state => state.editVideoById);

    const [title, setTitle] = useState<string>(video.title);
    const [description, setDescription] = useState<string>(video.description);

    const handleEditVideo = () => {
        editVideoById(video.id, { ...video, title, description });
        router.replace("/(main)");
    }

    return (
        <SafeAreaView className='flex-1 gap-5 bg-secondary/30'>
            <Header iconName="back" title="Edit Video" />
            <View className="flex-1 p-5 justify-between">
                <View className="gap-5">
                    <Input
                        placeholder='Video Title'
                        value={title}
                        onChangeText={setTitle}
                        aria-labelledby='inputLabel'
                        aria-errormessage='inputError'
                    />
                    <Input
                        placeholder='Video Description'
                        value={description}
                        onChangeText={setDescription}
                        aria-labelledby='inputLabel'
                        aria-errormessage='inputError'
                    />
                </View>
                <View>
                    <Button onPress={handleEditVideo}>
                        <Text>Edit Video</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default EditVideoScreen;