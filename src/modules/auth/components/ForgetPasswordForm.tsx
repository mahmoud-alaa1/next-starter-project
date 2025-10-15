"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form-fields/FormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useForgotPassword from "../hooks/useForgotPassword";
import { useTranslations } from "next-intl";
import useTimer from "../store/timerStore";
import { FORGOT_PASSWORD_DURATION } from "..";
import Spinner from "@/components/ui/spinner";

export default function ForgotPasswordForm() {
  const { mutate, isPending } = useForgotPassword();
  const t = useTranslations("Validation");
  const { start } = useTimer();

  const form = useForm<forgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: {
      email: "",
      type: "reset",
    },
  });
  function onSubmit(values: forgotPasswordSchema) {
    mutate(values, {
      onSuccess: (data) => {
        start(data?.can_resend_after ?? FORGOT_PASSWORD_DURATION);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput<forgotPasswordSchema>
          control={form.control}
          name="email"
          placeholder="Email"
          autoComplete="email"
        />
        <div className="flex justify-between items-center">
          <Button
            disabled={isPending}
            className="text-background py-4 transition rounded-md cursor-pointer bg-foreground">
            {isPending ? <Spinner /> : "Send Verify Code"}
          </Button>

          <Link href="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
