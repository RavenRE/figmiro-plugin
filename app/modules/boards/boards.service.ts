import {request} from 'services/request';
import {Boards} from './boards.entity';

export async function getAllBoards(state: string): Promise<Boards> {
  const response = await request.get<Boards>('/boards', {
    params: {state}
  });
  return response.data;
}
