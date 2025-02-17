import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "./ui/calendar";
import { selectUserInfo } from "@/redux/selectors/user-selector";
import { selectNotes } from "@/redux/selectors/note-selector";
import { fetchNotesRequest } from "@/redux/slices/note-slice";

export default function Dashboard() {
  const dispatch = useDispatch();  
  const user = useSelector(selectUserInfo);
  const notes = useSelector(selectNotes);

  React.useEffect(() => {
    if (user?._id) {
      dispatch(fetchNotesRequest(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <aside className="w-1/4 bg-white p-4 shadow-md overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Recent Notes</h2>
        </div>
        <div className="space-y-4">
          {notes?.length > 0 ? (
            notes
              .slice(0, 5) 
              .map((note) => (
                <div key={note._id} className="p-4 bg-gray-200 rounded-lg">
                  <h3 className="font-semibold">{note.title}</h3>
                  <span className="text-xs text-gray-500">{note.date}</span>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No notes available</p>
          )}
        </div>
      </aside>

      <main className="flex-1 p-6 bg-white shadow-md">
        <div className="relative w-full h-40 bg-black flex items-center justify-center">
          <h2 className="text-white text-2xl font-semibold">
            {user?.first_name || "Guest"} {user?.last_name}
          </h2>
        </div>
        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <div className="mt-4 bg-gray-200 p-4 rounded-lg">
          <h3 className="font-semibold">Google Drive</h3>
          <p className="text-sm">Introduction to Plasticity</p>
          <a href="#" className="text-blue-500 text-xs">
            drive.google.com
          </a>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg bg-white text-black border-gray-300"
            placeholder="Type here"
          />
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </main>

      <aside className="p-4">
        <div className="p-4 shadow-md rounded-lg bg-white">
          <Calendar />
        </div>

        <div className="mt-4 space-y-2">
          <div className="bg-pink-500 text-white p-4 rounded-lg">
            Twilio Integration
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            Markdown Support
          </div>
        </div>
      </aside>
    </div>
  );
}

