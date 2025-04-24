import Slider from '@react-native-community/slider';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useState } from 'react';

import { Label, Text } from './ui';

type VideoCropperProps = {
    uri: string;
    duration: number;
    onChangeStartValue: (start: number) => void;
    range: number;
};

const VideoCropper = ({ uri, duration, onChangeStartValue }: VideoCropperProps) => {
    const [start, setStart] = useState<number>(0);

    const player = useVideoPlayer(uri, (player) => {
        player.loop = true;
        player.play();
    });

    const onChangeSliderValue = (value: number) => {
        setStart(value);
    };

    const onSlidingComplete = (value: number) => {
        onChangeStartValue(value);
        const seekOffset = value - player.currentTime;
        player.seekBy(seekOffset);
    };

    const formatSeconds = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const s = Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <>
            <VideoView
                style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black' }}
                player={player}
            />
            <Label>Start Time</Label>
            <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={duration - 5}
                step={0.1}
                value={start}
                onValueChange={onChangeSliderValue}
                onSlidingComplete={onSlidingComplete}
                minimumTrackTintColor="#10b981"
                maximumTrackTintColor="#d1d5db"
            />
            <Text className="text-center text-sm text-gray-500">
                {formatSeconds(start)} – {formatSeconds(start + 5)}
            </Text>
        </>
    );
};

export default VideoCropper;
