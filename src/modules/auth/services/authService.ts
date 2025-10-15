import { handleApiError } from "@/utils/handleApiError";
import { loginSchema } from "../schemas/loginSchema";
import { fcm_token } from "..";
import { forgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import { verifyCodeSchema } from "../schemas/verifyCodeSchema";
import { resetPasswordSchema } from "../schemas/resetPasswordSchema";
import api from "@/lib/api/axios";
import endpoints from "@/lib/api/endPoints";
import fetcherClient from "@/lib/api/fetcher/client";

export async function loginService(data: loginSchema) {
  try {
    const response = await fetcherClient.post<IApiResponse<ILoginResponse>>(
      "/auth/login",
      { ...data, fcm_token }
    );
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
}
export async function logoutService() {
  try {
    const response = await fetcherClient.post<
      IApiResponse<{
        message: string;
      }>
    >(endpoints.logout);
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
}

export async function sendVerificationCode(data: forgotPasswordSchema) {
  try {
    const response = await api.post<IApiResponse<IForgotPasswordResponse>>(
      endpoints.sendVerifyCode,
      data
    );
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function checkVerificationCode(data: verifyCodeSchema) {
  try {
    const response = await api.post<
      IApiResponse<ICheckVerificationCodeResponse>
    >("/auth/check/verification", data);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function resetPassword(
  data: resetPasswordSchema & verifyCodeSchema
) {
  try {
    const response = await api.post("/auth/reset-password", data);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
