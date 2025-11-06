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

  const form = useForm({
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
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {m.authSignUpFormEmail()}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={m.authSignUpFormEmailPlaceholder()}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {m.authSignUpFormName()}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  inputMode="text"
                  type="text"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={m.authSignUpFormNamePlaceholder()}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
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
        <form.Field name="company">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {m.authSignUpFormCompany()}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="text"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={m.authSignUpFormCompanyPlaceholder()}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="jobTitle">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {m.authSignUpFormJobTitle()}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="text"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={m.authSignUpFormJobTitlePlaceholder()}
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
                  {m.authSignUpFormPassword()}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="password"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={m.authSignUpFormPassword()}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {m.authSignUpFormConfirmPassword()}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="password"
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={m.authSignUpFormConfirmPassword()}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <Button
        type="submit"
        className="w-full bg-destructive font-medium text-destructive-foreground hover:bg-destructive/90"
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
