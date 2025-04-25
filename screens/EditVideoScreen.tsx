import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ControlledInput, Header, VideoCropper } from '@/components';
import { Button, Text } from '@/components/ui';
import { useVideoForm, VideoFormFields } from '@/lib/resolverSchema';
import selectVideo from '@/lib/selectVideo';
import useCropVideo from '@/lib/useVideoCrop';
import useVideoStore from '@/store/useVideoStore';

const EditVideoScreen = () => {
    const router = useRouter();
    const cropMutation = useCropVideo();

    const video = useVideoStore((state) => state.video);
    const setVideo = useVideoStore((state) => state.setVideo);
    const editVideo = useVideoStore((state) => state.editVideoById);

    const formData: Partial<VideoFormFields> = {
        title: video.title,
        description: video.description,
    };
    const { control, handleSubmit } = useVideoForm(formData);

    const [videoUri, setVideoUri] = useState<string>(video.originalUri);
    const [videoDuration, setVideoDuration] = useState<number>(video.originalDuration);
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
                    editVideo(video.id, {
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
            <Header iconName="back" title="Edit Video" />
            <View className="flex-1 justify-between p-5">
                <ControlledInput
                    control={control}
                    name="title"
                    placeholder="Video Title"
                    defaultValue={video.title}
                />
                <ControlledInput
                    control={control}
                    name="description"
                    placeholder="Video Description"
                    defaultValue={video.description}
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

export default EditVideoScreen;
