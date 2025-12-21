import { useCallback } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
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

  const form = useForm({
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
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {m.authSignInFormEmail()}
                </FieldLabel>
                <Input
                  id={field.name}
                  className="border-border bg-muted/50 text-foreground placeholder:text-neutral-600"
                  name={field.name}
                  value={field.state.value}
                  inputMode="email"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {m.authSignInFormPassword()}
                </FieldLabel>
                <Input
                  id={field.name}
                  className="border-border bg-muted/50 text-foreground placeholder:text-neutral-600"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="password"
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
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
