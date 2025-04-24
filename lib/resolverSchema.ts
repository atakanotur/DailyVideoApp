import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const videoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

type VideoFormFields = z.infer<typeof videoSchema>;

const useVideoForm = () => {
  return useForm<VideoFormFields>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(videoSchema),
  });
};

export { useVideoForm };
