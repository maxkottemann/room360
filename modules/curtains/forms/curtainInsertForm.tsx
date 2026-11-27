"use client";
import {
  CurtainFormInput,
  CurtainFormSchema,
  CurtainFormValues,
  EMPTY_CURTAIN,
} from "@/zodSchemas/itemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Blinds } from "lucide-react";
import AddModal from "@/components/ui/modals/addModal";
import { getErrorMessage } from "@/lib/dbErrors";
import CurtainDetailsFields from "../fields/curtainDetailsFields";
import BaseItemInsertForm from "@/modules/global/fields/baseItemForm";
import { useCreateCurtainItem } from "../hooks/curtainItemhooks";

interface CurtainInsertFormProps {
  roomId: string;
  onClose: () => void;
  onCreated?: (itemId: string) => void;
}

export default function CurtainInsertForm({ roomId, onClose, onCreated }: CurtainInsertFormProps) {
  const createCurtain = useCreateCurtainItem();

  const form = useForm<CurtainFormInput, unknown, CurtainFormValues>({
    resolver: zodResolver(CurtainFormSchema),
    defaultValues: EMPTY_CURTAIN,
  });

  function onSubmit(values: CurtainFormValues) {
    createCurtain.mutate(
      { roomId, values },
      {
        onSuccess: (itemId) => {
          onCreated?.(itemId);
          form.reset();
          onClose();
        },
      },
    );
  }
  return (
    <AddModal
      open
      onClose={onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      title="Gordijn toevoegen"
      description="Voeg een gordijn toe aan deze ruimte."
      icon={Blinds}
      size="lg"
      loading={createCurtain.isPending}
      error={createCurtain.error ? getErrorMessage(createCurtain.error) : undefined}
    >
      <FormProvider {...form}>
        <BaseItemInsertForm />
        <CurtainDetailsFields />
      </FormProvider>
    </AddModal>
  );
}
