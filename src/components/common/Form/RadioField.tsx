import { useFieldContext } from "~/components/common/Form/CustomForms";
import { FieldError, FieldLabel } from "~/components/ui/field";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioFieldProps {
  label?: string;
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  errors?: ({ message?: string } | undefined)[];
}

export function RadioField({
  label,
  options,
  orientation = "vertical",
  errors,
}: RadioFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className="flex w-full flex-col gap-3">
      {label ? (
        <FieldLabel htmlFor={field.name} className="font-bold">
          {label}
        </FieldLabel>
      ) : null}

      <RadioGroup
        value={field.state.value}
        onValueChange={field.handleChange}
        className={
          orientation === "horizontal"
            ? "flex flex-row gap-6"
            : "flex flex-col gap-2"
        }
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem
              value={option.value}
              id={`${field.name}-${option.value}`}
              disabled={option.disabled}
            />
            <label
              htmlFor={`${field.name}-${option.value}`}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>

      <FieldError errors={errors || field.state.meta.errors} />
    </div>
  );
}
