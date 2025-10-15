import { useMutation } from "@tanstack/react-query";
import useAuth from "../store/authStore";
import { loginService } from "../services/authService";
import { toast } from "sonner";
import { navigateTo } from "@/lib/router";
import { useSearchParams } from "next/navigation";
import { ApiError } from "@/utils/handleApiError";

export default function useLogin() {
  const login = useAuth((state) => state.login);
  const searchParams = useSearchParams();

  const next = searchParams.get("next");

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      toast.success("Login successfully");
      if (data) {
        login(data);
      }
      navigateTo(next ?? "/");
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}
