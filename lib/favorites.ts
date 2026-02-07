import { getSupabaseAdmin } from './supabaseClient';

export type ContentType = 'blog' | 'app' | 'member-only-blog' | 'member-only-app';

export type Favorite = {
  id: string;
  user_email: string;
  content_type: ContentType;
  content_slug: string;
  created_at: string;
};

export async function addFavorite(
  email: string,
  contentType: ContentType,
  slug: string
): Promise<Favorite | null> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('favorites')
      .upsert(
        { user_email: email, content_type: contentType, content_slug: slug },
        { onConflict: 'user_email,content_type,content_slug' }
      )
      .select()
      .single();

    if (error) {
      console.error('Error adding favorite:', error.message);
      return null;
    }
    return data as Favorite;
  } catch (e) {
    console.error('addFavorite error:', e);
    return null;
  }
}

export async function removeFavorite(
  email: string,
  contentType: ContentType,
  slug: string
): Promise<boolean> {
  try {
    const { error } = await getSupabaseAdmin()
      .from('favorites')
      .delete()
      .eq('user_email', email)
      .eq('content_type', contentType)
      .eq('content_slug', slug);

    if (error) {
      console.error('Error removing favorite:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('removeFavorite error:', e);
    return false;
  }
}

export async function isFavorited(
  email: string,
  contentType: ContentType,
  slug: string
): Promise<boolean> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('favorites')
      .select('id')
      .eq('user_email', email)
      .eq('content_type', contentType)
      .eq('content_slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Error checking favorite:', error.message);
      return false;
    }
    return !!data;
  } catch (e) {
    console.error('isFavorited error:', e);
    return false;
  }
}

export async function getFavoritesByEmail(email: string): Promise<Favorite[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('favorites')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error.message);
      return [];
    }
    return (data as Favorite[]) ?? [];
  } catch (e) {
    console.error('getFavoritesByEmail error:', e);
    return [];
  }
}
