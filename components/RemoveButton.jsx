'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';

const RemoveButton = ({ id }) => {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure you want to delete this topic?');

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          console.log('Topic deleted successfully, refreshing the page...');
          // Try router.refresh() first, then fallback to a full page reload
          router.refresh();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          console.error('Failed to delete the topic:', res.statusText);
          alert('Failed to delete the topic');
        }
      } catch (error) {
        console.error('Error deleting topic:', error);
        alert('An error occurred while deleting the topic');
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <FaTrashAlt size={20} />
    </button>
  );
};

export default RemoveButton;
