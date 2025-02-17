import CustomPagination from "@/components/CustomPagination";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading
} from "@/redux/selectors/library-book-selector";
import { selectUserInfo } from "@/redux/selectors/user-selector";
import { PATH } from "@/routes";
import { Filter, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBooksRequest, toggleWishlistRequest } from "../redux/slices/library-book-slice";

export default function LibraryBooksSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectBooks);
  // const wishlist = useSelector(selectWishlist);
  console.log(books,'lllllllllllllllllllllllllllll')
  const loading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
const userDetails = useSelector(selectUserInfo,shallowEqual)
  const [searchQuery, setSearchQuery] = useState("");
  const booksPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBooksRequest());
  }, [dispatch]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleWishlist = (book: { _id: string; title: string ,wishlist:boolean}) => {
    if(userDetails){
      dispatch(toggleWishlistRequest({ id: book._id, wishlist:  !book.wishlist,userId:userDetails?.id }));
    }
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
    <div className="container mx-auto p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">LIBRARY BOOKS</h1>
      <div className="flex justify-center items-center mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 bg-white text-black border-gray-300"
        />
        <Popover>
          <Filter className="w-6 h-6 cursor-pointer text-gray-600" />
        </Popover>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg bg-white text-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Image</th>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Author</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book._id} className="hover:bg-gray-100">
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
                      onClick={() => toggleWishlist(book)}
                      className="bg-transparent"
                    >
                      <Star
                        className={`w-6 h-6 ${book.wishlist ? "text-yellow-500" : "text-gray-400"}`}
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
