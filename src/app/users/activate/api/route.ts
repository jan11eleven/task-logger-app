import validateUserToken from '@/src/actions/validateUserToken';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const parsedData = await request.json();
    const data = await validateUserToken(parsedData.tokenId);

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 201,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  return new Response('Test');
}
