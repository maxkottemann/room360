import { supabase } from "@/lib/browserClient";
import { createStory } from "@/services/storyService";
import { StoryFormValues } from "@/zodSchemas/storySchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: StoryFormValues) => createStory(supabase, args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
}
