"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { debounce } from "@/lib/utils";

type UseFilterSyncOptions<T extends FieldValues> = {
  form: UseFormReturn<T>;
};

export default function useSearchForm<T extends FieldValues>({
  form,
}: UseFilterSyncOptions<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const formValues: Record<string, any> = {};

    const defaultValues = form.getValues();
    for (const key of Object.keys(defaultValues)) {
      const paramValue = searchParams.get(key);

      if (paramValue !== null) {
        formValues[key] = paramValue;
      }
    }
    if (Object.keys(formValues).length > 0) {
      form.reset({
        ...formValues,
        ...defaultValues,
      });
    }
  }, [searchParams, form]);

  useEffect(() => {
    const updateParams = debounce(
      (values: Record<string, unknown>, name?: string) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(values).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== "") {
            params.set(k, String(v));
          } else {
            params.delete(k);
          }
        });

        if (name !== "page" && params.has("page")) {
          params.set("page", "1");
        }

        router.replace("?" + params.toString(), { scroll: false });
      },
      500
    );

    const subscription = form.watch((values, { name }) => {
      updateParams(values, name);
    });

    return () => subscription.unsubscribe();
  }, [form, router, searchParams]);
}
