import { VideoView, useVideoPlayer } from 'expo-video';
import { StyleProp, ViewStyle, View } from 'react-native';

interface VideoPlayerProps {
    uri: string;
    style?: StyleProp<ViewStyle>;
}

const VideoPlayer = ({ uri, style }: VideoPlayerProps) => {
    const player = useVideoPlayer(uri, (player) => {
        player.loop = true;
        player.play();
    });

    if (!uri)
        return (
            <View className="aspect-video w-full rounded-md border-2 border-primary bg-secondary" />
        );
    return (
        <VideoView
            style={[{ width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black' }, style]}
            player={player}
        />
    );
};

export default VideoPlayer;
