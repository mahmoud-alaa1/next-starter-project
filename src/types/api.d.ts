interface IApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

interface IErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

interface IPaginationMeta {
  current_page: number;
  total: number;
  last_page: number;
  per_page: number;
}

interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}
