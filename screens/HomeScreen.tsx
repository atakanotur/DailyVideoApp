import { Header, VideoList } from '@/components';
import useVideoStore from '@/store/useVideoStore';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const router = useRouter();

  const videos = useVideoStore(state => state.videos);
  const setVideo = useVideoStore(state => state.setVideo);

  const onSelectVideo = (video: Video) => {
    setVideo(video);
    router.navigate("/(main)/VideoDetailScreen");
  }

  return (
    <SafeAreaView className='flex-1 justify-center items-center gap-5 bg-secondary/30'>
      <Header iconName='plus' title="SevenAppsRNCase" />
      <VideoList data={videos} onSelect={onSelectVideo} />
    </SafeAreaView>
  );
}

export default HomeScreen;
