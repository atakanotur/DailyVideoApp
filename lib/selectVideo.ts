import * as ImagePicker from 'expo-image-picker';

const selectVideo = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'videos',
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        return result.assets[0];
    }

    return null;
};

export default selectVideo;
