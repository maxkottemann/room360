"use client";

import ErrorState from "@/components/states/ErrorState";
import LoadingState from "@/components/states/loadingState";
import NotFoundState from "@/components/states/notFound";
import { useClient } from "@/hooks/clientHooks";
import { useCompany } from "@/hooks/companyHooks";
import { useClientLocationsByModule } from "@/hooks/locationHooks";
import { useParams, useSearchParams } from "next/navigation";
import ClientInfoChip from "../_components/infochip";
import { ClipboardList, Clock, Edit, Landmark, MapPinIcon, Tag, User } from "lucide-react";
import { formatAddress, formatDate } from "@/lib/format";
import { SubPageHeader } from "@/components/ui/headers/pageheader";
import Button from "@/components/ui/buttons/button";
import Card from "@/components/ui/cards/card";

export default function CurtainClientDetailPage() {
  const params = useParams();
  const clientId = typeof params.id === "string" ? params.id : undefined;

  const { company } = useCompany();

  const { data: client, isPending, error } = useClient(clientId);

  const {
    data: locations,
    isPending: locationsPending,
    error: locationError,
  } = useClientLocationsByModule(clientId, "curtains");

  if (isPending || locationsPending) return <LoadingState />;
  if (error || locationError) return <ErrorState />;
  if (!client || !locations) return <NotFoundState />;

  const canEditCompany = company?.id === client.owner_company_id;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <SubPageHeader title={client.name} description="Bekijk de gegevens van uw klant" />

        <div className="flex flex-row gap-2">
          {canEditCompany && (
            <Button href={`/${module}/clients/${client.id}/edit`} variant="secondary" icon={Edit}>
              Bewerken
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Card icon={User} title="Klantgegevens">
          <div className="grid grid-cols-2 gap-5">
            <ClientInfoChip title="Klantnaam" value={client.name} icon={Tag} />
            <ClientInfoChip title="Adres" value={formatAddress(client)} icon={MapPinIcon} />
            <ClientInfoChip title="KVK-nummer" value={client.kvk} icon={Landmark} />
            <ClientInfoChip
              title="Klant sinds"
              value={formatDate(client.created_at ?? "")}
              icon={Clock}
            />
          </div>
        </Card>
        <Card icon={ClipboardList} title="Projectgegevens"></Card>
      </div>
    </div>
  );
}
