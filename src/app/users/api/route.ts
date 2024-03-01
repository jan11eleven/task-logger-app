import createUserAction from '@/src/actions/createUserAction';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const parsedData = await request.json();
    const data = await createUserAction(parsedData);

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
      status: 400,
    });
  }
}

export async function GET(request: Request) {
  return Response.json({
    test: 'data',
  });
}
