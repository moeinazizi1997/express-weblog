export class ApiResponse<T> {
  public success: boolean;
  public data?: T;
  public message?: string;
  public error?: string;

  constructor(success: boolean, data?: T, message?: string, error?: string) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static success<T>(data: T, message = 'Success') {
    return new ApiResponse<T>(true, data, message);
  }

  static error(error: string, message = 'Error') {
    return new ApiResponse<null>(false, null, message, error);
  }
}