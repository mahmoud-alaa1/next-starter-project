import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendVerificationCode } from "../services/authService";
import { useRouter } from "next/navigation";
import { ApiError } from "@/utils/handleApiError";

export default function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: (data, variables) => {
      toast.success(data?.status, {
        position: "top-center",
      });
      router.push(`/verify-code?email=${variables.email}`);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
      console.error(error);
    },
  });
}
