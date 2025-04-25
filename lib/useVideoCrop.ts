import { useMutation } from '@tanstack/react-query';
import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

type CropParams = {
    start: number;
    uri: string;
};

const useCropVideo = () => {
    return useMutation({
        mutationFn: async ({ start, uri }: CropParams) => {
            const duration = 5;
            const outputDir = FileSystem.documentDirectory + 'croppedVideos/';

            await FileSystem.makeDirectoryAsync(outputDir, { intermediates: true });

            const outputPath = `${outputDir}clip_${Date.now()}.mp4`;

            const command = `-i "${uri}" -ss ${start} -t ${duration} -c copy "${outputPath}"`;

            const session = await FFmpegKit.execute(command);
            const returnCode = await session.getReturnCode();

            if (!returnCode.isValueSuccess()) {
                throw new Error('FFmpeg başarısız oldu.');
            }

            const id = Crypto.randomUUID();

            const croppedVideo: CroppedVideo = {
                id,
                uri: outputPath,
            };

            return croppedVideo;
        },
    });
};

export default useCropVideo;
