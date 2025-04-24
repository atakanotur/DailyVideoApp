// /components/video/VideoModal.tsx
import Slider from '@react-native-community/slider';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { VideoView } from 'expo-video';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import cropVideo from '/lib/videoService';

import useVideoStore from '@/store/useVideoStore';

const VideoModal = () => {
    const [step, setStep] = useState(1);
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [startTime, setStartTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const videoRef = useRef<Video>(null);
    const queryClient = useQueryClient();
    const addVideo = useVideoStore((state) => state.);

    // Video seçme işlemi
    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setVideoUri(result.assets[0].uri);
            setStep(2);
        }
    };

    // Video bilgilerini yükleme
    const onVideoLoad = (data: any) => {
        setVideoDuration(data.durationMillis / 1000); // saniye cinsinden
    };

    // Kırpma işlemi
    const cropMutation = useMutation({
        mutationFn: async () => {
            if (!videoUri) return null;
            return cropVideo(videoUri, startTime, 5);
        },
        onSuccess: (croppedVideoUri) => {
            if (croppedVideoUri) {
                addVideo({
                    title,
                    description,
                    uri: croppedVideoUri,
                });
                router.push('/');
            }
        },
    });

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View className="flex-1 items-center justify-center">
                        <Text className="mb-6 text-lg">Video Seçin</Text>
                        <TouchableOpacity
                            className="rounded-lg bg-blue-500 px-6 py-3"
                            onPress={pickVideo}>
                            <Text className="font-medium text-white">Galeriden Seç</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 2:
                return (
                    <View className="w-full flex-1">
                        <Text className="mb-2 text-lg">Video Kırpma</Text>
                        {videoUri && (
                            <Video
                                ref={videoRef}
                                source={{ uri: videoUri }}
                                className="mb-4 h-64 w-full"
                                useNativeControls
                                resizeMode="contain"
                                onLoad={onVideoLoad}
                            />
                        )}

                        <Text className="mb-2">
                            5 saniye seçin (Başlangıç: {startTime.toFixed(1)} s)
                        </Text>
                        <Slider
                            value={startTime}
                            onValueChange={setStartTime}
                            minimumValue={0}
                            maximumValue={Math.max(0, videoDuration - 5)}
                            step={0.1}
                            minimumTrackTintColor="#007AFF"
                            maximumTrackTintColor="#DDDDDD"
                        />

                        <TouchableOpacity
                            className="mt-6 self-end rounded-lg bg-blue-500 px-6 py-3"
                            onPress={() => setStep(3)}>
                            <Text className="font-medium text-white">İleri</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 3:
                return (
                    <View className="w-full flex-1">
                        <Text className="mb-4 text-lg">Video Bilgileri</Text>

                        <Text className="mb-1">Başlık</Text>
                        <TextInput
                            className="mb-4 rounded-md border border-gray-300 px-3 py-2"
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Video başlığı"
                        />

                        <Text className="mb-1">Açıklama</Text>
                        <TextInput
                            className="mb-6 h-24 rounded-md border border-gray-300 px-3 py-2"
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Video açıklaması"
                            multiline
                            textAlignVertical="top"
                        />

                        <TouchableOpacity
                            className="self-end rounded-lg bg-blue-500 px-6 py-3"
                            onPress={() => cropMutation.mutate()}
                            disabled={cropMutation.isPending}>
                            <Text className="font-medium text-white">
                                {cropMutation.isPending ? 'İşleniyor...' : 'Kırp ve Kaydet'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
        }
    };

    return <View className="flex-1 bg-white p-4">{renderStep()}</View>;
};

export default VideoModal;
