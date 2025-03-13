'use server';

import { cookies } from 'next/headers';
import { deleteSession } from '../../../database/sessions';

export async function logout() {
  const cookieStore = await cookies();

  // Get session token from cookie
  const token = cookieStore.get('sessionToken');

  // Delete session in database based on the token
  if (token) {
    await deleteSession(token.value);
    // Delete the session cookie in the browser
    cookieStore.delete(token.name);
  }
  return;
}
