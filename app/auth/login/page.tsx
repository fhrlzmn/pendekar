import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>Welcome to Login Page</h1>
      <Link href='/auth/login/admin'>Admin Login</Link>
      <Link href='/auth/login/user'>User Login</Link>
    </div>
  );
}
