import React from 'react';
import RemoveButton from './RemoveButton';
import EditButton from './EditButton';
import { useGetTopics } from '@/hooks/getTopics';

const TopicCard = ({ topic }) => {
  return (
    <>
      <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
        <div>
          <h2 className="font-bold text-2xl">{topic?.title}</h2>
          <p>{topic?.description}</p>
        </div>
        <div className="flex gap-2">
          <RemoveButton id={topic._id} />
          <EditButton topic={topic} />
        </div>
      </div>
    </>
  );
};

export default TopicCard;
