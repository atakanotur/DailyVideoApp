declare global {
    type Video = {
        id: string;
        title: string;
        description: string;
        uri: string;
        originalUri: string;
        originalDuration: number;
    };

    type CroppedVideo = {
        id: string;
        uri: string;
    };
}

export { Video, CroppedVideo };
