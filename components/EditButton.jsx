import Link from 'next/link';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
const EditButton = ({ topic }) => {
  return (
    <Link href={`/edit-topic/${topic?._id}`}>
      <FaEdit size={20} />
    </Link>
  );
};

export default EditButton;
