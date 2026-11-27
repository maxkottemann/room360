"use client";

import ClientSelector from "@/components/selectors/clientSelectors";
import RoomError from "@/components/states/ErrorState";
import RoomLoader from "@/components/states/loadingState";
import Button from "@/components/ui/buttons/button";
import { PageHeader } from "@/components/ui/headers/pageheader";
import { useClients } from "@/hooks/clientHooks";
import { getModule } from "@/lib/module";
import { ModuleKey } from "@/types/types";
import { UserPlus, Users2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientPage({ module }: { module: ModuleKey }) {
  const { data: clients, isPending, error } = useClients(module);

  const moduleData = getModule(module);

  const router = useRouter();

  if (isPending) return <RoomLoader />;
  if (error) return <RoomError />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <PageHeader
          icon={Users2}
          title="Klanten"
          description={`Beheer al uw ${moduleData?.appName} klanten`}
        />
        <Button icon={UserPlus} size="md" variant="secondary" href="clients/new">
          Klant toevoegen
        </Button>
      </div>
      <ClientSelector
        clients={clients ?? []}
        onSelect={(client) => router.push(`clients/${client.id}`)}
      />
    </div>
  );
}
