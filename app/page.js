'use client';
import TopicCard from '@/components/TopicCard';
import React from 'react';
import { useGetTopics } from '@/hooks/getTopics';

const Home = () => {
  const { topics } = useGetTopics();

  return (
    <>
      {topics.map((topic) => (
        <TopicCard key={topic._id} topic={topic} />
      ))}
    </>
  );
};

export default Home;
