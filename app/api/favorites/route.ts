import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { addFavorite, removeFavorite, isFavorited, ContentType } from '@/lib/favorites';

const VALID_TYPES: ContentType[] = ['blog', 'app', 'member-only-blog', 'member-only-app'];

// POST /api/favorites - add a favorite
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { contentType, slug } = body;

  if (!contentType || !slug || !VALID_TYPES.includes(contentType)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const favorite = await addFavorite(session.user.email, contentType, slug);
  if (!favorite) {
    return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
  }

  return NextResponse.json({ favorited: true });
}

// DELETE /api/favorites - remove a favorite
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { contentType, slug } = body;

  if (!contentType || !slug || !VALID_TYPES.includes(contentType)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const success = await removeFavorite(session.user.email, contentType, slug);
  if (!success) {
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }

  return NextResponse.json({ favorited: false });
}

// GET /api/favorites?contentType=blog&slug=my-post - check if favorited
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ favorited: false });
  }

  const { searchParams } = new URL(req.url);
  const contentType = searchParams.get('contentType') as ContentType | null;
  const slug = searchParams.get('slug');

  if (!contentType || !slug || !VALID_TYPES.includes(contentType)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const favorited = await isFavorited(session.user.email, contentType, slug);
  return NextResponse.json({ favorited });
}
