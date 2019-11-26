import {request} from 'services/request';

export async function getAllBoards() {
  return request.get('/boards');
}

export async function createBoard() {
  await request.post('/boards/create', {name: 'nyan'});
}
