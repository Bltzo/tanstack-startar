import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { useAppForm } from "~/components/common/Form/CustomForms";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import * as m from "~/i18n/messages";
import { registerSchema } from "~/schema/auth";
import { register } from "~/server/auth.server";

export function SignUpForm() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: useServerFn(register),
    mutationKey: ["user/register"],
    onSuccess: () => {
      toast(m.authSignUpSuccessTitle(), {
        description: m.authSignUpSuccessMessage(),
      });
      router.invalidate();
      router.navigate({ to: "/dashboard" });
    },
  });

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      company: "",
      jobTitle: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: ({ value }) => {
      mutate({ data: value });
    },
  });

  const handleSignIn = useCallback(() => {
    router.navigate({ to: "/sign-in" });
  }, [router]);

  return (
    <form
      id="sign-up-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <form.AppField name="email">
          {(field) => (
            <field.InputField
              label={m.authSignUpFormEmail()}
              placeholder={m.authSignUpFormEmailPlaceholder()}
            />
          )}
        </form.AppField>
        <form.AppField name="name">
          {(field) => (
            <field.InputField
              label={m.authSignUpFormName()}
              placeholder={m.authSignUpFormNamePlaceholder()}
            />
          )}
        </form.AppField>

        <form.Field name="mobile">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {m.authSignUpFormMobile()}
                </FieldLabel>
                <div className="flex gap-2">
                  <Select defaultValue="+20">
                    <SelectTrigger className="w-[80px] border-border bg-muted/50 text-foreground">
                      <SelectValue placeholder={m.authSignUpFormPhoneCode()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+20">+20</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+91">+91</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    inputMode="tel"
                    type="tel"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder={m.authSignUpFormMobilePlaceholder()}
                    autoComplete="off"
                  />
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.AppField name="company">
          {(field) => (
            <field.InputField
              label={m.authSignUpFormCompany()}
              placeholder={m.authSignUpFormCompanyPlaceholder()}
            />
          )}
        </form.AppField>
        <form.AppField name="jobTitle">
          {(field) => (
            <field.InputField
              label={m.authSignUpFormJobTitle()}
              placeholder={m.authSignUpFormJobTitlePlaceholder()}
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.InputField
              type="password"
              label={m.authSignUpFormPassword()}
              placeholder="••••••••"
            />
          )}
        </form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => (
            <field.InputField
              type="password"
              label={m.authSignUpFormConfirmPassword()}
              placeholder={m.authSignUpFormConfirmPassword()}
            />
          )}
        </form.AppField>
      </FieldGroup>

      <Button
        type="submit"
        className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
        disabled={form.state.isSubmitting}
      >
        {form.state.isSubmitting
          ? m.authSignUpFormSubmitting()
          : m.authSignUpFormSubmit()}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {m.authSignUpFormHaveAccount()}{" "}
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 font-medium text-destructive"
          onClick={handleSignIn}
        >
          {m.authSignUpFormSignIn()}
        </Button>
      </p>
    </form>
  );
}
