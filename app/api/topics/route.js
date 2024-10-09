import { connectMongo } from '@/libs/mongo';
import Topic from '@/models/topic';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { title, description } = await req.json();
  await connectMongo();

  await Topic.create({ title, description });

  return NextResponse.json({ message: 'Topic Created' }, { status: 201 });
}

export async function GET() {
  await connectMongo();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await connectMongo();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Topic Deleted' }, { status: 200 });
}
