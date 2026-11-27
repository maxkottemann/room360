import { supabase } from "@/lib/browserClient";
import {
  createClient,
  getClient,
  getClientOptions,
  getClients,
  toCreateClientArgs,
  toUpdateClientArgs,
  updateClient,
} from "@/services/clientService";
import { ModuleKey } from "@/types/types";
import { ClientFormValues } from "@/zodSchemas/clientSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useClientOptions(module: ModuleKey) {
  return useQuery({
    queryKey: ["clients", "options"],
    queryFn: () => getClientOptions(supabase, module),
  });
}

export function useClients(module: ModuleKey) {
  return useQuery({
    queryKey: ["clients", "clients"],
    queryFn: () => getClients(supabase, module),
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ values, module }: { values: ClientFormValues; module: ModuleKey }) =>
      createClient(supabase, toCreateClientArgs(values, module)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useUpdateClient(id: string) {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: (values: ClientFormValues) =>
      updateClient(supabase, id, toUpdateClientArgs(values)),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useClient(id: string | undefined) {
  return useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClient(supabase, id!),
    enabled: !!id,
  });
}
