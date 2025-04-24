import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ControlledInput, Header, VideoPlayer } from '@/components';
import { Button, Text, Label } from '@/components/ui';
import pickVideo from '@/lib/pickVideo';
import { useVideoForm } from '@/lib/resolverSchema';
import useCropVideo from '@/lib/useVideoCrop';
import useVideoStore from '@/store/useVideoStore';

const AddVideoScreen = () => {
    const router = useRouter();
    const cropMutation = useCropVideo();
    const setVideo = useVideoStore((state) => state.setVideo);

    const { control, handleSubmit } = useVideoForm();

    const [videoUri, setVideoUri] = useState<string>('');
    const [start, setStart] = useState<number>(0);
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const handlePickVideo = async () => {
        const selectedVideo = await pickVideo();
        if (selectedVideo?.uri) {
            setVideoUri(selectedVideo.uri);
            setStep(2);
        }
    };

    const handleCropVideo = ({ title, description }: { title: string; description: string }) => {
        if (!videoUri) return;

        cropMutation.mutate(
            { uri: videoUri, start, title, description },
            {
                onSuccess: (newVideo) => {
                    setVideo(newVideo);
                    router.replace('/(main)/VideoDetailScreen');
                },
            }
        );
    };

    return (
        <SafeAreaView className="flex-1 gap-5 bg-secondary/30">
            <Header iconName="back" title="Add Video" />
            <View className="flex-1 justify-between p-5">
                {step === 1 && (
                    <View className="gap-5">
                        <Button onPress={handlePickVideo}>
                            <Text>Pick Video</Text>
                        </Button>
                    </View>
                )}

                {step === 2 && (
                    <View className="gap-5">
                        <Label>Video</Label>
                        <VideoPlayer uri={videoUri} />
                        <Label>Start Time</Label>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={0}
                            maximumValue={maxVideoLength - 5}
                            step={1}
                            value={start}
                            onValueChange={(val) => setStart(val)}
                            minimumTrackTintColor="#10b981"
                            maximumTrackTintColor="#d1d5db"
                        />
                        <Text className="text-center text-sm text-gray-500">
                            {formatSeconds(start)} – {formatSeconds(start + 5)}
                        </Text>
                        <Button onPress={() => setStep(3)}>
                            <Text>Next</Text>
                        </Button>
                    </View>
                )}

                {step === 3 && (
                    <View className="gap-5">
                        <ControlledInput control={control} name="title" placeholder="Video Title" />
                        <ControlledInput
                            control={control}
                            name="description"
                            placeholder="Video Description"
                        />
                        <Button
                            onPress={handleSubmit(handleCropVideo)}
                            disabled={cropMutation.isPending}>
                            <Text>{cropMutation.isPending ? 'Cropping...' : 'Crop & Save'}</Text>
                        </Button>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default AddVideoScreen;
