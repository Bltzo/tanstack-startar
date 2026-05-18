import { useFieldRequired } from "~/components/common/Form/Form";
import { FieldError, FieldLabel } from "~/components/ui/field";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/utils/cn";

import { useFieldContext } from "./CustomForms";

interface TextareaFieldProps {
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}
export function TextareaField({
  label,
  placeholder = "",
  className = "",
  required,
}: TextareaFieldProps) {
  const field = useFieldContext<string>();
  const requiredFromSchema = useFieldRequired(field.name);
  const isRequired = required ?? requiredFromSchema;
  return (
    <div className="flex flex-col gap-3">
      {label ? (
        <FieldLabel htmlFor={field.name} className="text-base font-semibold">
          {label}
          {isRequired ? (
            <span className="ms-1 text-destructive" aria-hidden="true">
              *
            </span>
          ) : null}
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
