"use client";

import useForgotPassword from "../../hooks/useForgotPassword";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Timer from "./Timer";
import { useFormContext } from "react-hook-form";
import { verifyCodeSchema } from "../../schemas/verifyCodeSchema";
import useTimer from "../../store/timerStore";
import { FORGOT_PASSWORD_DURATION } from "../..";

interface IResendCodeProps {
  type: "reset" | "registration";
}

function ResendCode({ type = "reset" }: IResendCodeProps) {
  const form = useFormContext<verifyCodeSchema>();

  const running = useTimer((state) => state.running);
  const startTimer = useTimer((state) => state.start);

  const { mutate, isPending } = useForgotPassword();
  return (
    <div>
      {running ? (
        <Timer />
      ) : (
        <Button
          disabled={isPending}
          variant={"link"}
          className="text-primary hover:underline cursor-pointer"
          onClick={() => {
            mutate(
              { email: form.watch("email"), type },
              {
                onSuccess: (data) => {
                  startTimer(
                    data?.can_resend_after ?? FORGOT_PASSWORD_DURATION
                  );
                },
              }
            );
          }}>
          {isPending ? <Spinner /> : "Resend Code"}
        </Button>
      )}
    </div>
  );
}

export default ResendCode;

/*

pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add command
pnpm dlx shadcn@latest add toast
pnpm dlx shadcn@latest add popover
pnpm dlx shadcn@latest add scroll-area

*/
