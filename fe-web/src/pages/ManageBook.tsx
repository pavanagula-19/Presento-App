import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useState } from "react";

const books = [
  { title: "Indian Polity", author: "M. Laxmikanth" },
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "1984", author: "George Orwell" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "Pride and Prejudice", author: "Jane Austen" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Fahrenheit 451", author: "Ray Bradbury" },
  { title: "Moby Dick", author: "Herman Melville" },
];

function CustomPagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: any) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-3 py-1 ${
            currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default function ManageBook() {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Books</h1>
      <div className="flex justify-center mb-6">
        <Search />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Author</th>
              <th className="py-2 px-4 border-b text-center">Image</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{book.title}</td>
                <td className="py-2 px-4 border-b">{book.author}</td>
                <td className="py-2 px-4 border-b text-center">
                  <Image className="w-6 h-6 mx-auto" />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <Button>Open</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <CustomPagination
          totalItems={books.length}
          itemsPerPage={booksPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
