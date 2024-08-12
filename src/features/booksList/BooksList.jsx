import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const BooksList = () => {
  const offset = useSelector((state) => state.offset);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.log(err.message)
      }
    };

    fetchBooks();
  }, [offset]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Book Reviews</h2>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="border border-gray-300 p-4 rounded">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-gray-700">{book.detail}</p>
            <p className="text-gray-800"><strong>Review:</strong> {book.review}</p>
            <p className="text-gray-800"><strong>Reviewer:</strong> {book.reviewer}</p>
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline hover:opacity-75 transition-opacity"
            >
              More Info
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
