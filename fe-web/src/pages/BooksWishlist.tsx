import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotesRequest } from "@/redux/slices/note-slice";
import { selectNotes, selectNoteLoading, selectNoteError } from "@/redux/selectors/note-selector";
import { selectUserInfo } from "@/redux/selectors/user-selector";
import { selectBooks } from "@/redux/selectors/library-book-selector";
import { Notes } from "./ViewNotes";

const BooksWishList: React.FC = () => {
  const dispatch = useDispatch();
  const notes: Notes[] = useSelector(selectNotes);
  const loading = useSelector(selectNoteLoading);
  const error = useSelector(selectNoteError);
  const user = useSelector(selectUserInfo);
  const books = useSelector(selectBooks); 

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotesRequest(user.id));
    }
  }, [dispatch, user]);

  const wishlistBooks = books.filter((book) => book.wishlist); 
  const wishlistNotes = notes.filter((note) => note.wishlist);

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-medium text-blue-700 mb-3">Books</h3>
          {wishlistBooks.length === 0 ? (
            <p className="text-gray-600">No books in wishlist</p>
          ) : (
            <ul className="space-y-2">
              {wishlistBooks.map((book) => (
                <li key={book._id} className="p-3 bg-white rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-800">{book.title}</p>
                  <p className="text-gray-500">{book.author}</p>
                  <a
                    href={book.bookUrl}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Book
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-medium text-yellow-700 mb-3">Notes</h3>
          {loading ? (
            <p className="text-gray-600">Loading notes...</p>
          ) : error ? (
            <p className="text-red-600">Failed to load notes</p>
          ) : wishlistNotes.length === 0 ? (
            <p className="text-gray-600">No wishlist notes available.</p>
          ) : (
            <ul className="space-y-2">
              {wishlistNotes.map((note) => (
                <li key={note._id} className="p-3 bg-white rounded-lg shadow-sm">
                  {note.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksWishList;
