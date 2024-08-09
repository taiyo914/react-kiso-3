import BooksList from '../features/booksList/BooksList';
import Pagination from '../features/booksList/Pagination';

const Home = () => {
  return (
    <div className="max-w-4xl mx-4 my-4 lg:mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <BooksList/>
      <Pagination/>
    </div>
  );
};

export default Home;
