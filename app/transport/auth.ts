import {request} from 'services/request';

export async function signIn(email: string, password: string): Promise<void> {
  await fetch(
    'https://miro.com/oauth/authorize'
  );

  await request.post('/auth');
}
