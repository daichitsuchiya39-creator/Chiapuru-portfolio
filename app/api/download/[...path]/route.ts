import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required. Please sign in to download.' },
      { status: 401 }
    );
  }

  const { path: pathSegments } = await params;
  const filePath = pathSegments.join('/');

  // パストラバーサル攻撃の防御
  if (filePath.includes('..') || filePath.includes('\0')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), 'private', 'downloads', filePath);

  // ファイルが private/downloads/ 内にあることを確認
  const resolvedPath = path.resolve(fullPath);
  const downloadsDir = path.resolve(path.join(process.cwd(), 'private', 'downloads'));
  if (!resolvedPath.startsWith(downloadsDir)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const fileName = path.basename(fullPath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': fileBuffer.length.toString(),
    },
  });
}
