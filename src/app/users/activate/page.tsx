'use client';

import { useEffect } from 'react';

export default function ActivateUser() {
  async function callApiToValidateToken() {
    const data = await fetch('/users/activate/api');
  }

  useEffect(() => {
    callApiToValidateToken();
  }, []);
  return <>Hello</>;
}
