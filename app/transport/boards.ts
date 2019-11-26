import {request} from 'services/request';

export async function getAllBoards() {
  return request.get('/all-boards');
}
