import { getSupabaseAdmin } from './supabaseClient';

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
    const { data, error } = await getSupabaseAdmin()
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

/**
 * Create a free membership for a new user, or return existing membership
 */
export async function createOrGetMembership(email: string): Promise<Membership | null> {
  if (!email) return null;
  try {
    // Check if membership already exists
    const { data, error } = await getSupabaseAdmin()
      .from('memberships')
      .select('*')
      .eq('email', email)
      .limit(1)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = not found, which is expected for new users
      console.error('Supabase error checking membership:', error.message);
      return null;
    }

    // If exists, return it
    if (data) {
      return data as Membership | null;
    }

    // Create new free membership
    const { data: newData, error: insertError } = await getSupabaseAdmin()
      .from('memberships')
      .insert([{ email, tier: 'free' }])
      .select()
      .single();

    if (insertError) {
      console.error('Supabase error creating membership:', insertError.message);
      return null;
    }

    return newData as Membership | null;
  } catch (e) {
    console.error('createOrGetMembership error:', e);
    return null;
  }
}
