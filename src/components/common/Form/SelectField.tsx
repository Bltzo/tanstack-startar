import { useFieldContext } from "~/components/common/Form/CustomForms";
import { FieldError, FieldLabel } from "~/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/utils/cn";

interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  className?: string;
  options: { id: string; name: string }[];
  errors?: ({ message?: string } | undefined)[];
}
export function SelectField({
  label,
  placeholder = "",
  className = "",
  options,
  errors,
}: SelectFieldProps) {
  const field = useFieldContext<string>();
  return (
    <div className="flex flex-col gap-3">
      {label ? (
        <FieldLabel htmlFor={field.name} className="text-base font-semibold">
          {label}
        </FieldLabel>
      ) : null}
      <Select
        onValueChange={(e) => field.setValue(e)}
        value={field.state.value}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={placeholder}
            className={cn("py-2", className)}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option.id} key={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={field.state.meta.errors || errors} />
    </div>
  );
}
