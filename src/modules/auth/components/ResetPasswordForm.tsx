"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { resetPasswordSchema } from "../schemas/resetPasswordSchema";
import FormPassword from "@/components/form-fields/FormPassword";
import useResetPassword from "../hooks/useResetPassword";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const t = useTranslations("Validation");

  const { mutate, isPending } = useResetPassword();

  const form = useForm<resetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(values: resetPasswordSchema) {
    mutate({ email: email || "", code: code || "", ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormPassword<resetPasswordSchema>
          control={form.control}
          name="password"
          placeholder="Password"
        />
        <FormPassword<resetPasswordSchema>
          control={form.control}
          name="password_confirmation"
          placeholder="Confirm Password"
        />
        <div className="flex justify-between items-center">
          <Button
            disabled={isPending}
            className=" text-background py-4 transition rounded-md cursor-pointer bg-foreground">
            {isPending ? <Spinner /> : "Submit"}
          </Button>

          <Link href="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
