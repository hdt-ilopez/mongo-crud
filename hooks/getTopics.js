'use client';
import { useEffect, useState } from 'react';

export const useGetTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTopics = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/topics', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch topics');
      }

      const data = await res.json();
      setTopics(data.topics);
    } catch (error) {
      console.log('Error loading topics:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopics(); // Fetch topics on component mount
  }, []);

  return { topics, loading, error, getTopics };
};
