import { useFieldContext } from "~/components/common/Form/CustomForms";
import { useFieldRequired } from "~/components/common/Form/Form";
import { FieldError, FieldLabel } from "~/components/ui/field";
import { Switch } from "~/components/ui/switch";

interface SwitchFieldProps {
  label?: string;
  errors?: ({ message?: string } | undefined)[];
}
export function SwitchField({ label, errors }: SwitchFieldProps) {
  const field = useFieldContext<boolean>();
  const isRequired = useFieldRequired(field.name);
  return (
    <div className="flex w-full flex-col gap-3">
      {label ? (
        <FieldLabel htmlFor={field.name} className="font-bold">
          {label}
          {isRequired ? (
            <span className="ms-1 text-destructive" aria-hidden="true">
              *
            </span>
          ) : null}
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
