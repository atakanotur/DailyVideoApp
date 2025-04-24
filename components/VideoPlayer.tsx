import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleProp, ViewStyle } from 'react-native';

type VideoPlayerProps = {
    uri: string;
    style?: StyleProp<ViewStyle>;
};

const VideoPlayer = ({ uri, style }: VideoPlayerProps) => {
    const player = useVideoPlayer(uri, (player) => {
        player.loop = true;
        player.play();
    });

    return (
        <VideoView
            style={[{ width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black' }, style]}
            player={player}
        />
    );
};

export default VideoPlayer;
