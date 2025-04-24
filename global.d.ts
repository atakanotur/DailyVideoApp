declare global {
    type Video = {
        id: string;
        title: string;
        description: string;
        originalUri: string;
        uri: string;
    };
}

export { Video };
