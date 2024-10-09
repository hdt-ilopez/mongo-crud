'use client';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topic');
    }

    const data = await res.json();
    const topic = data.topic;

    return topic;
  } catch (error) {
    console.log('Error loading topic:', error);
    return null;
  }
};

const EditTopic = () => {
  const router = useRouter();
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTopic = async () => {
      const fetchedTopic = await getTopicById(id);
      if (fetchedTopic) {
        setTopic(fetchedTopic);
        setTitle(fetchedTopic.title);
        setDescription(fetchedTopic.description);
      }
    };

    fetchTopic();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ newTitle: title, newDescription: description }),
    });

    if (!res.ok) {
      throw new Error('Unable to update topic');
    }
    router.push('/');
  };

  if (!topic) return <p>Loading...</p>;

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
};

export default EditTopic;
