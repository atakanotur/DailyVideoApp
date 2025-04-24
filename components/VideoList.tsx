import { FlashList } from '@shopify/flash-list';
import { View, Pressable } from 'react-native';

import { Card, CardDescription, CardTitle } from './ui';
import { Text } from './ui/text';

type VideoListProps = {
    data: Video[];
    onSelect: (video: Video) => void;
};

const VideoListItem = ({
    item,
    index,
    onPress,
}: {
    item: Video;
    index: number;
    onPress: (video: Video) => void;
}) => {
    return (
        <Pressable className="my-2" onPress={() => onPress(item)}>
            <Card className="w-full max-w-sm items-center justify-evenly gap-2 self-center border-2 border-black p-5 dark:border-white">
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
        <View className="w-full flex-1 gap-5 ">
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
