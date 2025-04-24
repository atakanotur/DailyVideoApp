import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ControlledInput, Header, VideoCropper } from '@/components';
import { Button, Text } from '@/components/ui';
import { useVideoForm } from '@/lib/resolverSchema';
import selectVideo from '@/lib/selectVideo';
import useCropVideo from '@/lib/useVideoCrop';
import useVideoStore from '@/store/useVideoStore';

const AddVideoScreen = () => {
    const router = useRouter();
    const cropMutation = useCropVideo();
    const setVideo = useVideoStore((state) => state.setVideo);
    const addVideo = useVideoStore((state) => state.addVideo);

    const { control, handleSubmit } = useVideoForm();

    const [videoUri, setVideoUri] = useState<string>('');
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [start, setStart] = useState<number>(0);

    const handleSelectVideo = async () => {
        const selectedVideo = await selectVideo();
        if (selectedVideo?.uri && selectedVideo.duration) {
            setVideoUri(selectedVideo.uri);
            setVideoDuration(selectedVideo.duration / 1000);
        }
    };

    const handleCropVideo = ({ title, description }: { title: string; description: string }) => {
        if (!videoUri) return;
        cropMutation.mutate(
            { uri: videoUri, start },
            {
                onSuccess: (corpedVideo) => {
                    setVideo({
                        ...corpedVideo,
                        title,
                        description,
                        originalUri: videoUri,
                        originalDuration: videoDuration,
                    });
                    addVideo({
                        ...corpedVideo,
                        title,
                        description,
                        originalUri: videoUri,
                        originalDuration: videoDuration,
                    });
                    router.replace('/(main)/VideoDetailScreen');
                },
            }
        );
    };

    return (
        <SafeAreaView className="flex-1 gap-5 bg-secondary/30">
            <Header iconName="back" title="Add Video" />
            <View className="flex-1 justify-between p-5">
                <ControlledInput control={control} name="title" placeholder="Video Title" />
                <ControlledInput
                    control={control}
                    name="description"
                    placeholder="Video Description"
                />
                <VideoCropper
                    uri={videoUri}
                    duration={videoDuration}
                    onChangeStartValue={setStart}
                    range={5}
                />
                <View className="gap-5">
                    <Button onPress={handleSelectVideo}>
                        <Text>Select Video</Text>
                    </Button>
                    <Button
                        onPress={handleSubmit(handleCropVideo)}
                        disabled={cropMutation.isPending}>
                        <Text>{cropMutation.isPending ? 'Cropping...' : 'Crop & Save'}</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddVideoScreen;
