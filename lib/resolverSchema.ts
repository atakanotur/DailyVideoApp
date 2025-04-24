import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const videoSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
});

export type VideoFormFields = z.infer<typeof videoSchema>;

const useVideoForm = (defaultValues?: Partial<VideoFormFields>) => {
    return useForm<VideoFormFields>({
        defaultValues: {
            title: defaultValues?.title || '',
            description: defaultValues?.description || '',
        },
        resolver: zodResolver(videoSchema),
    });
};

export { useVideoForm };
