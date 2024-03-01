import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onse - Login',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
