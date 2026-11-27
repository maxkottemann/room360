import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCurtainItem,
  getCurtainItemsFromRoomId,
  getCurtainMaterialsOptions,
  getCurtainTypesOptions,
} from "../services/curtainItemService";
import { supabase } from "@/lib/browserClient";
import { CurtainFormValues } from "@/zodSchemas/itemSchema";

export function useCurtainItemsByRoomId(roomId: string | undefined) {
  return useQuery({
    queryKey: ["items", roomId, "curtains"],
    queryFn: () => getCurtainItemsFromRoomId(supabase, roomId!),
    enabled: !!roomId,
  });
}

export function useCurtainTypeOptions() {
  return useQuery({
    queryKey: ["curtain_types", { active: true }],
    queryFn: () => getCurtainTypesOptions(supabase),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCurtainMaterialOptions() {
  return useQuery({
    queryKey: ["curtain_materials", { active: true }],
    queryFn: () => getCurtainMaterialsOptions(supabase),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateCurtainItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, values }: { roomId: string; values: CurtainFormValues }) =>
      createCurtainItem(supabase, roomId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
