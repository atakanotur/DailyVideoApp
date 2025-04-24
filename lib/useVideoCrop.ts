import { useMutation } from '@tanstack/react-query';
import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

import useVideoStore from '@/store/useVideoStore';

type CropParams = {
  start: number; // Başlangıç saniyesi
  uri: string; // Orijinal video URI
  title: string;
  description: string;
};

const useCropVideo = () => {
  const addVideo = useVideoStore((state) => state.addVideo);

  return useMutation({
    mutationFn: async ({ start, uri, title, description }: CropParams) => {
      const duration = 5;
      const outputDir = FileSystem.documentDirectory + 'croppedVideos/';

      await FileSystem.makeDirectoryAsync(outputDir, { intermediates: true });

      const outputPath = `${outputDir}clip_${Date.now()}.mp4`;

      const command = `-ss ${start} -t ${duration} -i "${uri}" -c copy "${outputPath}"`;

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (!returnCode.isValueSuccess()) {
        throw new Error('FFmpeg başarısız oldu.');
      }

      const id = Crypto.randomUUID();

      const newVideo = {
        id,
        uri: outputPath,
        title,
        description,
      };

      addVideo(newVideo);
      return newVideo;
    },
  });
};

export default useCropVideo;
