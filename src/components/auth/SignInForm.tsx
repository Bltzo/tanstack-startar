import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { useAppForm } from "~/components/common/Form/CustomForms";
import { Button } from "~/components/ui/button";
import { FieldGroup } from "~/components/ui/field";
import * as m from "~/i18n/messages";
import { loginSchema } from "~/schema/auth";
import { login } from "~/server/auth.server";

export function SignInForm() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: useServerFn(login),
    mutationKey: ["user/login"],
    onSuccess: () => {
      toast(m.authSignInSuccessTitle(), {
        description: m.authSignInSuccessMessage(),
      });
      router.invalidate();
      router.navigate({ to: "/dashboard" });
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      mutate({ data: value });
    },
  });

  const handleSignUp = useCallback(() => {
    router.navigate({ to: "/sign-up" });
  }, [router]);

  return (
    <form
      id="sign-in-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <FieldGroup className="flex flex-col gap-4">
          <form.AppField name="email">
            {(field) => (
              <field.InputField
                label={m.authSignInFormEmail()}
                placeholder={m.authSignUpFormEmailPlaceholder()}
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.InputField
                type="password"
                label={m.authSignInFormPassword()}
                placeholder="••••••••"
              />
            )}
          </form.AppField>
        </FieldGroup>
      </FieldGroup>

      <div className="text-left">
        <Button
          variant="link"
          className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
        >
          {m.authSignInFormForgotPassword()}
        </Button>
      </div>
      <Button
        type="submit"
        className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
      >
        {m.authSignInFormSubmit()}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {m.authSignInFormCreateAccount()}{" "}
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 font-normal text-destructive"
          onClick={handleSignUp}
        >
          {m.authSignInFormSignUp()}
        </Button>
      </p>
    </form>
  );
}
