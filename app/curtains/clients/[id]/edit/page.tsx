"use client";

import NotFoundState from "@/components/states/notFound";
import { useClient } from "@/hooks/clientHooks";
import { useParams } from "next/navigation";
import ErrorState from "@/components/states/ErrorState";
import LoadingState from "@/components/states/loadingState";
import { EditClientForm } from "@/modules/global/forms/clientForms/editClientForm";

export default function CurtainEditClientPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : undefined;
  const { data: client, isPending, error } = useClient(id);

  if (isPending) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!client) return <NotFoundState />;

  return <EditClientForm client={client} />;
}
