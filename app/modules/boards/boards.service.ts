import {request} from 'services/request';
import {Boards} from './boards.entity';

export async function getAllBoards(): Promise<Boards> {
  const response = await request.get<Boards>('/boards');
  return response.data;
}
