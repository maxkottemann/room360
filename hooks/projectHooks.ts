import { supabase } from "@/lib/browserClient";
import { createCurtainProject } from "@/modules/curtains/services/curtainProjectService";
import { ModuleKey } from "@/types/types";
import { ProjectFormValues } from "@/zodSchemas/projectSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ values }: { values: ProjectFormValues }) =>
      createCurtainProject(supabase, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
