'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
];

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between bg-red-200 p-4">
      <h1>My Website</h1>
      <ul className="flex justify-around w-80 bg-blue-200">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li
              key={link.name}
              className={isActive ? 'font-bold' : 'font-normal'}
            >
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
