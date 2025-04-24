import * as ImagePicker from "expo-image-picker";

const usePickVideo = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "videos",
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    videoMaxDuration: 5,
  });

  if (!result.canceled) {
    return result.assets[0];
  }

  return null;
};

export default usePickVideo;
