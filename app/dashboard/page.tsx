import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getMembershipByEmail } from '@/lib/membership';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    // Redirect to sign-in if not authenticated
    return (
      <div className="container-custom py-24">
        <h1 className="text-2xl font-bold">Not signed in</h1>
        <p>Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const membership = await getMembershipByEmail(session.user.email);

  return (
    <div className="container-custom py-24">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p className="mb-2">Signed in as: {session.user.email}</p>
      <div className="mt-4 rounded-lg border p-4">
        <h2 className="text-lg font-semibold">Membership</h2>
        {membership ? (
          <div>
            <p>Tier: {membership.tier ?? 'free'}</p>
            <p>Expires: {membership.expires_at ?? '—'}</p>
          </div>
        ) : (
          <p>No membership record found.</p>
        )}
      </div>
    </div>
  );
}
