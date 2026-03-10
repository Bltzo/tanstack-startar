import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { ColorInput } from "~/components/common/Form/ColorInput";
import { InputField } from "~/components/common/Form/InputField";
import { RadioField } from "~/components/common/Form/RadioField";
import { SelectField } from "~/components/common/Form/SelectField";
import { SwitchField } from "~/components/common/Form/SwitchField";
import { TextareaField } from "~/components/common/Form/TextareaField";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    ColorInput,
    InputField,
    TextareaField,
    SelectField,
    RadioField,
    SwitchField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
