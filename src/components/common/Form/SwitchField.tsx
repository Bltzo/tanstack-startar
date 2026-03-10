import { useFieldContext } from "~/components/common/Form/CustomForms";
import { FieldError, FieldLabel } from "~/components/ui/field";
import { Switch } from "~/components/ui/switch";

interface SwitchFieldProps {
  label?: string;
  errors?: ({ message?: string } | undefined)[];
}
export function SwitchField({ label, errors }: SwitchFieldProps) {
  const field = useFieldContext<boolean>();
  return (
    <div className="flex w-full flex-col gap-3">
      {label ? (
        <FieldLabel htmlFor={field.name} className="font-bold">
          {label}
        </FieldLabel>
      ) : null}
      <Switch
        id={field.name}
        defaultChecked={false}
        checked={field.state.value}
        onCheckedChange={field.handleChange}
      />
      <FieldError errors={errors || field.state.meta.errors} />
    </div>
  );
}
