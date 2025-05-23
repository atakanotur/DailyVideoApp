import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header, VideoPlayer } from '@/components';
import { Button, Card, CardDescription, CardHeader, CardTitle, Label, Text } from '@/components/ui';
import useVideoStore from '@/store/useVideoStore';

const VideoDetailScreen = () => {
    const router = useRouter();
    const video = useVideoStore((state) => state.video);

    const handleEditVideo = () => {
        router.replace('/(main)/EditVideoScreen');
    };

    return (
        <SafeAreaView className="flex-1 gap-5 bg-secondary/30">
            <Header iconName="back" title="Video Detail" />
            <View className="flex-1 justify-between p-5">
                <View className="gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>{video.title}</CardTitle>
                            <CardDescription>{video.description}</CardDescription>
                        </CardHeader>
                    </Card>
                </View>
                <View className="items-center gap-2">
                    <Label>Video</Label>
                    <VideoPlayer uri={video.uri} />
                </View>
                <View>
                    <Button onPress={handleEditVideo}>
                        <Text>Edit</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VideoDetailScreen;
