import {AppErrorType} from 'helpers/AppError';

export function getErrorMessage<DomainSpecificError extends string>(
  domainSpecificMapper: {[key: string]: string},
  error: AppErrorType | DomainSpecificError
): string {
  if (AppErrorType.SERVER_ERROR === error) return 'Server error.';
  if (AppErrorType.NETWORK_ERROR === error) return 'Network error. Please, check connection.';
  return domainSpecificMapper[error as DomainSpecificError];
}
