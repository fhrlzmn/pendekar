import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>Selamat datang di PENDEKAR</h1>
      <p>{JSON.stringify(session, null, 2)}</p>
    </main>
  );
}
