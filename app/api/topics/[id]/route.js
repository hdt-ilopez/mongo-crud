import { connectMongo } from '@/libs/mongo';
import Topic from '@/models/topic';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const { newTitle: title, newDescription: description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      );
    }

    await connectMongo();

    const updatedTopic = await Topic.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );

    if (!updatedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Topic updated', updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectMongo();
    const topic = await Topic.findOne({ _id: id });
    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {}
}
