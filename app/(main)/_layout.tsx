import { Stack } from 'expo-router';

const MainLayout = () => {
    return (
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="AddVideoScreen" options={{ headerShown: false }} />
            <Stack.Screen name="VideoDetailScreen" options={{ headerShown: false }} />
            <Stack.Screen name="EditVideoScreen" options={{ headerShown: false }} />
        </Stack>
    );
};

export default MainLayout;
