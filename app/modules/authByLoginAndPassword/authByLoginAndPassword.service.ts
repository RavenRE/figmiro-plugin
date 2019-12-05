import {AppError} from 'utils/AppError';
import {request} from 'helpers/request';
import {AuthByLoginAndPasswordDto} from './authByLoginAndPassword.dto';

type AuthByLoginAndPasswordResponse = {
  token: string;
};
export async function authByLoginAndPassword(dto: AuthByLoginAndPasswordDto): Promise<string> {
  try {
    const response = await request.post<AuthByLoginAndPasswordResponse>('/auth', dto);
    return response.data.token;
  } catch (error) {
    throw new AppError(error.response.data.reason);
  }
}
