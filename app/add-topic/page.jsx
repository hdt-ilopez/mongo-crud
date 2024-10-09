'use client';
import { React, useState } from 'react';
import { useRouter } from 'next/navigation';

const AddTopic = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Title and description are required');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/topics/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        throw new ERROR('failed to create a topic');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border  border-slate-500 px-8 py-2"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Topic Title"
      />
      <input
        className="border  border-slate-500 px-8 py-2"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Topic Description"
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
};

export default AddTopic;
