import { useFieldContext } from "~/components/common/Form/CustomForms";
import { FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "className" | "onChange" | "value"
>;

interface ColorInputProps extends InputProps {
  label?: string;
  errors?: Array<{ message?: string } | undefined>;
}

/**
 * A color picker input component that integrates with the form system.
 *
 * @param label - Optional label text displayed above the color picker
 * @param props - Additional HTML input attributes (excluding id, type, className, onChange, and value) since they are managed internally
 * @param errors - Optional array of error messages to display below the input
 */
export function ColorInput({ label, errors, ...props }: ColorInputProps) {
  const field = useFieldContext<string>();

  return (
    <div className="flex flex-col items-center gap-3">
      {label ? (
        <FieldLabel htmlFor={field.name} className="text-sm font-medium">
          {label}
        </FieldLabel>
      ) : null}
      <Input
        id={field.name}
        type="color"
        className="h-20 w-20 cursor-pointer rounded-lg border-none p-0"
        value={field.state.value || "#FFFFFF"}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
        {...props}
      />
      <FieldError errors={errors || field.state.meta.errors} />
    </div>
  );
}
