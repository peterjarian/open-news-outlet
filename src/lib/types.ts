export type APISuccessResponse<T> = {
  data: T;
  error: null;
};

export type APIErrorResponse = {
  data?: null;
  error: string;
};

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;
