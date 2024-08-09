import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementOffset, decrementOffset } from './booksListSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const {offset} = useSelector((state) => state.booksList);

  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={() => dispatch(decrementOffset())}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={offset === 0}
      >
        Previous
      </button>
      <button
        onClick={() => dispatch(incrementOffset())}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
