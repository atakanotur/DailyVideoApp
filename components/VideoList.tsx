import { View, Pressable } from 'react-native';
import { Text } from './ui/text';
import { FlashList } from '@shopify/flash-list';
import { Card, CardDescription, CardTitle } from './ui';

type VideoListProps = {
    data: Video[];
    onSelect: (video: Video) => void;
};

const VideoListItem = ({ item, index, onPress }: { item: Video, index: number, onPress: (video: Video) => void }) => {
    return (
        <Pressable onPress={() => onPress(item)}>
            <Card className="max-w-sm self-center items-center justify-evenly w-full gap-2 p-5 border-2 border-black dark:border-white">
                <CardTitle>
                    <Text>{item.title}</Text>
                </CardTitle>
                <CardDescription>
                    <Text>{item.description}</Text>
                </CardDescription>
            </Card>
        </Pressable>
    );
};

const VideoList = ({ data, onSelect }: VideoListProps) => {
    return (
        <View className="flex-1 w-full gap-5 ">
            <FlashList
                data={data}
                renderItem={({ item, index }) => (
                    <VideoListItem item={item} index={index} onPress={onSelect} />
                )}
                estimatedItemSize={100}
            />
        </View>
    );
};

export default VideoList;