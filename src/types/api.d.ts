interface SuccessApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface ErrorResponseData {
  message?: string;
  error?: string;
  statusCode?: number;
}

interface ApiError extends Error {
  statusCode?: number;
  data?: ErrorResponseData;
}

//  Result pattern
type ApiResult<T> =
  | { success: true; data: T; message: string }
  | {
      success: false;
      error: string;
      message?: string;
      statusCode?: number;
    };
