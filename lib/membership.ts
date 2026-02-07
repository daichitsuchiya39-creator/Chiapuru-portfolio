import { supabaseAdmin } from './supabaseClient';

export type Membership = {
  id: string;
  user_id?: string | null;
  email?: string | null;
  tier?: string | null;
  expires_at?: string | null;
};

export async function getMembershipByEmail(email: string): Promise<Membership | null> {
  if (!email) return null;
  try {
    const { data, error } = await supabaseAdmin
      .from('memberships')
      .select('*')
      .eq('email', email)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Supabase error fetching membership:', error.message);
      return null;
    }
    return data as Membership | null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
