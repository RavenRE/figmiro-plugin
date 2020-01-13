export class AppError {
  constructor(
    public readonly status: string
  ) {}
}

export enum AppErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'Server Error'
}
