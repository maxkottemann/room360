"use client";

import ErrorState from "@/components/states/ErrorState";
import Card from "@/components/ui/cards/card";
import InfoBlock from "@/components/ui/sections/infoBlock";
import { useProfile } from "@/context/ProfileContext";
import {
  useLocationLastMaintenance,
  useLocationRoomCount,
  useLocationStories,
  useLocationWithClient,
} from "@/hooks/locationHooks";
import { formatDate, formatNumber2Decimals } from "@/lib/format";
import {
  useLocationCurtainCount,
  useLocationCurtainTotalM2,
} from "@/modules/curtains/hooks/curtainLocationHooks";
import {
  ArrowLeftIcon,
  Blinds,
  Building2,
  BuildingComplexPlus,
  CheckIcon,
  ChevronRightIcon,
  DoorOpen,
  Layers,
  Link,
  MapPinIcon,
  Summary,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function CurtainLocationDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : undefined;

  const relatedLinks = [
    {
      href: `/curtains/locations/${id}/add`,
      icon: <BuildingComplexPlus className="h-4 w-4 text-primary" />,
      label: "Ruimtes toevoegen",
      sub: "Bekijk alle ruimtes van deze locatie",
    },
  ];

  const { profile } = useProfile();

  const router = useRouter();
  const { data: location, isPending, error } = useLocationWithClient(id);
  const {
    data: curtainCount,
    isPending: curtainCountPending,
    error: curtainCountError,
  } = useLocationCurtainCount(id);

  const { data: stories, isPending: storiesPending } = useLocationStories(id);
  const { data: roomCount } = useLocationRoomCount(id);
  const { data: lastMaintenance } = useLocationLastMaintenance(id);

  const { data: totalM2 } = useLocationCurtainTotalM2(id);

  const hasBeenMaintained = !!lastMaintenance;

  if (!location) return <ErrorState />;

  return (
    <div>
      <div className="mb-1 flex flex-row justify-between">
        <div className="flex flex-row items-center gap-3">
          <button
            onClick={() => router.back()}
            className="group flex cursor-pointer items-center gap-1.5 text-muted transition-colors hover:text-primary"
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-sm font-medium">Terug</span>
          </button>

          <div className="bg-border h-4 w-px" />

          <p className="text-xs font-semibold tracking-widest text-muted uppercase">Locatie</p>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold tracking-tight text-gray-900 xl:text-3xl">
            {location?.name ?? "—"}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="flex flex-row gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                  hasBeenMaintained
                    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-100 text-slate-500"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${hasBeenMaintained ? "bg-emerald-400" : "bg-slate-300"}`}
                />
                {hasBeenMaintained
                  ? `Laatste onderhoud: ${formatDate(lastMaintenance)}`
                  : "Nog niet onderhouden"}
              </span>
            </div>
            {location?.checkin_procedure && (
              <span className="inline-flex items-center gap-1 rounded-md border border-amber-100 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                <CheckIcon className="h-3.5 w-3.5" />
                Aanmeldprocedure
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 xl:mt-4">
            {totalM2 !== null && (
              <div className="inline-flex items-center gap-2 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 text-sm shadow-sm">
                <Blinds className="h-4 w-4 shrink-0 text-[primary]" />
                <span className="font-bold text-[primary]">
                  {formatNumber2Decimals(totalM2 ?? 0)}
                  m²
                </span>
                <span className="text-xs text-gray-400">totaal vloeroppervlak</span>
              </div>
            )}
            {curtainCount !== null && (
              <button
                type="button"
                onClick={() => router.push(`/floorpassport?location_id=${id}`)}
                aria-label={`Bekijk ${curtainCount} vloeren in het vloerpaspoort`}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition-all duration-150 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none active:scale-[0.98]"
              >
                <Blinds className="h-4 w-4 shrink-0 text-primary" />
                <span className="font-bold text-primary tabular-nums">{curtainCount}</span>
                <span className="text-xs text-slate-500 transition-colors group-hover:text-primary">
                  Gordijnen bekijken
                </span>
                <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </button>
            )}
            {location?.street && (
              <div className="inline-flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                <MapPinIcon className="h-4 w-4 shrink-0 text-[primary]" />
                <span className="font-medium">
                  {location.street} {location.number}
                </span>
                {location.city && (
                  <span className="hidden text-gray-400 sm:inline">· {location.city}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card title="Locatiegegevens" subtitle="Adres en klant" icon={MapPinIcon}>
          <div className="border border-zinc-100" />

          <div className="grid grid-cols-2 gap-5">
            <InfoBlock label="Plaats" value={location?.city} icon={MapPinIcon} />
            <InfoBlock
              label="Adres"
              value={`${location?.street} ${location.number}`}
              icon={MapPinIcon}
            />
            <InfoBlock label="Klant" value={location.clients.name} icon={User} />

            <InfoBlock
              label="Totaal m2"
              value={`${formatNumber2Decimals(totalM2 ?? 0)}m²`}
              icon={Summary}
            />
          </div>
        </Card>

        <Card
          title="Locatieinrichting"
          subtitle="Overzicht van verdiepingen, ruimtes en vloeren"
          icon={Building2}
        >
          <div className="border border-zinc-100" />
          <div className="grid grid-cols-2 gap-5">
            <InfoBlock label="Verdiepingen" icon={Layers} value={String(stories?.length)} />

            <InfoBlock label="Ruimtes" icon={DoorOpen} value={String(roomCount)} />

            <InfoBlock label="Gordijnen" icon={Blinds} value={String(curtainCount)} />
          </div>
        </Card>
      </div>
      {profile?.role === "company_admin" && (
        <div className="mt-5">
          <Card title="Gerelateerd" subtitle="Navigeer naar gerelateerde pagina's" icon={Link}>
            <div className="border border-zinc-100"></div>
            <div className="divide-y divide-zinc-100">
              {relatedLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group roun flex items-center gap-3 rounded-xl py-3.5 transition-colors hover:bg-gray-50 active:bg-gray-100"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    {link.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800">{link.label}</p>
                    <p className="hidden text-xs text-gray-400 sm:block">{link.sub}</p>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 shrink-0 text-gray-200 transition-colors group-hover:text-[primary]" />
                </a>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
