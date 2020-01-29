import {request} from 'helpers/request';
import {AuthByLoginAndPasswordDto} from './auth-by-login-and-password.dto';

type AuthByLoginAndPasswordResponse = {
  token: string;
};
export async function authByLoginAndPassword(dto: AuthByLoginAndPasswordDto): Promise<string> {
  const response = await request.post<AuthByLoginAndPasswordResponse>('/api/auth', dto);
  return response.data.token;
}
