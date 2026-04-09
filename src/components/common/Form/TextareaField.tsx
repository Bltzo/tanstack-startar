import { FieldError, FieldLabel } from "~/components/ui/field";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/utils/cn";

import { useFieldContext } from "./CustomForms";

interface TextareaFieldProps {
  label?: string;
  placeholder?: string;
  className?: string;
}
export function TextareaField({
  label,
  placeholder = "",
  className = "",
}: TextareaFieldProps) {
  const field = useFieldContext<string>();
  return (
    <div className="flex flex-col gap-3">
      {label ? (
        <FieldLabel htmlFor={field.name} className="text-base font-semibold">
          {label}
        </FieldLabel>
      ) : null}
      <Textarea
        id={field.name}
        className={cn("resize-none py-2", className)}
        value={field.state.value}
        placeholder={placeholder}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
      />
      <FieldError errors={field.state.meta.errors} />
    </div>
  );
}
