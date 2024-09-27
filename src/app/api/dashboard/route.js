import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
 
  const cookieStore = cookies(); 
  const user = cookieStore.get('username'); 
  const username = user ? user.value : 'empty';
  console.log(username);
  
  return NextResponse.json({ message: username });
}