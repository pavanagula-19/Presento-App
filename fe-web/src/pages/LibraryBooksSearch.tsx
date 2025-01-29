import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover } from "@/components/ui/popover";
import { Filter, Star } from "lucide-react";
import { useState } from "react";

const books = [
  {
    title: "Indian Polity",
    author: "M. Laxmikanth",
    imageUrl:
      "https://ik.imagekit.io/pavanagulla19/Indian-Polity-By-M-Laxmikanth-1.png?updatedAt=1738125112468",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    imageUrl:
      "https://ik.imagekit.io/pavanagulla19/he%20achemist.jpg?updatedAt=1738120751945",
  },
  {
    title: "1984",
    author: "George Orwell",
    imageUrl:
      "https://ik.imagekit.io/pavanagulla19/george-orwell.jpg?updatedAt=1738120917556",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    imageUrl:
      "https://ik.imagekit.io/pavanagulla19/harperlee.jpg?updatedAt=1738121031394",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    imageUrl:
      "https://ik.imagekit.io/pavanagulla19/gatsy-1.webp?updatedAt=1738121126638",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    imageUrl:
      "https://ik.imagekit.io/pavanagulla19/pride-and-prejudice-216.jpg?updatedAt=1738124965130",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    imageUrl: "https://example.com/the-catcher-in-the-rye.jpg",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    imageUrl: "https://example.com/the-hobbit.jpg",
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    imageUrl:
      "https://ik.imagekit.io/pavanagulla19/13079982.jpg?updatedAt=1738124847729",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    imageUrl: "https://example.com/moby-dick.jpg",
  },
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

export default function LibraryBooksSearch() {
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const booksPerPage = 8;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const toggleWishlist = (title: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(title)
        ? prevWishlist.filter((item) => item !== title)
        : [...prevWishlist, title]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">LIBRARY BOOKS</h1>
      <div className="flex justify-center items-center mb-6 space-x-2">
        <Search />
        <Popover>
          <Filter className="w-6 h-6 text-gray-600 cursor-pointer" />
        </Popover>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentBooks.map((book, index) => (
          <Card key={index} className="w-full relative">
            <button
              onClick={() => toggleWishlist(book.title)}
              className="absolute bottom-2 right-2 bg-transparent"
            >
              <Star
                className={`w-6 h-6 ${
                  wishlist.includes(book.title)
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              />
            </button>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>
                <div className="flex justify-center h-48 overflow-hidden">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>{book.author}</CardContent>
            <CardFooter className="flex justify-between">
              <Button>Open</Button>
            </CardFooter>
          </Card>
        ))}
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
