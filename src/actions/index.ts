export interface ActionSuccessResponse<T> {
  data: T;
  error: null;
}

export interface ActionErrorResponse {
  data: null;
  error: string;
}

export type ActionResponse<T> = ActionSuccessResponse<T> | ActionErrorResponse;

export function success<T>(data: T): ActionSuccessResponse<T> {
  return { data, error: null };
}

export function failure(error: string): ActionErrorResponse {
  return { error, data: null };
}
