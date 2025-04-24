import { Video } from 'expo-av';
import { StyleProp, ViewStyle, View } from 'react-native';

interface VideoPlayerProps {
    uri?: string;
    style?: StyleProp<ViewStyle>;
}

const VideoPlayer = ({ uri, style }: VideoPlayerProps) => {
    if (!uri) return (
        <View className="w-full aspect-video bg-secondary border-2 border-primary rounded-md" />
    );
    return (
        <Video
            source={{ uri }}
            useNativeControls
            style={[{ width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black' }, style]}
        />
    );
};

export default VideoPlayer;