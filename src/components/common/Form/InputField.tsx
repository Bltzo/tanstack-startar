import type { HTMLInputTypeAttribute } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useFieldContext } from "~/components/common/Form/CustomForms";
import { Button } from "~/components/ui/button";
import {
  FieldDescription,
  FieldError,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { cn } from "~/utils/cn";

interface InputFieldProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  description?: string;
  errors?: string[];
}
export function InputField({
  label,
  type = "text",
  placeholder,
  errors,
  description,
  className = "",
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const field = useFieldContext<string | number>();

  return (
    <div className="relative flex w-full flex-col gap-1 text-sm">
      {label && (
        <FieldLabel htmlFor={field.name} className="font-medium">
          {label}
        </FieldLabel>
      )}

      <div className="relative">
        <Input
          id={field.name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={cn(
            "border px-3 py-2 text-foreground placeholder:text-neutral-600/50",
            className,
            isPassword ? "pe-10" : "", // add padding for eye icon
          )}
          value={field.state.value}
          placeholder={placeholder ?? ""}
          onChange={(e) => {
            if (type === "number") {
              field.handleChange(Number(e.target.value));
            } else {
              field.handleChange(e.target.value);
            }
          }}
        />

        {/* Eye icon */}
        {isPassword && (
          <Button
            variant="ghost"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={cn(
              "absolute end-0 top-[40%] mb-0 translate-y-[-50%] cursor-pointer pb-0 text-neutral-500 hover:bg-transparent hover:text-foreground",
            )}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        )}
      </div>
      {description && (
        <FieldDescription className="pt-1 text-sm text-gray-600">
          {description}
        </FieldDescription>
      )}

      <FieldError errors={field.state.meta.errors} />
      {errors && errors?.length > 0 && (
        <p className="text-sm text-destructive">{errors?.join(", ")}</p>
      )}
    </div>
  );
}
