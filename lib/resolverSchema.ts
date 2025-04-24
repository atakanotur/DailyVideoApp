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
        errors: {
            title: {
                type: 'min',
                message: 'Title is required',
            },
            description: {
                type: 'min',
                message: 'Description is required',
            },
        },
    });
};

export { useVideoForm };
