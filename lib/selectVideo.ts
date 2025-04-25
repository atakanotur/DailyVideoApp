import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

const selectVideo = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    try {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert(
                'Permission Required',
                'Media library permission is needed to pick videos.'
            );
            return null;
        }

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
    } catch (error: any) {
        if (Platform.OS === 'ios') {
            Alert.alert(
                'Video not available',
                'This video is stored in iCloud and cannot be accessed at the moment. Please download it to your device first.'
            );
        }
        throw new Error(error.message);
    }
};

export default selectVideo;
