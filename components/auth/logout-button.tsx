import { logout } from '@/actions/logout';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type='submit' className='w-full text-start'>
        Logout
      </button>
    </form>
  );
}
