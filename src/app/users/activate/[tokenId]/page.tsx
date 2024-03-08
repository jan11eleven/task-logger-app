'use client';

import { useToast } from '@/components/ui/use-toast';
import errorMessages from '@/src/utils/errorMessages.json';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TokenId({ params }: { params: { tokenId: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function handleVerifyAccount() {
    try {
      setIsLoading(true);

      const rawResponse = await fetch('/users/activate/api', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!rawResponse.ok) {
        const errorData = await rawResponse.json();

        toast({
          variant: 'destructive',
          title: 'Error encountered.',
          description: errorData.message,
        });

        setIsLoading(false);

        return;
      }

      const data = await rawResponse.json();

      if (data.message == errorMessages['token.invalid_token']) {
        toast({
          variant: 'destructive',
          title: 'Error encountered.',
          description: data.message,
        });

        setIsLoading(false);
        return;
      }
      toast({
        variant: 'success',
        title: 'Account activation successful!',
        description: 'You can now use your account to login.',
      });

      console.log(data);

      setIsLoading(false);

      router.replace('/login');
    } catch (error: any) {
      console.error('Error: ', error);

      setIsLoading(false);
    }
  }

  return (
    <main className="flex justify-center mt-10">
      <div>
        <Button onClick={handleVerifyAccount}>Verify Account</Button>
        {isLoading ? <p>Verifying</p> : ''}
      </div>
    </main>
  );
}
