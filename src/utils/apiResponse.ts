export class ApiResponse<T> {
  public success: boolean;
  public data?: T;
  public message?: string;
  public errors?: any[];

  constructor(success: boolean, data?: T, message?: string, errors?: any[]) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.errors = errors;
  }

  static success<T>(data: T, message = 'Success') {
    return new ApiResponse<T>(true, data, message);
  }

  static error(errors: any[], message = 'Error') {
    return new ApiResponse<null>(false, null, message, errors);
  }
}