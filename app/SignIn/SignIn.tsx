import React, {FormEvent} from 'react';
import {signIn} from 'transport/auth';

const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  await signIn('lol', 'nyan');
};

export const SignIn = () =>
  <form onSubmit={onSubmit}>
    <input/>
    <input/>
    <button type="submit">Login</button>
  </form>;
