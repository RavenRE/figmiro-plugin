import {AppError} from 'utils/AppError';
import {request} from 'helpers/request';
import {AuthByLoginAndPasswordDto} from './authByLoginAndPassword.dto';

export async function authByLoginAndPassword(dto: AuthByLoginAndPasswordDto): Promise<void> {
  try {
    await request.post('/auth', dto);
  } catch (error) {
    throw new AppError(error.response.data.reason);
  }
}
