import  { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { Search } from "@/components/search";

export default function CreateBook() {
  const [pages, setPages] = useState([{ id: 1, content: "" }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const MAX_CHARS_PER_PAGE = 1000;

  const addPage = () => {
    setPages([...pages, { id: pages.length + 1, content: "" }]);
    setCurrentPage(pages.length);
  };

  const updatePageContent = (content: any) => {
    const updatedPages = [...pages];
    const contentLength = content.length;

    if (contentLength > MAX_CHARS_PER_PAGE) {
      const currentPageContent = content.slice(0, MAX_CHARS_PER_PAGE);
      const overflowContent = content.slice(MAX_CHARS_PER_PAGE);

      updatedPages[currentPage].content = currentPageContent;

      // Check if the next page already exists, if not, create it
      if (updatedPages[currentPage + 1]) {
        updatedPages[currentPage + 1].content = overflowContent;
      } else {
        updatedPages.push({ id: pages.length + 1, content: overflowContent });
      }
      setPages(updatedPages);
      setCurrentPage(currentPage + 1); // Move focus to the new/next page
    } else {
      updatedPages[currentPage].content = content;
      setPages(updatedPages);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const applyTemplate = (templateType: any) => {
    const templateContent =
      templateType === "cover" ? "Cover Page Template" : "Index Page Template";
    const updatedPages = [...pages];
    updatedPages[currentPage].content = templateContent;
    setPages(updatedPages);
    setDrawerOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200">
        <h2 className="text-lg font-bold mb-4">Pages</h2>
        <ul className="space-y-2">
          {pages.map((page, index) => (
            <li
              key={page.id}
              className={`p-2 cursor-pointer ${
                index === currentPage ? "bg-gray-200" : ""
              }`}
              onClick={() => setCurrentPage(index)}
            >
              Page {page.id}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            Edit Page {pages[currentPage].id}
          </h2>
          <div className="flex space-x-2">
            <Search />
            <button
              className="bg-black text-white py-2 px-4 rounded"
              onClick={toggleDrawer}
            >
              Templates
            </button>
          </div>
        </div>
        <div className="h-full">
          <ReactQuill
            theme="snow"
            value={pages[currentPage].content}
            onChange={updatePageContent}
            className="h-[calc(100vh-100px)]"
          />
        </div>
      </main>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <div className="w-64 p-4">
          <h2 className="text-lg font-bold mb-4">Templates</h2>
          <List>
            <ListItemButton onClick={() => applyTemplate("cover")}>
              <ListItemText primary="Cover Page Template" />
            </ListItemButton>
            <ListItemButton onClick={() => applyTemplate("index")}>
              <ListItemText primary="Index Page Template" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
