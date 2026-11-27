"use client";

import Button from "@/components/ui/buttons/button";
import { SubPageHeader } from "@/components/ui/headers/pageheader";
import FormSection from "@/components/ui/inputs/formSection";
import { SelectionProvider } from "@/context/SelectItemContext";
import { useToast } from "@/context/ToastContext";
import { getErrorMessage } from "@/lib/dbErrors";
import { getModule } from "@/lib/module";
import ProjectBaseFields from "@/modules/global/fields/projectBaseFields";
import { ModuleKey } from "@/types/types";
import {
  EMPTY_PROJECT,
  type ProjectFormInput,
  type ProjectFormValues,
  ProjectSchema,
} from "@/zodSchemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Blinds, Box, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import CurtainStoryList from "./_components/curtainStoryList";
import SelectProjectVehicleForm from "@/modules/global/fields/selectProjectVehicleForm";
import NewProjectSummarySideBar from "./_components/NewProjectSummarySidebar";
import { useCreateProject } from "@/hooks/projectHooks";

export default function NewCurtainProjectPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const createProject = useCreateProject();

  const form = useForm<ProjectFormInput, unknown, ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: EMPTY_PROJECT,
    mode: "onTouched",
  });

  // hooks at the top, never inside JSX
  const locationId = useWatch({ control: form.control, name: "location_id" });

  function onSubmit(values: ProjectFormValues) {
    createProject.mutate(
      { values },
      {
        onSuccess: (projectId) => {
          showToast("Project aangemaakt", "success");
          router.push(`/curtains/projects/${projectId}`);
        },
        onError: (error) => showToast(getErrorMessage(error), "error"),
      },
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <SubPageHeader
        title="Project toevoegen"
        description="Selecteer objecten en voertuigen voor een project"
      />

      <FormProvider {...form}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <form
            id="project-form"
            onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("invalid", errors))}
            noValidate
            className="flex min-w-0 flex-col gap-6"
          >
            {/* 1. name, location, period */}
            <ProjectBaseFields module="curtains" />

            {/* 2. the module's objects */}
            <FormSection
              icon={Blinds}
              title={"Gordijnen"}
              description="Kies welke gordijnen in dit project worden meegenomen"
            >
              {locationId ? (
                <Controller
                  name="items"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-5">
                      <SelectionProvider
                        value={field.value}
                        onChange={field.onChange}
                        defaultMethodId="846edf44-40b3-4d30-9e90-80c05e565bbd"
                      >
                        <CurtainStoryList locationId={locationId} />
                      </SelectionProvider>
                    </div>
                  )}
                />
              ) : (
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-line px-4 py-6 text-sm text-muted">
                  <Box className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Kies eerst een locatie om objecten in te plannen.
                </div>
              )}
            </FormSection>

            {/* 3. later: <ProjectVehicleFields /> */}
            <SelectProjectVehicleForm />

            {/* submit (mobile) */}
            <div className="flex justify-end lg:hidden">
              <Button type="submit" icon={Check}>
                Project aanmaken
              </Button>
            </div>
          </form>

          {/* sidebar */}
          <div className="hidden lg:block">
            <NewProjectSummarySideBar />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
