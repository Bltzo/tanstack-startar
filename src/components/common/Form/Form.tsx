/**
 * This file is a custom form component that uses the valibot schema to validate the form
 * and the useFieldRequired hook to determine if a field is required.
 * It is used to create a form with a schema and a submit handler.
 */

import type { FormEvent, ReactNode } from "react";

import { createContext, useContext, useMemo } from "react";

type UnknownSchema = {
  type?: string;
  wrapped?: UnknownSchema;
  pipe?: readonly UnknownSchema[];
  entries?: Readonly<Record<string, UnknownSchema>>;
};

const OPTIONAL_SCHEMA_TYPES = new Set([
  "optional",
  "exact_optional",
  "nullish",
  "nullable",
  "undefinedable",
]);

function unwrapObjectSchema(schema: UnknownSchema): UnknownSchema | null {
  if (schema?.entries) {
    return schema;
  }

  if (schema?.type === "pipe" && Array.isArray(schema.pipe)) {
    const objectSchema = schema.pipe.find((entry) => Boolean(entry?.entries));
    return objectSchema ?? null;
  }

  return null;
}

function isOptionalSchema(schema: UnknownSchema | undefined): boolean {
  if (!schema) return false;

  if (OPTIONAL_SCHEMA_TYPES.has(schema.type ?? "")) {
    return true;
  }

  if (schema.type === "non_optional") {
    return false;
  }

  if (schema.wrapped) {
    return isOptionalSchema(schema.wrapped);
  }

  if (schema.type === "pipe" && Array.isArray(schema.pipe) && schema.pipe[0]) {
    return isOptionalSchema(schema.pipe[0]);
  }

  return false;
}

export function getRequiredFields(
  schema: UnknownSchema,
): Record<string, boolean> {
  const objectSchema = unwrapObjectSchema(schema);

  if (!objectSchema?.entries) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(objectSchema.entries).map(([fieldName, fieldSchema]) => [
      fieldName,
      !isOptionalSchema(fieldSchema),
    ]),
  );
}

type SchemaLike = Parameters<typeof getRequiredFields>[0];

const RequiredFieldsContext = createContext<Record<string, boolean>>({});

export function useFieldRequired(fieldName: string): boolean {
  const requiredFields = useContext(RequiredFieldsContext);
  return Boolean(requiredFields[fieldName]);
}

interface FormProps {
  id?: string;
  className?: string;
  schema: SchemaLike;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function Form({ id, className, schema, children, onSubmit }: FormProps) {
  const requiredFields = useMemo(() => getRequiredFields(schema), [schema]);

  return (
    <RequiredFieldsContext.Provider value={requiredFields}>
      <form id={id} onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </RequiredFieldsContext.Provider>
  );
}
