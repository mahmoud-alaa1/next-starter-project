"use client";

import FormInput from "@/components/form-fields/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hooks/useLogin";
import FormPassword from "@/components/form-fields/FormPassword";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { loginSchema } from "../schemas/loginSchema";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const t = useTranslations("Validation");

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: loginSchema) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isPending} className="space-y-6">
          <FormInput<loginSchema>
            name="email"
            placeholder="Email"
            autoComplete="email"
            Icon={<Mail className="size-4" />}
          />
          <FormPassword<loginSchema>
            name="password"
            placeholder="Password"
            autoComplete="current-password"
          />

          <Button
            disabled={isPending}
            className="w-full text-background py-4 transition rounded-md bg-foreground"
          >
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </fieldset>
      </form>
      <div className="flex justify-center">
        <Link href="/forgot-password" className="text-primary hover:underline">
          Forgot Password?
        </Link>
      </div>
    </Form>
  );
}
