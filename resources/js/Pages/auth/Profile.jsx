import React from 'react';
import { usePage, Link } from '@inertiajs/react';

const Profile = () => {
  const { auth } = usePage().props;
  const user = auth?.user;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profil Pengguna</h1>

      <div className="space-y-2">
        <p><strong>Nama:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Terdaftar Sejak:</strong> {new Date(user?.created_at).toLocaleDateString()}</p>
      </div>

      <div className="mt-6">
        <Link
          href="/logout"
          method="post"
          as="button"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Profile;
