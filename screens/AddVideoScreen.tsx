import { useState } from "react";
import { View } from "react-native";
import { Button, Text, Label } from "@/components/ui";
import usePickVideo from "@/lib/useVideoPicker";
import { SafeAreaView } from "react-native-safe-area-context";
import useVideoStore from "@/store/useVideoStore";
import { useRouter } from "expo-router";
import { ControlledInput, Header, VideoPlayer } from "@/components";
import { useVideoForm } from "@/lib/resolverSchema";
import useCropVideo from "@/lib/useVideoCrop";

const AddVideoScreen = () => {
    const router = useRouter();
    const cropMutation = useCropVideo();

    const addVideo = useVideoStore(state => state.addVideo);

    const { control, handleSubmit } = useVideoForm();

    const [videoUri, setVideoUri] = useState<string>("");

    const handlePickVideo = async () => {
        const selectedVideo = await usePickVideo();
        if (selectedVideo?.uri) setVideoUri(selectedVideo.uri);
        console.log("selectedVideo : ", selectedVideo);
    }

    const handleAddVideo = ({ title, description }: { title: string, description: string }) => {
        addVideo({ id: "1", title, description, uri: videoUri ?? "" });
        cropMutation.mutate({
            start: 10, // örnek: 10. saniyeden başlasın
            uri: videoUri,
            title: "Günlük 1",
            description: "Bugün hava çok güzeldi.",
        });
        router.replace("/(main)");
    }

    return (
        <SafeAreaView className='flex-1 gap-5 bg-secondary/30'>
            <Header iconName="back" title="Add Video" />
            <View className="flex-1 p-5 justify-between">
                <View className="gap-5">
                    <ControlledInput control={control} name="title" placeholder="Video Title" />
                    <ControlledInput control={control} name="description" placeholder="Video Description" />
                </View>
                <View className="gap-5 items-center">
                    <Label>Video</Label>
                    <VideoPlayer uri={videoUri} />
                </View>
                <View className="gap-5">
                    <Button onPress={handlePickVideo}>
                        <Text>Pick Video</Text>
                    </Button>
                    <Button onPress={handleSubmit(handleAddVideo)}>
                        <Text>Add Video</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default AddVideoScreen;