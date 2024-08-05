import React, { useEffect, useState } from 'react';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://railway.bookreview.techtrain.dev/public/books?offset=0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setBooks(result);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-4xl mx-4 lg:mx-auto my-7 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Book Reviews</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="border border-gray-300 p-4 rounded">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-gray-800"><strong>Detail:</strong> {book.detail}</p>
            <p className="text-gray-800"><strong>Review:</strong> {book.review}</p>
            <p className="text-gray-800"><strong>Reviewer:</strong> {book.reviewer}</p>
            <a href={book.url} target="_blank" className="text-blue-500 hover:underline hover:opacity-75 transition-opacity">More Info</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
