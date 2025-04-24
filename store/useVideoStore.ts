import { create } from 'zustand';

type State = {
    video: Video;
    videos: Video[];
};

type Action = {
    setVideo: (video: State['video']) => void;
    setVideos: (videos: State['videos']) => void;
    addVideo: (video: Video) => void;
    editVideoById: (id: string, video: Video) => void;
};

const useVideoStore = create<State & Action>((set) => ({
    video: {} as Video,
    videos: [
        {
            id: '1',
            description: 'Description',
            title: 'Title',
            uri: 'uri',
        },
    ] as Video[],
    setVideo: (video) => set(() => ({ video })),
    setVideos: (videos) => set(() => ({ videos })),
    addVideo: (video) => set((state) => ({ videos: [...state.videos, video] })),
    editVideoById: (id, video) =>
        set((state) => ({
            videos: state.videos.map((v) => (v.id === id ? video : v)),
        })),
}));

export default useVideoStore;
