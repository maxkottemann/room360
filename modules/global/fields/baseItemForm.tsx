import FormField from "@/components/ui/inputs/formField";
import FormSection from "@/components/ui/inputs/formSection";
import Input from "@/components/ui/inputs/inputField";
import { ItemBaseInput } from "@/zodSchemas/itemSchema";
import { Box, Hash, Nfc, QrCode, Tag } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function BaseItemInsertForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ item: ItemBaseInput }>();

  return (
    <FormSection
      icon={Box}
      title="Basisgegevens"
      description="Vul de basisgegevens van het object in"
    >
      <FormField id="productname" label="Productnaam" error={errors?.item?.name?.message}>
        <Input
          id="productname"
          icon={Tag}
          placeholder="Naam of omschrijving van het object"

          invalid={!!errors?.item?.name}
          {...register("item.name")}
        />
      </FormField>
      <FormField id="quantity" label="Aantal" error={errors?.item?.quantity?.message}>
        <Input
          id="quantity"
          type="number"
          icon={Hash}
          placeholder="6"
          invalid={!!errors?.item?.quantity}
          {...register("item.quantity")}
        />
      </FormField>
      <div className="grid grid-cols-2 gap-5">
        <FormField id="qrCode" label="QR-Code" error={errors?.item?.qr_code_id?.message}>
          <Input
            id="qrcode"
            icon={QrCode}
            placeholder="QR-000123"
            invalid={!!errors?.item?.qr_code_id}
            {...register("item.qr_code_id")}
          />
        </FormField>
        <FormField id="rfid" label="RFID" error={errors?.item?.rfid_code?.message}>
          <Input
            id="rfid"
            icon={Nfc}
            placeholder="E280116060000205"
            invalid={!!errors?.item?.rfid_code}
            {...register("item.rfid_code")}
          />
        </FormField>
      </div>
    </FormSection>
  );
}
