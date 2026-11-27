import { supabase } from "@/lib/browserClient";
import {
  createLocation,
  getClientLocationsByModule,
  getLocationLastMaintenance,
  getLocationOptionsForPlanning,
  getLocationRoomCount,
  getLocationStoryCount,
  getLocationsWithClient,
  getLocationWithClient,
  getStoriesFromLocation,
  toCreateLocationArgs,
  toUpdateLocationArgs,
  updateLocation,
} from "@/services/locationService";
import { ModuleKey } from "@/types/types";
import { LocationFormValues } from "@/zodSchemas/locationSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useClientLocationsByModule(id: string | undefined, module: ModuleKey) {
  return useQuery({
    queryKey: ["locations", id, module],
    queryFn: () => getClientLocationsByModule(supabase, id!, module),
    enabled: !!id,
  });
}

export function useLocationsWithClient(module: ModuleKey) {
  return useQuery({
    queryKey: ["locations", "with-client"],
    queryFn: () => getLocationsWithClient(supabase, module),
  });
}
export function useLocationWithClient(id: string | undefined) {
  return useQuery({
    queryKey: ["locations", id],
    queryFn: () => getLocationWithClient(supabase, id!),
    enabled: !!id,
  });
}

export function useLocationStoryCount(id: string | undefined) {
  return useQuery({
    queryKey: ["stories"],
    queryFn: () => getLocationStoryCount(supabase, id!),
    enabled: !!id,
  });
}

export function useLocationStories(id: string | undefined) {
  return useQuery({
    queryKey: ["stories", id],
    queryFn: () => getStoriesFromLocation(supabase, id!),
    enabled: !!id,
  });
}

export function useLocationRoomCount(id: string | undefined) {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getLocationRoomCount(supabase, id!),
    enabled: !!id,
  });
}

export function useLocationLastMaintenance(id: string | undefined) {
  return useQuery({
    queryKey: ["last_maintenance", id],
    queryFn: () => getLocationLastMaintenance(supabase, id!),
    enabled: !!id,
  });
}

export function useUpdateLocation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: LocationFormValues) =>
      updateLocation(supabase, id, toUpdateLocationArgs(values)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}

export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ values, module }: { values: LocationFormValues; module: ModuleKey }) =>
      createLocation(supabase, toCreateLocationArgs(values, module)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}
export function useLocationOptionsForPlanning(module: ModuleKey) {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocationOptionsForPlanning(supabase, module),
  });
}
