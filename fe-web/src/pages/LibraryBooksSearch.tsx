import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBooksRequest } from "../redux/slices/library-book-slice";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Filter, Star } from "lucide-react";
import CustomPagination from "@/components/CustomPagination";
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from "@/redux/selectors/library-book-selector";
import { PATH } from "@/routes";
import { useTheme } from "../components/themed-context";

export default function LibraryBooksSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
  const { theme } = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const booksPerPage = 4;

  useEffect(() => {
    dispatch(fetchBooksRequest());
  }, [dispatch]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleWishlist = (title: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(title)
        ? prevWishlist.filter((item) => item !== title)
        : [...prevWishlist, title]
    );
  };

  const openBook = (bookUrl: string) => {
    navigate(`${PATH.BOOKREADER}?bookUrl=${encodeURIComponent(bookUrl)}`);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className={`container mx-auto p-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">LIBRARY BOOKS</h1>
      <div className="flex justify-center items-center mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`border rounded p-2 ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <Popover>
          <Filter
            className={`w-6 h-6 cursor-pointer ${
              theme === "dark" ? "text-white" : "text-gray-600"
            }`}
          />
        </Popover>
      </div>
      <div className="overflow-x-auto">
        <table
          className={`min-w-full shadow-md rounded-lg ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Image</th>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Author</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <td className="py-2 px-4 border-b text-center">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b">{book.title}</td>
                <td className="py-2 px-4 border-b">{book.author}</td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Button onClick={() => openBook(book?.bookUrl)}>
                      Read
                    </Button>
                    <button
                      onClick={() => toggleWishlist(book.title)}
                      className="bg-transparent"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          wishlist.includes(book.title)
                            ? "text-yellow-500"
                            : theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <CustomPagination
          totalItems={filteredBooks.length}
          itemsPerPage={booksPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
