import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback } from "react";
import { toast } from "sonner";

import { useAppForm } from "~/components/common/Form/CustomForms";
import { Button } from "~/components/ui/button";
import { FieldGroup } from "~/components/ui/field";
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
      code: "",
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
        <div className="flex items-end gap-1">
          <form.AppField name="mobile">
            {(field) => (
              <field.InputField
                label={m.authSignUpFormMobile()}
                placeholder={m.authSignUpFormMobilePlaceholder()}
              />
            )}
          </form.AppField>
          <form.AppField name="code">
            {(field) => (
              <field.SelectField
                triggerClassName="max-w-20 mb-[3px]"
                options={[
                  { id: "1", name: "+20" },
                  { id: "2", name: "+44" },
                  { id: "3", name: "+91" },
                ]}
                placeholder={m.authSignUpFormMobilePlaceholder()}
              />
            )}
          </form.AppField>
        </div>

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
