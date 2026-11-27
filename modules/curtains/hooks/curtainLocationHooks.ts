import { useQuery } from "@tanstack/react-query";
import {
  getCurtainCountByLocationId,
  getCurtainCountByStory,
  getLocationCurtainCount,
  getLocationCurtainM2,
} from "../services/curtainLocationService";
import { supabase } from "@/lib/browserClient";

export function useLocationCurtainCount(id: string | undefined) {
  return useQuery({
    queryKey: ["locations", id, "curtains", "count"],
    queryFn: () => getLocationCurtainCount(supabase, id!),
    enabled: !!id,
  });
}

export function useLocationCurtainTotalM2(id: string | undefined) {
  return useQuery({
    queryKey: ["locations", id, "curtains", "totalm2"],
    queryFn: () => getLocationCurtainM2(supabase, id!),
    enabled: !!id,
  });
}

export function useCurtainCountByLocationId(id: string | undefined) {
  return useQuery({
    queryKey: ["items", id, "curtain", "count"],
    queryFn: () => getCurtainCountByLocationId(supabase, id!),
    enabled: !!id,
  });
}

export function useItemCountByStoryId(storyId: string | undefined) {
  return useQuery({
    queryKey: ["items", storyId],
    queryFn: () => getCurtainCountByStory(supabase, storyId!),
    enabled: !!storyId,
  });
}
