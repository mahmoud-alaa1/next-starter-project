import { isAxiosError } from "axios";

export class ApiError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]> = {}) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  allMessages(): string[] {
    return Object.values(this.errors).flat();
  }
}

export function handleApiError(error: unknown) {
  if (isAxiosError(error)) {
    return new ApiError(
      error.response?.data?.message || "An unexpected error occurred",
      error.response?.data?.errors || {}
    );
  }

  if (error instanceof ApiError) {
    return error;
  }

  return new ApiError("An unexpected error occurred");
}
