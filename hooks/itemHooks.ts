import { supabase } from "@/lib/browserClient";
import { deleteItem } from "@/services/itemService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => deleteItem(supabase, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
