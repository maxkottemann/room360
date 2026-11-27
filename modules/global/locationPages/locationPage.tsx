"use client";

import LocationSelector from "@/components/selectors/locationSelector";
import RoomError from "@/components/states/ErrorState";
import RoomLoader from "@/components/states/loadingState";
import Button from "@/components/ui/buttons/button";
import { PageHeader } from "@/components/ui/headers/pageheader";
import { useLocationsWithClient } from "@/hooks/locationHooks";
import { ModuleKey } from "@/types/types";
import { Building2, BuildingComplexPlus, Import } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LocationPage({ module }: { module: ModuleKey }) {
  const { data: locations, isPending, error } = useLocationsWithClient(module);

  const router = useRouter();

  if (isPending) return <RoomLoader />;
  if (error) return <RoomError />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <PageHeader icon={Building2} title="Locaties" description="Beheer al uw locaties" />
        <div className="flex flex-row gap-3">
          <Button icon={Import} size="md" variant="secondary" href="locations/import">
            Locatie importeren
          </Button>
          <Button icon={BuildingComplexPlus} size="md" variant="primary" href="locations/new">
            Locatie toevoegen
          </Button>
        </div>
      </div>
      <LocationSelector
        locations={locations}
        onSelect={(location) => router.push(`/${module}/locations/${location.id}`)}
      />
    </div>
  );
}
